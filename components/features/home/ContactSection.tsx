"use client";

import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, MessageSquare } from "lucide-react";

const hCaptchaSiteKey = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";
// Block links, scripts, and HTML before sending form content.
const blockedContactContentPattern =
    /(<\s*\/?\s*script\b|<\/?[a-z][\s\S]*>|javascript\s*:|data\s*:|vbscript\s*:|https?:\/\/|www\.|[a-z0-9-]+\.[a-z]{2,}(?:\/|\b))/i;
const blockedEmailContentPattern =
    /(<\s*\/?\s*script\b|<\/?[a-z][\s\S]*>|javascript\s*:|data\s*:|vbscript\s*:|https?:\/\/|www\.)/i;
const validNamePattern = /^[\p{L}\s-]*$/u;

type ContactFormField = "name" | "email" | "message";

export function ContactSection() {
    const hCaptchaRef = useRef<HCaptcha>(null);
    const [contactFormStatus, setContactFormStatus] = useState<
        | "idle"
        | "submitting"
        | "success"
        | "error"
        | "captcha"
        | "blocked"
        | "name"
    >("idle");
    const [hCaptchaToken, setHCaptchaToken] = useState("");
    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const hasBlockedContactContent = (
        value: string,
        field: ContactFormField = "message",
    ) =>
        field === "email"
            ? blockedEmailContentPattern.test(value)
            : blockedContactContentPattern.test(value);

    const isValidContactName = (value: string) => validNamePattern.test(value);

    // Reject invalid field content before it reaches form state.
    const updateContactFormField = (
        field: ContactFormField,
        value: string,
    ) => {
        if (field === "name" && !isValidContactName(value)) {
            setContactFormStatus("name");
            return;
        }

        if (hasBlockedContactContent(value, field)) {
            setContactFormStatus("blocked");
            return;
        }

        setContactForm((current) => ({
            ...current,
            [field]: value,
        }));
        setContactFormStatus("idle");
    };

    const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
        // Re-check validation before sending anything to Web3Forms.
        const hasInvalidName = !isValidContactName(contactForm.name);
        const hasBlockedContent =
            hasBlockedContactContent(contactForm.name, "name") ||
            hasBlockedContactContent(contactForm.email, "email") ||
            hasBlockedContactContent(contactForm.message, "message");

        if (!accessKey) {
            setContactFormStatus("error");
            return;
        }

        if (hasInvalidName) {
            setContactFormStatus("name");
            return;
        }

        if (hasBlockedContent) {
            setContactFormStatus("blocked");
            return;
        }

        if (!hCaptchaToken) {
            setContactFormStatus("captcha");
            return;
        }

        setContactFormStatus("submitting");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: accessKey,
                    subject: "Project inquiry from " + contactForm.name,
                    from_name: "Portfolio Contact Form",
                    name: contactForm.name,
                    email: contactForm.email,
                    message: contactForm.message,
                    "h-captcha-response": hCaptchaToken,
                    botcheck: "",
                }),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                hCaptchaRef.current?.resetCaptcha();
                setHCaptchaToken("");
                setContactFormStatus("error");
                return;
            }

            hCaptchaRef.current?.resetCaptcha();
            setHCaptchaToken("");
            setContactFormStatus("success");
            setContactForm({
                name: "",
                email: "",
                message: "",
            });
        } catch {
            hCaptchaRef.current?.resetCaptcha();
            setHCaptchaToken("");
            setContactFormStatus("error");
        }
    };

    return (
        <section
            id="contact"
            className="relative z-20 mx-auto w-full max-w-7xl overflow-hidden bg-black px-0 pb-14 pt-4 md:px-8 md:pb-20 lg:px-12"
        >
            <div className="mb-8 border-y border-dashed border-white/10 bg-zinc-950 px-5 py-4 md:mb-12 md:px-6">
                <div className="flex min-w-0 items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        <p className="text-sm font-medium text-white">Contact</p>
                    </div>
        
                    <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.02em] text-zinc-500">
                        Let&apos;s build
                    </span>
                </div>
            </div>
        
            <div className="grid overflow-hidden border-y border-dashed border-white/10 lg:grid-cols-[minmax(0,1fr)_24rem]">
                <aside className="border-b border-dashed border-white/10 p-5 sm:p-6 lg:border-b-0 lg:border-r lg:p-8">
                    <div className="max-w-xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-300">
                            Start a project
                        </p>
        
                        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                            Have an idea that needs a sharper interface?
                        </h2>
        
                        <p className="mt-4 text-sm leading-6 text-zinc-400">
                            Send the details and I&apos;ll get your message directly
                            in my inbox.
                        </p>
                    </div>
                </aside>
        
                <aside className="p-5 sm:p-6 lg:p-8">
                    <form onSubmit={handleContactSubmit} className="grid gap-4">
                        <div className="flex items-center gap-3 text-sm font-semibold text-white">
                            <MessageSquare
                                size={16}
                                className="text-emerald-300"
                            />
                            Send me a message
                        </div>
        
                        <label className="grid gap-2 text-sm font-medium text-zinc-300">
                            Name
                            <input
                                type="text"
                                name="name"
                                value={contactForm.name}
                                onChange={(event) => {
                                    updateContactFormField(
                                        "name",
                                        event.target.value,
                                    );
                                }}
                                required
                                autoComplete="name"
                                className="h-12 rounded-lg border border-dashed border-white/10 bg-white/[0.015] px-4 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-emerald-400/40 focus:bg-emerald-400/[0.03]"
                                placeholder="Your name"
                            />
                        </label>
        
                        <label className="grid gap-2 text-sm font-medium text-zinc-300">
                            Email
                            <input
                                type="email"
                                name="email"
                                value={contactForm.email}
                                onChange={(event) => {
                                    updateContactFormField(
                                        "email",
                                        event.target.value,
                                    );
                                }}
                                required
                                autoComplete="email"
                                className="h-12 rounded-lg border border-dashed border-white/10 bg-white/[0.015] px-4 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-emerald-400/40 focus:bg-emerald-400/[0.03]"
                                placeholder="you@example.com"
                            />
                        </label>
        
                        <label className="grid gap-2 text-sm font-medium text-zinc-300">
                            What are we building?
                            <textarea
                                name="message"
                                value={contactForm.message}
                                onChange={(event) => {
                                    updateContactFormField(
                                        "message",
                                        event.target.value,
                                    );
                                }}
                                required
                                rows={6}
                                className="resize-none rounded-lg border border-dashed border-white/10 bg-white/[0.015] px-4 py-3 text-sm leading-6 text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-emerald-400/40 focus:bg-emerald-400/[0.03]"
                                placeholder="Share the idea, timeline, or what feels stuck."
                            />
                        </label>
        
                        <div className="max-w-full overflow-hidden">
                            <HCaptcha
                                ref={hCaptchaRef}
                                sitekey={hCaptchaSiteKey}
                                reCaptchaCompat={false}
                                theme="dark"
                                onVerify={(token) => {
                                    setHCaptchaToken(token);
                                    setContactFormStatus("idle");
                                }}
                                onExpire={() => {
                                    setHCaptchaToken("");
                                }}
                                onError={() => {
                                    setHCaptchaToken("");
                                    setContactFormStatus("error");
                                }}
                            />
                        </div>
        
                        <button
                            type="submit"
                            disabled={contactFormStatus === "submitting"}
                            className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-500 disabled:text-zinc-200"
                        >
                            {contactFormStatus === "submitting"
                                ? "Sending..."
                                : "Send message"}
                            <ArrowUpRight size={15} />
                        </button>
        
                        {contactFormStatus === "success" && (
                            <p className="text-xs font-medium text-emerald-300">
                                Message sent. I&apos;ll get back to you soon.
                            </p>
                        )}
        
                        {contactFormStatus === "error" && (
                            <p className="text-xs font-medium text-red-300">
                                Something went wrong. Please try again.
                            </p>
                        )}
        
                        {contactFormStatus === "captcha" && (
                            <p className="text-xs font-medium text-amber-200">
                                Please complete the captcha before sending.
                            </p>
                        )}
        
                        {contactFormStatus === "blocked" && (
                            <p className="text-xs font-medium text-amber-200">
                                Links and scripts are not allowed in this form.
                            </p>
                        )}
        
                        {contactFormStatus === "name" && (
                            <p className="text-xs font-medium text-amber-200">
                                Names can only include letters, spaces, and hyphens.
                            </p>
                        )}
                    </form>
                </aside>
            </div>
        </section>
    );
}
