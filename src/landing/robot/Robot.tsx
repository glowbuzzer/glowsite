import * as React from "react"
import { useRef, useState, useEffect, Dispatch, SetStateAction, Suspense, useMemo } from "react"
import * as THREE from "three"
import {
    Box,
    Sphere,
    PivotControls,
    Html,
    OrbitControls,
    PerspectiveCamera,
    useGLTF,
    useContextBridge,
    MeshRefractionMaterial,
    CubeCamera,
    AccumulativeShadows,
    RandomizedLight,
    Environment,
    Trail,
    useTexture,
    Cylinder
} from "@react-three/drei"
import { RGBELoader } from "three-stdlib"
// import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { useThree, useLoader, Canvas } from "@react-three/fiber"
import { ReactReduxContext } from "react-redux"

import { GbColours, GlowsiteTheme } from "../../framework/GlowsiteTheme"
import { useFrame as useFrameR3f } from "@react-three/fiber"

import { BasicRobot, RobotKinematicsChainElement } from "@glowbuzzer/controls/scene"

import { EffectComposer, Outline, SelectiveBloom, Bloom } from "@react-three/postprocessing"

import { Telemetry } from "./Telemetry"

import {
    useFrame,
    useJointPositions,
    useKinematicsConfiguration,
    useToolIndex,
    useConnection,
    useFrames,
    useKinematicsCartesianPosition
} from "@glowbuzzer/store"
import { SpinThreeDimensional } from "../viz/spin/Spin"

const DEG90 = Math.PI / 2

const DEFAULT_POSITION = new THREE.Vector3(0, 0, 325)

// const DEFAULT_POSITION = new THREE.Vector3(0, 0, -225)

const TX40_KIN_CHAIN: RobotKinematicsChainElement[] = [
    { moveable: true },
    { rotateX: -DEG90, moveable: true, jointAngleAdjustment: -DEG90 },
    { rotateX: 0, translateX: 0.225, jointAngleAdjustment: DEG90, moveable: true },
    { rotateX: DEG90, translateZ: 0.035, moveable: true },
    { rotateX: -DEG90, translateZ: 0.225, moveable: true },
    { rotateX: DEG90, moveable: true },
    { translateZ: 0.065 },
    { moveable: false }
]

