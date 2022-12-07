import * as React from "react"
import {
    useRef,
    useState,
    useEffect,
    useMemo,
    Dispatch, SetStateAction, Suspense
} from "react"
import * as THREE from 'three'
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
    Instance,
    Instances
} from "@react-three/drei"

import {useFrame, useThree, useLoader, Canvas} from "@react-three/fiber"
import {GbColours, GlowsiteTheme} from "../../../framework/GlowsiteTheme";

export const SpinThreeDimensional = (props) => {

    const spinGroupRef = useRef(null)
    const instanceRef = useRef(null)

    const primaryColor = GbColours.MainPurple

    const primaryColorThree = new THREE.Color(primaryColor)
    const lerpToColorThree = new THREE.Color("#D4C1EC");

    const ballSize = 20
    const ballSpaceRatio = 3

    const spherePositions = [new THREE.Vector3(-ballSize * ballSpaceRatio / 2, -ballSize * ballSpaceRatio / 2, 0), new THREE.Vector3(ballSize * ballSpaceRatio / 2, -ballSize * ballSpaceRatio / 2, 0), new THREE.Vector3(ballSize * ballSpaceRatio / 2, ballSize * ballSpaceRatio / 2, 0), new THREE.Vector3(-ballSize * ballSpaceRatio / 2, ballSize * ballSpaceRatio / 2, 0)]


    useFrame((state, delta) => {

        spinGroupRef.current.rotation.z += 0.1

        const spot1Color = new THREE.Color(primaryColorThree).lerpHSL(lerpToColorThree, Math.sin(state.clock.elapsedTime) / 2)
        const spot2Color = new THREE.Color(primaryColorThree).lerpHSL(lerpToColorThree, Math.sin(state.clock.elapsedTime + Math.PI / 4) / 2)
        const spot3Color = new THREE.Color(primaryColorThree).lerpHSL(lerpToColorThree, Math.sin(state.clock.elapsedTime + 2 * Math.PI / 4) / 2)
        const spot4Color = new THREE.Color(primaryColorThree).lerpHSL(lerpToColorThree, Math.sin(state.clock.elapsedTime + 3 * Math.PI / 4) / 2)


        instanceRef.current.setColorAt(0, spot1Color)
        instanceRef.current.setColorAt(1, spot2Color)
        instanceRef.current.setColorAt(2, spot3Color)
        instanceRef.current.setColorAt(3, spot4Color)

        instanceRef.current.instanceColor.needsUpdate = true

    })


    useEffect(() => {
        for (let i = 0; i < 4; i++) {

            const tempObjectSphere = new THREE.Object3D()

            tempObjectSphere.position.set(
                spherePositions[i].x, spherePositions[i].y, spherePositions[i].z
            )

            tempObjectSphere.updateMatrix()
            instanceRef.current.setMatrixAt(i, tempObjectSphere.matrix)

        }

        instanceRef.current.instanceMatrix.needsUpdate = true

    }, [])


    const meshMat = new THREE.MeshStandardMaterial()
    const sphGeometry = new THREE.SphereGeometry(20, 64, 64);

    return (
        <group ref={spinGroupRef} position={props.position}>

            <instancedMesh ref={instanceRef} material={meshMat} geometry={sphGeometry}
                           args={[undefined, undefined, 4]}>

            </instancedMesh>
            <Html style={{
                width: "500px",
            }}>
                <p>Loading visualisation awesomeness...</p>
            </Html>
        </group>

    )

}