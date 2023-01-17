import * as React from "react"
import { useRef, useState, useEffect, Dispatch, SetStateAction, Suspense } from "react"
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
    useTexture
} from "@react-three/drei"
import { RGBELoader } from "three-stdlib"
// import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { useThree, useLoader, Canvas } from "@react-three/fiber"
import { ReactReduxContext } from "react-redux"

import { GbColours, GlowsiteTheme } from "../../../framework/GlowsiteTheme"
import { useFrame as useFrameR3f } from "@react-three/fiber"

import * as KIN from "./RobotKin"
import * as MOVE from "./Moves"

import { BasicRobot, RobotKinematicsChainElement } from "@glowbuzzer/controls/scene"

import { EffectComposer, Outline, SelectiveBloom, Bloom } from "@react-three/postprocessing"

import {
    useFrame,
    useJointPositions,
    useKinematicsConfiguration,
    useToolIndex,
    useConnection,
    useFrames,
    useKinematicsCartesianPosition
} from "@glowbuzzer/store"
import { SpinThreeDimensional } from "../spin/Spin"

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

type moveLineProps = {
    x: number
    y: number
    z: number
    setJoints: Dispatch<SetStateAction<number[]>>
    jointAngles: any
}

export enum activeMove {
    NONE,
    MOVE_LINE,
    MOVE_JOINT_SPACE
}

export type overallCtxProps = {
    moveType: activeMove
    currentThetas: number[]
    nextThetas: number[]
    progress: number
    moveInProgress: boolean
    configuration: number
}

export type moveLineCtxProps = {
    startPosition: number[]
    startOrientation: number[]
    targetPosition: number[]
    targetOrientation: number[]
    targetThetas: number[]
    lineDirection: number[]
    lineDistance: number
}

export type moveJointSpaceCtxProps = {
    startThetas: number[]
    targetThetas: number[]
    jointRatios: number[]
    maxJointAngle: number
}