const approxeq = function (v1, v2, epsilon) {
    if (epsilon == null) {
        epsilon = 0.001
    }
    return Math.abs(v1 - v2) < epsilon
}
const RobotAnimation = props => {
    const { frameIndex } = useKinematicsConfiguration(0)
    const { translation, rotation } = useFrame(frameIndex!, false)

    const updateRate = 0.0001

    const buttonHeight = 10
    const buttonRadius = 40
    const buttonOneHeight = useRef(buttonHeight)
    const buttonTwoHeight = useRef(buttonHeight)
    const buttonThreeHeight = useRef(buttonHeight)
    const button1Color = useMemo(() => new THREE.Color("skyBlue"), [])
    const button2Color = useMemo(() => new THREE.Color("PeachPuff"), [])
    const button3Color = useMemo(() => new THREE.Color("olive"), [])

    const parts = useMemo(
        () => useGLTF([0, 1, 2, 3, 4, 5, 6].map(j => `/assets/tx40/L${j}.glb`)).map(m => m.scene),
        []
    )

    const [j, setJ] = useState([0, 0, 0, 0, 0, 0])
    const { invalidate } = useThree()
    const counter = useRef(0)
    useFrameR3f(({ clock }) => {
        // console.log(clock.elapsedTime)
        // if (clock.elapsedTime > updateRate) {
        const newJ = []
        newJ[0] = (Telemetry[counter.current].j0 * Math.PI) / 180
        newJ[1] = (Telemetry[counter.current].j1 * Math.PI) / 180
        newJ[2] = (Telemetry[counter.current].j2 * Math.PI) / 180
        newJ[3] = (Telemetry[counter.current].j3 * Math.PI) / 180
        newJ[4] = (Telemetry[counter.current].j4 * Math.PI) / 180
        newJ[5] = (Telemetry[counter.current].j5 * Math.PI) / 180
        setJ(newJ)
        counter.current++
        clock.start()
        // invalidate()
        // }

        const worldPos = new THREE.Vector3()
        if (tcpRef.current) {
            worldPos.applyMatrix4(tcpRef.current.matrixWorld)
        }

        if (counter.current >= 1500) {
            counter.current = 0
        }
        // console.log(tcpRef.current)
        if (approxeq(worldPos.y, -200, 0.1)) {
            if (worldPos.z < buttonHeight) {
                buttonOneHeight.current = worldPos.z
            } else {
                buttonOneHeight.current = buttonHeight
            }
        }
        if (approxeq(worldPos.y, 0, 0.1)) {
            if (worldPos.z < buttonHeight && counter.current > 1) {
                buttonTwoHeight.current = worldPos.z
            } else {
                buttonTwoHeight.current = buttonHeight
            }
        }
        // console.log(buttonTwoHeight.current)
        if (approxeq(worldPos.y, 200, 0.1)) {
            if (worldPos.z < buttonHeight) {
                buttonThreeHeight.current = worldPos.z
            } else {
                buttonThreeHeight.current = buttonHeight
            }
        }
        // console.log(counter.current)
    })

    const tcpRef = useRef(null)

    return (
        <>
            <BasicRobot
                kinematicsChain={TX40_KIN_CHAIN}
                parts={parts}
                jointPositions={j}
                translation={translation || DEFAULT_POSITION}
                rotation={rotation}
                scale={1000}
            >
                {/*<CylindricalTool toolIndex={toolIndex} />*/}
                <Cylinder ref={tcpRef} args={[0, 0, 0]} />
            </BasicRobot>
            <Cylinder
                receiveShadow
                args={[buttonRadius, buttonRadius, buttonOneHeight.current, 128]}
                position={[200, -200, buttonOneHeight.current / 2]}
                rotation={[Math.PI / 2, 0, 0]}
            >
                <meshStandardMaterial color={button1Color} roughness={0} />
            </Cylinder>
            <Cylinder
                receiveShadow
                args={[buttonRadius, buttonRadius, buttonTwoHeight.current, 128]}
                position={[200, 0, buttonTwoHeight.current / 2]}
                rotation={[Math.PI / 2, 0, 0]}
            >
                <meshStandardMaterial color={button2Color} roughness={0} />
            </Cylinder>
            <Cylinder
                receiveShadow
                args={[buttonRadius, buttonRadius, buttonThreeHeight.current, 128]}
                position={[200, 200, buttonThreeHeight.current / 2]}
                rotation={[Math.PI / 2, 0, 0]}
            >
                <meshStandardMaterial color={button3Color} roughness={0} />
            </Cylinder>
        </>
    )
}

export default function Robot(props) {
    const cameraRef = useRef(null)

    const ContextBridge = useContextBridge(ReactReduxContext)

    return (
        // <Canvas shadows frameloop="demand" color={props.color}>
        <Canvas shadows color={props.color}>
            <ContextBridge>
                <gridHelper rotation={[Math.PI / 2, 0, 0]} args={[2000, 20, "grey", "grey"]} />
                <OrbitControls enableDamping={false} makeDefault target={[0, 0, 300]} />
                <PerspectiveCamera
                    ref={cameraRef}
                    makeDefault
                    position={[900, 200, 200]}
                    far={10000}
                    near={1}
                    up={[0, 0, 1]}
                />

                {/*<color attach="background" args={[0x9254de]} />*/}
                <ambientLight color={"grey"} />
                <pointLight
                    position={[0, 0, 1000]}
                    color={"white"}
                    castShadow={true}
                    distance={1000 * 2}
                    shadow-mapSize-height={512}
                    shadow-mapSize-width={512}
                    shadow-radius={10}
                    shadow-bias={-0.0001}
                />

                <Suspense fallback={<SpinThreeDimensional position={[0, 0, 30]} />}>
                    <RobotAnimation />

                    {/*<Diamond scale={[100,100,100]} position={[400,200,50]} rotation={[Math.PI/2,0,-Math.PI/4]}/>*/}
                    <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr" />
                </Suspense>
                {/*<EffectComposer>*/}
                {/*    <Bloom luminanceThreshold={2} intensity={1} levels={9} mipmapBlur />*/}
                {/*</EffectComposer>*/}
            </ContextBridge>
        </Canvas>
    )
}
