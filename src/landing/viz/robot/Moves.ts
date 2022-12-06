import * as KIN from "./RobotKin";
import {activeMove, moveLineCtxProps, moveJointSpaceCtxProps, overallCtxProps} from "./Robot"

import * as THREE from 'three'


export function CalculateMoveJointSpace  ({x, y, z, i,j,k,w, setMoveJointSpaceCtx,moveJointSpaceCtx, setOverallCtx, overallCtx}:{x:number,y:number, z:number, i:number, j:number, k:number, w:number, setMoveJointSpaceCtx:any, moveJointSpaceCtx:moveJointSpaceCtxProps, setOverallCtx:any, overallCtx:overallCtxProps }):boolean {

    const targetJointAnglesAllConfs = KIN.ik_tx40([x,y,z],[i,j,k,w])

    const targetJointAngles = targetJointAnglesAllConfs[overallCtx.configuration]

    console.error("CalculateMoveJointSpace: targetJointAngles", targetJointAngles)

    const currentJointAngles = overallCtx.currentThetas

    console.error("CalculateMoveJointSpace: currentJointAngles", currentJointAngles)

    const jointDifferences = targetJointAngles.map(function(item, index:number) {
        return item - currentJointAngles[index]
    })

    console.error("CalculateMoveJointSpace: jointDifferences", jointDifferences)

    const absJointDifferences = jointDifferences.map(function(item, index:number) {
        return Math.abs(item)
    })

    const max = Math.max(...<any>absJointDifferences)

    console.log("CalculateMoveJointSpace: max", max)



    const jointRatios = jointDifferences.map(function(item, index:number) {
        return item/max
    })

    console.log("CalculateMoveJointSpace: jointRatios", jointRatios)


    setMoveJointSpaceCtx((prevState)=>({
        ...prevState,
        jointRatios: jointRatios,
        startThetas: currentJointAngles,
        targetThetas: targetJointAngles,
        maxJointAngle: max
    }))

    setOverallCtx((prevState)=>({
        ...prevState,
        moveType:activeMove.MOVE_JOINT_SPACE,
    }))

    return true
}



export function CalculateMoveLine  ({x, y, z,i,j,k,w, setMoveLineCtx, moveLineCtx, setOverallCtx, overallCtx}:{x:number,y:number, z:number, i:number, j:number, k:number, w:number, setMoveLineCtx:any, moveLineCtx:moveLineCtxProps, setOverallCtx:any, overallCtx:overallCtxProps }):boolean {

    const fk = KIN.fk_tx40(overallCtx.currentThetas)

    const currentPosition =fk.position
    const currentOrientation = fk.orientation
    console.log("CalculateMoveLine: currentPosition", currentPosition)
    console.log("CalculateMoveLine: currentOrientation", currentOrientation)

    const startVector = new THREE.Vector3(currentPosition[0],currentPosition[1],currentPosition[2])
    const targetVector = new THREE.Vector3(x,y,z)
    const directionVector = new THREE.Vector3().subVectors(targetVector, startVector).normalize()

    const distance = startVector.distanceTo(targetVector)

    console.log("CalculateMoveLine:directionVector", directionVector)
    console.log("CalculateMoveLine:distance", distance)


    setMoveLineCtx((prevState)=>({
        ...prevState,
        startPosition: [currentPosition[0],currentPosition[1],currentPosition[2]],
        startOrientation: [i,j,k,w],
        // startOrientation: currentOrientation,
        targetPosition: [x, y, z],
        lineDirection: [directionVector.x, directionVector.y, directionVector.z],
        lineDistance: distance
    }))

    console.log("CalculateMoveLine:ctx", moveLineCtx)

    setOverallCtx((prevState)=>({
        ...prevState,
        moveType:activeMove.MOVE_LINE,
    }))


    return true
}

const step = 0.01

export function ExecuteMove ({setMoveJointSpaceCtx,moveJointSpaceCtx, setMoveLineCtx, moveLineCtx, setOverallCtx, overallCtx}:{setMoveJointSpaceCtx:any, moveJointSpaceCtx:moveJointSpaceCtxProps, setMoveLineCtx:any, moveLineCtx:moveLineCtxProps, setOverallCtx:any, overallCtx:overallCtxProps }) {


    if (overallCtx.moveType ==activeMove.NONE){
        return
    }


    if (overallCtx.moveType ==activeMove.MOVE_JOINT_SPACE){


        //if we are close to  our destination

        if (overallCtx.progress > (1-step-(step/10))){

            setOverallCtx((prevState)=>({
                ...prevState,
                nextThetas: moveJointSpaceCtx.targetThetas,
                moveType: activeMove.NONE,
                progress: 1
            }))

            return
        }

        const nextThetas = moveJointSpaceCtx.startThetas.map(function(item, index:number) {
            return <any>item + moveJointSpaceCtx.jointRatios[index] * overallCtx.progress * moveJointSpaceCtx.maxJointAngle
        })


        console.log("ExecuteMove(MoveJoints): nextThetas", nextThetas)

        setOverallCtx((prevState)=>({
            ...prevState,
            nextThetas: nextThetas,
            progress: prevState.progress+step
        }))


        console.log("ExecuteMove(MoveJoints): progress", overallCtx.progress)

    }

    if (overallCtx.moveType ==activeMove.MOVE_LINE){


        if (overallCtx.progress > (1-step-(step/10))){

            setOverallCtx((prevState)=>({
                ...prevState,
                nextThetas: moveJointSpaceCtx.targetThetas,
                moveType: activeMove.NONE,
                progress: 1
            }))
            return
        }

        console.log("ExecuteMove(MoveLine):moveLineCtx.startPosition.x", moveLineCtx.startPosition[0])
        const start =  new THREE.Vector3(moveLineCtx.startPosition[0], moveLineCtx.startPosition[1], moveLineCtx.startPosition[2])
        console.log("ExecuteMove(MoveLine):start", start)

        const dir =  new THREE.Vector3(moveLineCtx.lineDirection[0], moveLineCtx.lineDirection[1],moveLineCtx.lineDirection[2])

        console.log("ExecuteMove(MoveLine):dir", dir)


        const newPos = new THREE.Vector3().addVectors ( start, dir.multiplyScalar( overallCtx.progress*moveLineCtx.lineDistance))

        console.log("ExecuteMove(MoveLine):newPos", newPos)

        const nextThetas =KIN.ik_tx40([newPos.x, newPos.y, newPos.z],[moveLineCtx.startOrientation[0],moveLineCtx.startOrientation[1],moveLineCtx.startOrientation[2],moveLineCtx.startOrientation[3]])[overallCtx.configuration]



        setOverallCtx((prevState)=>({
            ...prevState,
            nextThetas: nextThetas,
            progress: prevState.progress+step
        }))

        console.log("ExecuteMove(MoveLine): progress", overallCtx.progress)

    }

}