const RobotAnimation = props => {
    const targetBox = useRef(null)

    const baseRef = useRef(null)
    const gripperLeftRef = useRef(null)
    const gripperRightRef = useRef(null)
    const group1 = useRef(null)
    const group2 = useRef(null)
    const [grip, setGrip] = useState(false)
    const [showTargetBox, setShowTargetBox] = useState(false)

    const textureProps = useTexture({
        map: "/assets/mats/Wood049_1K_Color.jpg"
        // roughnessMap: "/assets/mats/Wood049_1K_Roughness.jpg",
        // normalMap: "/assets/mats/Wood049_1K_NormalGL.jpg",
        // displacementsMap: "/assets/mats/Wood049_1K_Displacement.jpg",
    })

    const [overallCtx, setOverallCtx] = useState<overallCtxProps>({
        moveType: activeMove.NONE,
        currentThetas: [0, 0, 0, 0, 0, 0],
        nextThetas: [0, 0, 0, 0, 0, 0],
        progress: 0,
        moveInProgress: false,
        configuration: 0
    })
    const [moveLineCtx, setMoveLineCtx] = useState<moveLineCtxProps>({
        startPosition: [0, 0, 0],
        startOrientation: [0, 0, 0, 1],
        targetPosition: [0, 0, 0],
        targetOrientation: [0, 0, 0, 1],
        targetThetas: [0, 0, 0, 0, 0, 0],
        lineDirection: [0, 0, 0],
        lineDistance: 0
    })

    const [moveJointSpaceCtx, setMoveJointSpaceCtx] = useState<moveJointSpaceCtxProps>({
        startThetas: [0, 0, 0, 0, 0, 0],
        targetThetas: [0, 0, 0, 0, 0, 0],
        jointRatios: [0, 0, 0, 0, 0, 0],
        maxJointAngle: 0
    })

    const { frameIndex } = useKinematicsConfiguration(0)
    const { translation, rotation } = useFrame(frameIndex!, false)

    // const jointPositions = useJointPositions(0)
    const toolIndex = useToolIndex(0)

    // load the parts of the robot (links)
    const parts = useGLTF([0, 1, 2, 3, 4, 5, 6].map(j => `/assets/tx40/L${j}.glb`)).map(
        m => m.scene
    )
    const [j, setJ] = useState([0, 0, 0, 0, 0, 0])
    const moveNumber = useRef(0)

    const toolRef = useRef<THREE.Mesh>(null)

    const [toolColor, setToolColor] = useState(0xffffff)

    useFrameR3f(({ clock }) => {
        if (overallCtx.moveType == activeMove.NONE) {
            if (overallCtx.progress == 1) {
                setOverallCtx(prevState => ({
                    ...prevState,
                    progress: 0
                }))
            } else {
                switch (moveNumber.current) {
                    case 0: {
                        // console.log("move number 0")
                        setShowTargetBox(false)

                        MOVE.CalculateMoveJointSpace({
                            x: 0,
                            y: 300,
                            z: -130,
                            i: 0,
                            j: 1,
                            k: 0,
                            w: 0,
                            setMoveJointSpaceCtx: setMoveJointSpaceCtx,
                            moveJointSpaceCtx: moveJointSpaceCtx,
                            setOverallCtx: setOverallCtx,
                            overallCtx: overallCtx
                        })
                        moveNumber.current++

                        break
                    }
                    case 1: {
                        // console.log("move number 1")

                        MOVE.CalculateMoveLine({
                            x: 0,
                            y: 300,
                            z: -170,
                            i: 0,
                            j: 1,
                            k: 0,
                            w: 0,
                            setMoveLineCtx: setMoveLineCtx,
                            moveLineCtx: moveLineCtx,
                            setOverallCtx: setOverallCtx,
                            overallCtx: overallCtx
                        })
                        moveNumber.current++

                        break
                    }
                    // case 2: {
                    //     console.log("move number 2")
                    //     if (overallCtx.progress == 1){
                    //         overallCtx.progress = 0
                    //         break
                    //     }
                    //     if (overallCtx.moveType == activeMove.NONE) {
                    //         MOVE.CalculateMoveJointSpace({
                    //             x: 0,
                    //             y: 0,
                    //             z: 650,
                    //             i: 0,
                    //             j: 1,
                    //             k: 0,
                    //             w: 0,
                    //             setMoveJointSpaceCtx: setMoveJointSpaceCtx,
                    //             moveJointSpaceCtx: moveJointSpaceCtx,
                    //             setOverallCtx: setOverallCtx,
                    //             overallCtx: overallCtx
                    //         })
                    //         moveNumber.current++
                    //     }
                    //     break
                    // }
                    case 2: {
                        //     console.log("move number 3")

                        gripperLeftRef.current.position.x -= 0.5
                        gripperRightRef.current.position.x += 0.5

                        // console.log(gripperLeftRef.current.position.x)

                        if (gripperLeftRef.current.position.x < 31) {
                            moveNumber.current++
                        }

                        break
                    }
                    case 3: {
                        //     console.log("move number 3")

                        setShowTargetBox(true)
                        moveNumber.current++

                        break
                    }
                    case 4: {
                        //     console.log("move number 4")

                        moveNumber.current++

                        break
                    }
                    case 5: {
                        //     console.log("move number 5")
                        MOVE.CalculateMoveJointSpace({
                            x: -0.94,
                            y: 35.47,
                            z: 512,
                            i: 0,
                            j: 0,
                            k: 0,
                            w: 1,
                            setMoveJointSpaceCtx: setMoveJointSpaceCtx,
                            moveJointSpaceCtx: moveJointSpaceCtx,
                            setOverallCtx: setOverallCtx,
                            overallCtx: overallCtx
                        })
                        moveNumber.current++

                        break
                    }
                    case 6: {
                        //     console.log("move number 6")

                        gripperLeftRef.current.position.x += 0.5
                        gripperRightRef.current.position.x -= 0.5

                        if (gripperLeftRef.current.position.x > 41) {
                            moveNumber.current = 0
                        }

                        break
                    }
                }
            }
        }

        MOVE.ExecuteMove({
            setMoveJointSpaceCtx: setMoveJointSpaceCtx,
            moveJointSpaceCtx: moveJointSpaceCtx,
            setMoveLineCtx: setMoveLineCtx,
            moveLineCtx: moveLineCtx,
            setOverallCtx: setOverallCtx,
            overallCtx: overallCtx
        })

        setJ(j => overallCtx.nextThetas)

        overallCtx.currentThetas = overallCtx.nextThetas
    })

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

                <group
                    ref={group1}
                    onClick={() => {
                        setGrip(true)
                    }}
                >
                    <Box
                        ref={baseRef}
                        args={[100, 50, 100]}
                        position={[0, 0, 50]}
                        castShadow={true}
                    >
                        <meshStandardMaterial metalness={1} roughness={0.1} color={"bisque"} />
                    </Box>
                    <group ref={group2} position={[0, 0, 0]}>
                        <Box
                            ref={gripperLeftRef}
                            args={[20, 20, 50]}
                            position={[40, 0, 125]}
                            castShadow={true}
                        >
                            <meshStandardMaterial color={"silver"} />
                        </Box>
                        <Box
                            ref={gripperRightRef}
                            args={[20, 20, 50]}
                            position={[-40, 0, 125]}
                            castShadow={true}
                        >
                            <meshStandardMaterial color={"silver"} />
                        </Box>
                    </group>
                    <Box
                        args={[50, 50, 50]}
                        visible={showTargetBox}
                        position={[0, 0, 135]}
                        castShadow={true}
                    >
                        <meshStandardMaterial displacementScale={1} {...textureProps} />
                    </Box>
                </group>
            </BasicRobot>
            <Box
                args={[50, 50, 50]}
                visible={!showTargetBox}
                position={[0, 300, 25]}
                castShadow={true}
            >
                <meshStandardMaterial displacementScale={1} {...textureProps} />
            </Box>
        </>
    )
}

