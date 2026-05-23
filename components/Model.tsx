"use client";

import { useGLTF } from "@react-three/drei";

export default function Model(props: any) {
    const { scene } = useGLTF("/models/model.gltf");

    return <primitive object={scene} {...props} />;
}

useGLTF.preload("/models/model.gltf");
