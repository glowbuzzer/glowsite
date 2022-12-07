import ReactDOM from "react-dom"
import React, {useEffect, useState, useMemo, useRef, useLayoutEffect, Suspense} from "react"
import {Canvas, useFrame, extend, useThree, useLoader} from '@react-three/fiber'

import * as THREE from 'three'
import {
    Trail, Float, Line, Sphere, Stars, Svg, OrbitControls,
    PerspectiveCamera, useTexture
} from '@react-three/drei'
import {BoxHelper} from "three"
import {EffectComposer, Bloom} from '@react-three/postprocessing'
import {SVGLoader} from 'three/examples/jsm/loaders/SVGLoader'

import hex from "./assets/hex.svg"
import {GbColours, GlowsiteTheme} from "../../../framework/GlowsiteTheme";
import {SpinThreeDimensional} from "../spin/Spin";


const HexSvg = (props) => {
    const svgRef = useRef()

    const material = new THREE.MeshStandardMaterial({
        color: "yellow",
        roughness: 0.1,
        // metalness: 0.9,
        displacementScale: 0.2,
        // toneMapped: true,
        side: THREE.DoubleSide,
        // depthWrite: false,
        // roughnessMap: textureProps.roughnessMap,
        // map: texture,
        // normalMap: textureProps.normalMap,
        // displacementMap: textureProps.displacementMap,
        toneMapped: false
    });

    return (
        <Svg ref={svgRef} src={hex} position={props.position}
             rotation={[0, 0, 0]}/>
    )
}


const Ec = () => {
    const ecRef = useRef()

    return (
        <EffectComposer ref={ecRef} autoClear={false}>
            <Bloom intensity={0.01} mipmapBlur={true} luminanceThreshold={0.3} luminanceSmoothing={0.025} radius={0.9}/>
        </EffectComposer>
    )
}


export default function AniLogo() {

    const camRef = useRef(null)
    const canvRef = useRef(null)
    return (
        <div style={{width: "250px"}}>
            <Canvas ref={canvRef}  id={'my-canvas'}>
                <Suspense>
                <PerspectiveCamera
                    ref={camRef}
                    makeDefault
                    position={[0, 0, 200]}
                    far={10000}
                    near={1}
                    up={[0, 0, 1]}
                />


                <Float speed={4} rotationIntensity={1} floatIntensity={2}>
                    <HexSvg position={[-152,60,-1]}/>
                    <GlowElectron position={[-152, 60, 0]} speed={2}/>

                    <SolidG position={[-152, 60, 0]}/>
                </Float>
        </Suspense>
                <Ec/>
            </Canvas>

        </div>
    )
}


const SolidG = (props) => {
    const gData = useLoader(SVGLoader, "/assets/g.svg")

    const paths = gData.paths;
    const group = new THREE.Group();

    const ref = useRef(null)

    const speed = 3
    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime() * speed
        ref.current.children[0].material.emissiveIntensity = 2 + (Math.cos(t))

    })


    for (let i = 0; i < paths.length; i++) {

        const path = paths[i];

        const material = new THREE.MeshStandardMaterial({
            emissive: "purple",
            emissiveIntensity: 5,
            color: path.color,
            roughness: 1,
            metalness: 1,
            side: THREE.DoubleSide,
            depthWrite: true
        });

        const shapes = SVGLoader.createShapes(path);

        for (let j = 0; j < shapes.length; j++) {

            const shape = shapes[j];
            const geometry = new THREE.ShapeGeometry(shape);
            const mesh = new THREE.Mesh(geometry, material);
            group.add(mesh);

        }

    }

    return (

        <primitive ref={ref} object={group} position={props.position} rotation={[0, Math.PI, Math.PI]}/>
    )
}


const GlowElectron = ({ speed = 6, ...props}) => {

    const electronRef = useRef(null)


    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime() * speed
            electronRef.current.position.x = 55 * Math.sin(t) + 75
            electronRef.current.position.y = 55 * Math.cos(t) - 68
            electronRef.current.position.z = 5
    })
    return (
        <>
            <group {...props}>
                <Trail local width={100} length={2.2} color={new THREE.Color(2, 1, 10)} attenuation={(t) =>  t*t*t/2}>

                    <mesh ref={electronRef}>
                        <sphereGeometry args={[4.2, 64,64]}/>
                        <meshStandardMaterial  emissiveIntensity={20}  emissive={"yellow"} color={[151, 0, 226]} toneMapped={false}/>
                    </mesh>
                </Trail>
            </group>
        </>
    )
}
