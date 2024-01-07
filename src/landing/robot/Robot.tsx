import * as React from "react"
import { Suspense, useMemo, useRef, useState } from "react"
import * as THREE from "three"
import {
    Cylinder,
    Environment,
    OrbitControls,
    PerspectiveCamera,
    useContextBridge
} from "@react-three/drei"
import { Canvas, useFrame as useFrameR3f } from "@react-three/fiber"
import { ReactReduxContext } from "react-redux"

import { Telemetry } from "./Telemetry"
import { SpinThreeDimensional } from "../viz/spin/Spin"
import { StaubliRobot } from "../staubli/StaubliRobot"
import {CylindricalTool} from "@glowbuzzer/controls";

const approxeq = function (v1:number, v2:number, epsilon:number) {
    if (epsilon == null) {
        epsilon = 0.001
    }
    return Math.abs(v1 - v2) < epsilon
}

const RobotAnimation = () => {
    const buttonHeight = 10
    const buttonRadius = 40
    const buttonOneHeight = useRef(buttonHeight)
    const buttonTwoHeight = useRef(buttonHeight)
    const buttonThreeHeight = useRef(buttonHeight)
    const button1Color = useMemo(() => new THREE.Color("skyBlue"), [])
    const button2Color = useMemo(() => new THREE.Color("PeachPuff"), [])
    const button3Color = useMemo(() => new THREE.Color("olive"), [])

    const [j, setJ] = useState([0, 0, 0, 0, 0, 0])
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

        const worldPos = new THREE.Vector3()
        if (tcpRef.current) {
            worldPos.applyMatrix4(tcpRef.current.matrixWorld)
        }

        if (counter.current >= 1500) {
            counter.current = 0
        }

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
        if (approxeq(worldPos.y, 200, 0.1)) {
            if (worldPos.z < buttonHeight) {
                buttonThreeHeight.current = worldPos.z
            } else {
                buttonThreeHeight.current = buttonHeight
            }
        }
    })

    const tcpRef = useRef(null)

    return (
        <>
            <StaubliRobot jointPositions={j}>
                <CylindricalTool toolIndex={0} />
                <Cylinder ref={tcpRef} args={[0, 0, 0]} />
            </StaubliRobot>

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

export default function Robot({color}) {
    const cameraRef = useRef(null)

    const ContextBridge = useContextBridge(ReactReduxContext)

    return (
        <Canvas shadows color={color}>
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
                    <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr" />
                </Suspense>
            </ContextBridge>
        </Canvas>
    )
}
