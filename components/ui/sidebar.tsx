import { Grip } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedinIn, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

export default function Sidebar() {
    return (
        <aside className="fixed left-0 top-0 h-screen w-25 bg-[#343434]/20 border-r-2 border-[#262626B3] p-6 backdrop-blur-xl z-20 justify-items-center hidden sm:flex">
            <nav className="h-full flex flex-col justify-between">
                <div className="space-y-4">
                    {/* Menu icon */}
                    <div className="flex items-center justify-center bg-[#343434]/20 border-2 border-[#262626] w-12.5 h-12.5 rounded-full">
                        <Grip className='text-[#FFFFFF]/70' />
                    </div>
                    {/* Logo */}
                    <div className="flex items-center justify-center">
                        <img src="/icon-white.svg" alt="Sidebar logo" className="h-10 w-10" />
                    </div>

                    {/* Switch Theme mode */}
                    <div className="flex items-center justify-center mt-30">
                        <button className="bg-[#343434]/20 border-2 border-[#262626]/70 w-12.5 h-30 rounded-full" />
                    </div>
                </div>

                {/* Social media links */}
                <div className="flex flex-col items-c/enter gap-6 text-white/70">
                    <a
                        href="https://www.youtube.com"
                        aria-label="YouTube"
                        className="group inline-flex flex-col items-center"
                    >
                        <FontAwesomeIcon
                            icon={faYoutube}
                            className="h-6 w-6 transition-colors duration-300 group-hover:text-white"
                        />
                        {/* underline effect */}
                        <span className="mt-1 h-0.5 w-0 bg-[#FFFFFF]/70 transition-all duration-300 group-hover:w-6 rounded-full" />
                    </a>
                    <a
                        href="https://www.instagram.com"
                        aria-label="Instagram"
                        className="group inline-flex flex-col items-center"
                    >
                        <FontAwesomeIcon
                            icon={faInstagram}
                            className="h-6 w-6 transition-colors duration-300 group-hover:text-white"
                        />
                        {/* underline effect */}
                        <span className="mt-1 h-[1.5px] w-0 bg-[#FFFFFF]/70 transition-all duration-300 group-hover:w-6 rounded-full" />
                    </a>
                    <a
                        href="https://twitter.com"
                        aria-label="X (Twitter)"
                        className="group inline-flex flex-col items-center"
                    >
                        <FontAwesomeIcon
                            icon={faXTwitter}
                            className="h-6 w-6 transition-colors duration-300 group-hover:text-white"
                        />
                        {/* underline effect */}
                        <span className="mt-1 h-[1.5px] w-0 bg-[#FFFFFF]/70 transition-all duration-300 group-hover:w-6 rounded-full" />
                    </a>

                    <a
                        href="https://www.linkedin.com"
                        aria-label="LinkedIn"
                        className="group inline-flex flex-col items-center"
                    >
                        <FontAwesomeIcon
                            icon={faLinkedinIn}
                            className="h-6 w-6 transition-colors duration-300 group-hover:text-white"
                        />
                        {/* underline effect */}
                        <span className="mt-1 h-[1.5px] w-0 bg-[#FFFFFF]/70 transition-all duration-300 group-hover:w-6 rounded-full" />
                    </a>
                </div>
            </nav>
        </aside >
    );
}