// function Diamond(props) {
//     const ref = useRef()
//     const { nodes } = useGLTF('/src/assets/dflat.glb')
// Use a custom envmap/scene-backdrop for the diamond material
// This way we can have a clear BG while cube-cam can still film other objects
// const texture = useLoader(RGBELoader, 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr')
// console.log(texture)
// Optional config
// const config = useControls({
//     bounces: { value: 4, min: 0, max: 8, step: 1 },
//     aberrationStrength: { value: 0.01, min: 0, max: 0.1, step: 0.01 },
//     ior: { value: 2.4, min: 0, max: 10 },
//     fresnel: { value: 1, min: 0, max: 1 },
//     color: 'white',
//     fastChroma: false
// })

// bounces={4}
// aberrationStrength={0.01}
// ior={2.4}
// fresnel={1}
// color={ 'white'}
// fastChroma={false}
// falsetoneMapped={false}

// return (

// <CubeCamera resolution={256} frames={1} envMap={texture}>
//     {(texture) => (
//         <mesh ref={ref} geometry={nodes.Diamond_1_0.geometry}  {...props}>
//             <MeshRefractionMaterial bounces={4} aberrationStrength={0.01} ior={2.4} fresnel={0} color={0xffffff} fastChroma={false} envMap={texture} toneMapped={false}/>
//         </mesh>
//     )}
// </CubeCamera>

// )
// }

//
// <CubeCamera resolution={256} frames={1} envMap={texture}>
//
//     <mesh castShadow={true} ref={ref} geometry={nodes.Diamond_1_0.geometry} {...props}>
//
//         <MeshRefractionMaterial envMap={texture}/>
//
//
//     </mesh>
//
//     {/*{(texture) => (*/}
//     {/*    <mesh castShadow={true} ref={ref} geometry={nodes.Diamond_1_0.geometry} {...props}>*/}
//     {/*        <MeshRefractionMaterial envMap={texture} bounces={4}*/}
//     {/*                                aberrationStrength={0.01}*/}
//     {/*                                ior={2.4}*/}
//     {/*                                fresnel={1}*/}
//     {/*                                color={ 'white'}*/}
//     {/*                                fastChroma={false}*/}
//     {/*                                falsetoneMapped={false} />*/}
//     {/*    </mesh>*/}
//     {/*)}*/}
// </CubeCamera>

export default function Robot(props) {
    const cameraRef = useRef(null)

    const ContextBridge = useContextBridge(ReactReduxContext)

    return (
        <Canvas shadows color={props.color}>
            <ContextBridge>
                <gridHelper rotation={[Math.PI / 2, 0, 0]} args={[2000, 20, "grey", "grey"]} />
                <OrbitControls enableDamping={false} makeDefault target={[0, 10, 600]} />
                <PerspectiveCamera
                    ref={cameraRef}
                    makeDefault
                    position={[-1100, -1100, 1100]}
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
