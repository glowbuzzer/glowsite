import * as React from "react"
import { ReactNode, useMemo } from "react"
import { Quaternion, Vector3 } from "three"
// import { useFrame, useKinematicsConfiguration } from "@glowbuzzer/store"
import { useGLTF } from "@react-three/drei"
import {KinematicsGroup} from "./KinematicsGroup";
// import { KinematicsGroup } from "./kinematics/KinematicsGroup"
// import { KinChainProvider } from "./kinematics/KinChainProvider"

export const dh = [
    { alpha: -90, beta: 0, theta: 0, a: 0, d: 0 },
    { alpha: 0, beta: 0, theta: -90, a: 225, d: 0 },
    { alpha: 90, beta: 0, theta: 90, a: 0, d: 35 },
    { alpha: -90, beta: 0, theta: 0, a: 0, d: 225 },
    { alpha: 90, beta: 0, theta: 0, a: 0, d: 0 },
    { alpha: 0, beta: 0, theta: 0, a: 0, d: 65 }
]

export const StaubliRobot = ({
    jointPositions,
    children
}: {
    jointPositions?: number[]
    children?: ReactNode
}) => {
    // load the parts of the robot (links)
    const [base, p0, p1, p2, p3, p4, p5] = useMemo(
        () =>
            useGLTF(
                // @ts-ignore
                [0, 1, 2, 3, 4, 5, 6].map(j => `${import.meta.env.BASE_URL}assets/tx40/L${j}-transformed.glb`)
            ).map(m => m.scene.clone()),
        []
    )

    /**
     * Construct the robot from the parts and apply the joint positions.
     *
     * The outer group at each level is used to orientate and offset the part to the correct position ready to
     * mount the part itself. These adjustments are to do with how the parts were modelled and are not related to the kinematics.
     *
     * The joint rotations are applied to the inner group at each level (to the Z axis).
     */
    return (
        <group scale={1000} position={[0,0,325]}>
            <primitive object={base} />
            <KinematicsGroup part={p0} jointAngle={jointPositions[0]} dh={dh[0]}>
                <KinematicsGroup part={p1} jointAngle={jointPositions[1]} dh={dh[1]}>
                    <KinematicsGroup part={p2} jointAngle={jointPositions[2]} dh={dh[2]}>
                        <KinematicsGroup part={p3} jointAngle={jointPositions[3]} dh={dh[3]}>
                            <KinematicsGroup part={p4} jointAngle={jointPositions[4]} dh={dh[4]}>
                                <KinematicsGroup part={p5} jointAngle={jointPositions[5]} dh={dh[5]}>
                                    <group scale={1 / 1000}>{children}</group>
                                </KinematicsGroup>
                            </KinematicsGroup>
                        </KinematicsGroup>
                    </KinematicsGroup>
                </KinematicsGroup>
            </KinematicsGroup>
        </group>
    )
}
