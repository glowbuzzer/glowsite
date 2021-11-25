// ENUMS
    export enum ONOFF {
        OFF,
        ON,
    }
    export enum MACHINETARGET {
        MACHINETARGET_NONE,
        MACHINETARGET_FIELDBUS,
        MACHINETARGET_SIMULATION,
    }
    export enum POSITIONREFERENCE {
        /**  Position is specified absolutely (relative to origin) */
  ABSOLUTE ,
        /**  Position is specified relatively to current position */
  RELATIVE ,
        /**  Position is to be super-imposed on the current move */
  MOVESUPERIMPOSED ,
    }
    export enum LINECIRCLESPLINE {
        /**  Move is a line */
  LINE ,
        /**  Move is a circle (arc) */
  CIRCLE ,
        /**  Move is a spline */
  SPLINE ,
    }
    export enum FRAME_ABSRELATIVE {
        /**  The frame is an absolute frame */
  FRAME_ABSOLUTE ,
        /**  Frame is a relative frame */
  FRAME_RELATIVE ,
    }
    export enum TASK_STATE {
        TASK_NOTSTARTED,
        TASK_RUNNING,
        TASK_FINISHED,
        TASK_PAUSED,
        TASK_STOPPING,
        TASK_CANCELLED,
        TASK_ERROR,
    }
    export enum TASK_COMMAND {
        TASK_IDLE,
        TASK_RUN,
        TASK_CANCEL,
        TASK_PAUSE,
        TASK_RESUME,
    }
    export enum GTLT {
        GREATERTHAN,
        LESSTHAN,
    }
    export enum ACTIVITYTYPE {
        /**  No activity */
  ACTIVITYTYPE_NONE ,
        /**  Move a set of joints to a given position */
  ACTIVITYTYPE_MOVEJOINTS ,
        /**  Move a set of joints at a given velocity */
  ACTIVITYTYPE_MOVEJOINTSATVELOCITY ,
        /**  Move a kinematics configuration&#x27;s terminal joint along a line in cartesian space to a given position (with orientation) */
  ACTIVITYTYPE_MOVELINE ,
        ACTIVITYTYPE_MOVELINEATVELOCITY,
        ACTIVITYTYPE_MOVEARC,
        ACTIVITYTYPE_MOVESPLINE,
        ACTIVITYTYPE_MOVETOPOSITION,
        ACTIVITYTYPE_MOVELINEWITHFORCE,
        ACTIVITYTYPE_MOVETOPOSITIONWITHFORCE,
        ACTIVITYTYPE_GEARINPOS,
        ACTIVITYTYPE_GEARINVELO,
        ACTIVITYTYPE_GEARINDYN,
        ACTIVITYTYPE_SETDOUT,
        ACTIVITYTYPE_SETAOUT,
        ACTIVITYTYPE_DWELL,
        ACTIVITYTYPE_WAITON,
        ACTIVITYTYPE_SWITCHPOSE,
        ACTIVITYTYPE_LATCH,
        ACTIVITYTYPE_STRESSTEST,
        ACTIVITYTYPE_ENDPROGRAM,
        ACTIVITYTYPE_SETIOUT,
    }
    export enum ACTIVITYSTATE {
        /**  Activity is inactive (not being executed) */
  ACTIVITY_INACTIVE ,
        /**  Activity is being executed */
  ACTIVITY_ACTIVE ,
        /**  Activity has finished being executed */
  ACTIVITY_COMPLETED ,
        /**  Activity is a motion activity and is currently in the blend between two moves */
  ACTIVITY_BLEND_ACTIVE ,
        /**  Activity has been cancelled */
  ACTIVITY_CANCELLED ,
    }
    export enum STRATEGYGEARINPOS {
        PHASESHIFT,
        EARLY,
        LATE,
        SLOW,
    }
    export enum TRIGGERTYPE {
        /**  Rising edge trigger (activates on the rising edge of a signal 0-&gt;1 */
  TRIGGERTYPE_RISING ,
        /**  Falling edge trigger (activates on the falling edge of a signal 1-&gt;0 */
  TRIGGERTYPE_FALLING ,
        /**  No trigger is defined */
  TRIGGERTYPE_NONE ,
    }
    export enum ARCTYPE {
        /**  Arc is specified as a centre */
  ARCTYPE_CENTRE ,
        /**  Arc is specified as a radius */
  ARCTYPE_RADIUS ,
    }
    export enum ARCDIRECTION {
        /**  Arc direction is clockwise */
  ARCDIRECTION_CW ,
        /**  Arc direction is counter-clockwise */
  ARCDIRECTION_CCW ,
    }
    export enum JOINT_TYPE {
        /**  Joint type is revolute (rotary) - this is for the kinematics models */
  JOINT_REVOLUTE ,
        /**  Joint type is prismatic (linear) - this is for the kinematics models */
  JOINT_PRISMATIC ,
        /**  Joint type is spherical (ball) - this is for the kinematics models */
  JOINT_SPHERICAL ,
        /**  Joint type is screw - this is for the kinematics models */
  JOINT_SCREW ,
    }
    export enum JOINT_CONTROLMODE {
        /**  Joint is to be controlled in torque mode */
  JOINT_TORQ_CTRL ,
        /**  Joint is to be controlled in velocity mode */
  JOINT_VEL_CTRL ,
        /**  Joint is to be controlled in position mode */
  JOINT_POS_CTRL ,
    }
    export enum JOINT_FINITECONTINUOUS {
        /**  Joint is finite (defined limits on travel) */
  JOINT_FINITE ,
        /**  Joint is infinite (no travel limits) */
  JOINT_CONTINUOUS ,
    }
    export enum KC_KINEMATICSCONFIGURATIONTYPE {
        /**  The kinematics configuration will have the SIXDOF kinematics model (algorithm) applied */
  KC_SIXDOF ,
        /**  The kinematics configuration will have the IGUS kinematics model (algorithm) applied */
  KC_IGUS ,
        /**  The kinematics configuration will have the SCARA kinematics model (algorithm) applied */
  KC_SCARA ,
        /**  The kinematics configuration will have the CARTESIAN kinematics model (algorithm) applied */
  KC_CARTESIAN ,
        /**  The kinematics configuration will have the CARTESIAN_SLAVED kinematics model (algorithm) applied */
  KC_CARTESIAN_SLAVED ,
        /**  The kinematics configuration will have no kinematics model (algorithm) applied */
  KC_NAKED ,
    }
    export enum KC_SHOULDERCONFIGURATION {
        /**  for 6DOF and SCARA robots the robot is in the lefty configuration */
  KC_LEFTY ,
        /**  for 6DOF and SCARA robots the robot is in the right configuration */
  KC_RIGHTY ,
    }
    export enum KC_ELBOWCONFIGURATION {
        /**  for 6DOF and SCARA robots the robot is in the Elbow Positive configuration */
  KC_EPOSITIVE ,
        /**  for 6DOF and SCARA robots the robot is in the Elbow Negative configuration */
  KC_ENEGATIVE ,
    }
    export enum KC_WRISTCONFIGURATION {
        /**  for 6DOF robots the robot is in the wrist positive configuration */
  KC_WPOSITIVE ,
        /**  for 6DOF robots the robot is in the wrist negative configuration */
  KC_WNEGATIVE ,
    }
    export enum BLENDTYPE {
        BLENDTYPE_NONE,
        BLENDTYPE_OVERLAPPED,
    }
    export enum JOGMODE {
        /**  Jog-mode is none */
  JOGMODE_NONE ,
        /**  Jog-mode is joint (jog individual joints) */
  JOGMODE_JOINT ,
        /**  Jog-mode is cartesian (jog along cartesian axes) */
  JOGMODE_CARTESIAN ,
        /**  Jog-mode is joint step (jog in defined steps in position) */
  JOGMODE_JOINT_STEP ,
        /**  Jog-mode is cartesian step (jog in defined steps in position) */
  JOGMODE_CARTESIAN_STEP ,
        /**  TODO */
  JOGMODE_REF_POSITION ,
    }
    export enum JOGSTATE {
        /**  Current state of jogging is none (inactive) */
  JOGSTATE_NONE ,
        /**  Current state of jogging is step jogging active */
  JOGSTATE_STEP_ACTIVE ,
        /**  Current state of jogging is a step jog is complete */
  JOGSTATE_STEP_COMPLETE ,
    }
    export enum OPENCLOSED {
        OPEN,
        CLOSED,
    }
    export enum STREAMCOMMAND {
        STREAMCOMMAND_RUN,
        STREAMCOMMAND_PAUSE,
        STREAMCOMMAND_STOP,
    }
    export enum STREAMSTATE {
        STREAMSTATE_IDLE,
        STREAMSTATE_ACTIVE,
        STREAMSTATE_PAUSED,
        STREAMSTATE_STOPPING,
        STREAMSTATE_STOPPED,
    }


// STRUCTS
        
        export type Header = {
                    
                    updated?:boolean;
        }

        
        export type MachineConfig = {
                    
                    busCycleTime?:number;
        }

        
        export type MachineStatus = {
                    
                    statusWord?:number;
                    
                    activeFault?:number;
                    
                    faultHistory?:number;
                    
                    heartbeat?:number;
                    
                    target?:MACHINETARGET;
                    
                    targetConnectRetryCnt?:number;
        }

        
        export type MachineCommand = {
                    
                    controlWord?:number;
                    
                    hlcControlWord?:number;
                    
                    heartbeat?:number;
                    
                    target?:MACHINETARGET;
        }

        
        export type StreamConfig = {
        }

        
        export type StreamStatus = {
                    
                    streamState?:STREAMSTATE;
                    
                    tag?:number;
                    
                    time?:number;
        }

        
        export type StreamCommand = {
                    
                    streamCommand?:STREAMCOMMAND;
        }

        
        export type FieldbusTxPdoLayout = {
                    
                    machineControlWordOffset?:number;
                    
                    gbcControlWordOffset?:number;
                    
                    hlcControlWordOffset?:number;
                    
                    jointControlwordOffset?:number;
                    
                    jointSetPositionOffset?:number;
                    
                    jointSetVelocityOffset?:number;
                    
                    jointSetTorqueOffset?:number;
                    
                    heartbeatOffset?:number;
                    
                    digitalOffset?:number;
                    
                    digitalCount?:number;
                    
                    analogOffset?:number;
                    
                    analogCount?:number;
                    
                    integerOffset?:number;
                    
                    integerCount?:number;
        }

        
        export type FieldbusRxPdoLayout = {
                    
                    machineStatusWordOffset?:number;
                    
                    activeFaultOffset?:number;
                    
                    faultHistoryOffset?:number;
                    
                    jointStatuswordOffset?:number;
                    
                    jointActualPositionOffset?:number;
                    
                    jointActualVelocityOffset?:number;
                    
                    jointActualTorqueOffset?:number;
                    
                    heartbeatOffset?:number;
                    
                    digitalOffset?:number;
                    
                    digitalCount?:number;
                    
                    analogOffset?:number;
                    
                    analogCount?:number;
                    
                    integerOffset?:number;
                    
                    integerCount?:number;
        }

        
        export type FieldbusConfig = {
                    
                    jointCount?:number;
                    
                    TxPdo?:FieldbusTxPdoLayout;
                    
                    RxPdo?:FieldbusRxPdoLayout;
        }

        
        export type MoveParametersConfig = {
                    
                    vmax?:number;
                    
                    vmaxPercentage?:number;
                    
                    amaxPercentage?:number;
                    
                    jmaxPercentage?:number;
                    
                    blendType?:BLENDTYPE;
                    
                    blendTimePercentage?:number;
                    
                    blendTolerance?:number;
                    
                    toolIndex?:number;
        }

        
        export type Vector3 = {
                    /**  Cartesian position on x axis */
                    x?:number;
                    /**  Cartesian position on y axis */
                    y?:number;
                    /**  Cartesian position on x axis */
                    z?:number;
        }

        
        export type Quat = {
                    /**  Quaternion orientation w */
                    w?:number;
                    
                    x?:number;
                    
                    y?:number;
                    
                    z?:number;
        }

        
        export type CartesianPosition = {
                    
                    positionReference?:POSITIONREFERENCE;
                    
                    position?:Vector3;
                    
                    orientation?:Quat;
                    
                    frameIndex?:number;
        }

        
        export type PositionAbsRel = {
                    
                    positionReference?:POSITIONREFERENCE;
                    
                    position?:Vector3;
        }

        
        export type CartesianVector = {
                    
                    vector?:Vector3;
                    
                    frameIndex?:number;
        }

        
        export type DoubleValue = {
                    
                    value?:number;
        }

        
        export type JointPosition = {
                    
                    positionReference?:POSITIONREFERENCE;
                    
                    value?:number;
        }

        
        export type JointVelocity = {
                    
                    value?:number;
        }

        
        export type JointVelocityArray = {
                    
                    value?:number[];
        }

        
        export type JointAcceleration = {
                    
                    value?:number;
        }

        
        export type JointAccelerationArray = {
                    
                    value?:number[];
        }

        
        export type Cartesian3dPosition = {
                    
                    x?:number;
                    
                    y?:number;
                    
                    z?:number;
        }

        
        export type ListOfJoints = {
                    
                    joint?:boolean[];
        }

        
        export type ListofKinematicsConfigurations = {
                    
                    kinematicsConfiguration?:boolean[];
        }

        
        export type Circle = {
                    
                    acw?:boolean;
                    
                    radius?:number;
                    
                    destinationPosition?:CartesianPosition;
        }

        
        export type Spline = {
                    
                    point?:number[];
        }

        
        export type LinesConfig = {
                    
                    destination?:CartesianPosition;
        }

        
        export type ArcsConfig = {
                    
                    arcType?:ARCTYPE;
                    
                    arcDirection?:ARCDIRECTION;
                    
                    destination?:CartesianPosition;
//              Start of Union
                    centre?: PositionAbsRel,
                    radius?: DoubleValue,
//              End of Union
        }

        
        export type CartesianPositionsConfig = {
                    
                    position?:CartesianPosition;
                    
                    configuration?:number;
        }

        
        export type TaskConfig = {
                    
                    activityCount?:number;
                    
                    firstActivityIndex?:number;
                    
                    cancelTriggerOnIndex?:number;
                    
                    startTriggerOnIndex?:number;
        }

        
        export type TaskStatus = {
                    
                    taskState?:TASK_STATE;
                    
                    currentActivityIndex?:number;
        }

        
        export type TaskCommand = {
                    
                    taskCommand?:TASK_COMMAND;
        }

        /** 
        Configuration parameters for Jog
         */
        export type JogConfig = {
                    /**  Kinematics configuration to use for the jog */
                    kinematicsConfigurationIndex?:number;
        }

        /** 
        Status of Jog
         */
        export type JogStatus = {
                    
                    state?:JOGSTATE;
        }

        /** 
        Command parameters for moveToPosition
         */
        export type JogCommand = {
                    
                    mode?:JOGMODE;
                    /**  size of the jog step */
                    stepSize?:number;
                    /**  percentage of the jog vmax to be useed for the jog */
                    speedPercentage?:number;
                    /**  two bits per joint in the kc, 0&#x3D;no move, 1&#x3D;move pos, 2&#x3D;move neg */
                    jogFlags?:number;
                    /**  for cartesian jog only - position to jog to */
                    position?:CartesianPosition;
        }

        /** 
        Configuration parameters for joint
         */
        export type JointConfig = {
                    
                    jointType?:JOINT_TYPE;
                    
                    jointControlMode?:JOINT_CONTROLMODE;
                    /**  joint&#x27;s vmax (maximum velocity) */
                    vmax?:number;
                    /**  joint&#x27;s amax (maximum acceleration) */
                    amax?:number;
                    /**  joint&#x27;s jmax (maximum jerk) */
                    jmax?:number;
                    /**  maximum velocity to be used for jogging */
                    jogVmax?:number;
                    /**  maximum acceleration to be used for jogging */
                    jogAmax?:number;
                    /**  maximum jerk to be used for jogging */
                    jogJmax?:number;
                    /**  scale factor to be applied to a joint&#x27;s position for transfer to the fieldbus */
                    scale?:number;
                    /**  negative soft limit for the travel of the joint */
                    negLimit?:number;
                    /**  positive soft limit for the travel of the joint */
                    posLimit?:number;
                    /**  flags that a joint has a brake */
                    hasBrake?:boolean;
                    /**  flags that a joint&#x27;s motion is inverted */
                    isInverted?:boolean;
                    
                    finiteContinuous?:JOINT_FINITECONTINUOUS;
                    
                    isVirtualInternal?:boolean;
                    
                    isVirtualFromEncoder?:boolean;
                    
                    correspondingJointNumberOnPhysicalFieldbus?:number;
                    
                    correspondingJointNumberOnVirtualFieldbus?:number;
        }

        /** 
        Status of joint
         */
        export type JointStatus = {
                    /**  CiA 402 status word for the joint */
                    statusWord?:number;
                    /**  Actual Position of the joint */
                    actPos?:number;
                    /**  Actual Velocitys of the joint */
                    actVel?:number;
                    /**  Actual Acceleration of the joint */
                    actAcc?:number;
        }

        /** 
        Command parameters for joint
         */
        export type JointCommand = {
                    /**  Flag to command a homing cycle on a drive  */
                    doHoming?:boolean;
                    /**  CiA 402 control word for a drive (not used when using GBEM which controls the drives) */
                    controlWord?:number;
        }

        
        export type SixDofJointConfiguration = {
                    
                    shoulderConfiguration?:KC_SHOULDERCONFIGURATION;
                    
                    elbowConfiguration?:KC_ELBOWCONFIGURATION;
                    
                    wristConfiguration?:KC_WRISTCONFIGURATION;
        }

        
        export type ScaraJointConfiguration = {
                    
                    shoulderConfiguration?:KC_SHOULDERCONFIGURATION;
                    
                    elbowConfiguration?:KC_ELBOWCONFIGURATION;
        }

        
        export type JointConfiguration = {
                    
                    kinematicsConfigurationType?:KC_KINEMATICSCONFIGURATIONTYPE;
//              Start of Union
                    sixDofConfiguration?: SixDofJointConfiguration,
                    scaraConfiguration?: ScaraJointConfiguration,
//              End of Union
        }

        
        export type CartesianKinematicsParameters = {
                    
                    scaleX?:number;
                    
                    scaleY?:number;
                    
                    scaleZ?:number;
                    
                    linearVmax?:number;
                    
                    linearAmax?:number;
                    
                    linearJmax?:number;
                    
                    jogVmax?:number;
                    
                    jogAmax?:number;
                    
                    jogJmax?:number;
                    
                    tcpRotationalVmax?:number;
                    
                    tcpRotationalAmax?:number;
                    
                    tcpRotationalJmax?:number;
        }

        
        export type SixDofKinematicsParameters = {
                    
                    linearVmax?:number;
                    
                    linearAmax?:number;
                    
                    linearJax?:number;
                    
                    jogVax?:number;
                    
                    jogAmax?:number;
                    
                    jogJmax?:number;
                    
                    tcpRotationalVmax?:number;
                    
                    tcpRotationalAmax?:number;
                    
                    tcpRotationalJmax?:number;
        }

        
        export type ScaraKinematicsParameters = {
                    
                    linearVmax?:number;
                    
                    linearAmax?:number;
                    
                    linearJax?:number;
                    
                    jogVax?:number;
                    
                    jogAmax?:number;
                    
                    jogJmax?:number;
        }

        
        export type MatrixInstanceDouble = {
                    
                    numRows?:number;
                    
                    numCols?:number;
                    
                    data?:number[];
        }

        
        export type KinematicsParameters = {
                    
                    kinematicsConfigurationType?:KC_KINEMATICSCONFIGURATIONTYPE;
                    
                    xExtents?:number[];
                    
                    yExtents?:number[];
                    
                    zExtents?:number[];
//              Start of Union
                    scaraParameters?: ScaraKinematicsParameters,
                    sixDofsParameters?: SixDofKinematicsParameters,
                    cartesianParameters?: CartesianKinematicsParameters,
//              End of Union
                    
                    kinChainParams?:MatrixInstanceDouble;
        }

        
        export type KinematicsConfigurationConfig = {
                    
                    kinematicsConfigurationIndex?:number;
                    
                    frameIndex?:number;
                    
                    participatingJoints?:number[];
                    
                    participatingJointsCount?:number;
                    
                    kinematicsParameters?:KinematicsParameters;
        }

        
        export type KinematicsConfigurationStatus = {
                    
                    froTarget?:number;
                    
                    froActual?:number;
                    
                    atSpeed?:boolean;
                    
                    currentJointConfiguration?:number;
                    
                    cartesianActPos?:Vector3;
                    
                    cartesianActOrientation?:Quat;
                    
                    cartesianActVel?:Vector3;
                    
                    cartesianActAcc?:Vector3;
                    
                    isHomed?:boolean;
                    
                    isStopping?:boolean;
                    
                    isMoving?:boolean;
                    
                    isNearSingularity?:boolean;
        }

        
        export type KinematicsConfigurationCommand = {
                    
                    doStop?:boolean;
                    
                    froPercentage?:number;
        }

        /** 
        Configuration parameters for Digital Ins (din)
         */
        export type DinConfig = {
                    /**  Defines if the input signal is inverted */
                    inverted?:boolean;
        }

        /** 
        Status of Digital In
         */
        export type DinStatus = {
                    /**  state of the Digital In */
                    actState?:ONOFF;
        }

        /** 
        Configuration parameters for Digital Outs (dout)
         */
        export type DoutConfig = {
                    /**  Defines if the ouput signal is inverted */
                    inverted?:boolean;
        }

        /** 
        Status of Digital Outs (dout)
         */
        export type DoutStatus = {
                    /**  State of the Digital Out */
                    actState?:ONOFF;
        }

        /** 
        Commands for Digital Outs (dout)
         */
        export type DoutCommand = {
                    /**  Defines if the Dout state is to be overridden */
                    override?:boolean;
                    /**  state of the Digital Out */
                    state?:ONOFF;
        }

        /** 
        Configuration parameters for Analog Ins (ain - floats)
         */
        export type AinConfig = {
                    
                    useForVirtualAxis?:boolean;
                    
                    jointIndexForVirtualAxis?:number;
        }

        /** 
        Status of Analog Ins (ain - floats)
         */
        export type AinStatus = {
                    
                    actValue?:number;
        }

        /** 
        Configuration parameters for Analog Outs (aout - floats)
         */
        export type AoutConfig = {
        }

        /** 
        Status of  Analog Outs (aout - floats)
         */
        export type AoutStatus = {
                    
                    actValue?:number;
        }

        /** 
        Command for Analog Outs (aout - floats)
         */
        export type AoutCommand = {
                    
                    override?:boolean;
                    
                    value?:number;
        }

        /** 
        Configuration parameters for Integer Ins (iin)
         */
        export type IinConfig = {
        }

        /** 
        Status of Analog Ins (ain - floats)
         */
        export type IinStatus = {
                    /**  value of iin */
                    actValue?:number;
        }

        
        export type IoutConfig = {
        }

        
        export type IoutStatus = {
                    
                    actValue?:number;
        }

        
        export type IoutCommand = {
                    
                    override?:boolean;
                    
                    value?:number;
        }

        /** 
        Configuration parameters for moveJoints
        &lt;Ref&gt;{@link JogCommand}&lt;/Ref&gt;
         */
        export type MoveJointsConfig = {
                    /**  Index of the Kinematics Configuration (KC) to use */
                    kinematicsConfigurationIndex?:number;
        }

        /** 
        Status of moveJoints
         */
        export type MoveJointsStatus = {
                    /**  Percentage through move we currently are */
                    percentageComplete?:number;
        }

        /** 
        Command parameters for MoveJoints
         */
        export type MoveJointsCommand = {
                    /**  Array of joint positions */
                    jointPositionArray?:number[];
                    
                    positionReference?:POSITIONREFERENCE;
                    /**  Index of the move parameters (amax, vmax etc.) to be used for the move */
                    moveParamsIndex?:number;
                    /**  Triggers the activity to stop and skip to the next in a task */
                    skipToNext?:boolean;
        }

        /** 
        Parameters for streamed moveJoints
         */
        export type MoveJointsStream = {
                    /**  Index of the Kinematics Configuration (KC) to use */
                    kinematicsConfigurationIndex?:number;
                    
                    positionReference?:POSITIONREFERENCE;
                    
                    jointPositionArray?:number[];
                    
                    moveParams?:MoveParametersConfig;
        }

        /** 
        Configuration parameters for MoveJointsAtVelocity
         */
        export type MoveJointsAtVelocityConfig = {
                    /**  Index of the Kinematics Configuration (KC) to use */
                    kinematicsConfigurationIndex?:number;
        }

        /** 
        Status of MoveJointsAtVelocity
         */
        export type MoveJointsAtVelocityStatus = {
                    /**  Signals that the move as reached its programmed speed */
                    atSpeed?:boolean;
        }

        /** 
        Command parameters for MoveJointsAtVelocity
         */
        export type MoveJointsAtVelocityCommand = {
                    /**  Index of the move parameters (amax, vmax etc.) to be used for the move */
                    moveParamsIndex?:number;
                    /**  Array of joints to be used for the moveJointsAtVelocity */
                    jointVelocityArray?:number[];
                    /**  Triggers the activity to stop and skip to the next in a task */
                    skipToNext?:boolean;
        }

        /** 
        Parameters for streamed MoveJointsAtVelocity
         */
        export type MoveJointsAtVelocityStream = {
                    /**  Index of the Kinematics Configuration (KC) to use */
                    kinematicsConfigurationIndex?:number;
                    
                    moveParams?:MoveParametersConfig;
                    
                    jointVelocityArray?:number[];
        }

        /** 
        Configuration parameters for moveLine
         */
        export type MoveLineConfig = {
                    /**  Index of the Kinematics Configuration (KC) to use */
                    kinematicsConfigurationIndex?:number;
                    
                    superimposedIndex?:number;
        }

        /** 
        Status of MoveJoints
         */
        export type MoveLineStatus = {
                    /**  Percentage through move we currently are */
                    percentageComplete?:number;
        }

        /** 
        Command parameters for MoveLine
         */
        export type MoveLineCommand = {
                    /**  Index of the move parameters (amax, vmax etc.) to be used for the move */
                    moveParamsIndex?:number;
                    
                    lineIndex?:number;
                    /**  Triggers the activity to stop and skip to the next in a task */
                    skipToNext?:boolean;
        }

        /** 
        Parameters for streamed moveLine
         */
        export type MoveLineStream = {
                    /** The kinematics configuration to use for the move qq */
                    kinematicsConfigurationIndex?:number;
                    
                    moveParams?:MoveParametersConfig;
                    
                    line?:CartesianPosition;
                    
                    superimposedIndex?:number;
        }

        /** 
        Configuration parameters for moveLineAtVelocity.
         */
        export type MoveLineAtVelocityConfig = {
                    /**  Index of the Kinematics Configuration (KC) to use */
                    kinematicsConfigurationIndex?:number;
        }

        /** 
        Status of MoveLineAtVelocity
         */
        export type MoveLineAtVelocityStatus = {
                    
                    atSpeed?:boolean;
        }

        /** 
        Command parameters for moveLineAtVelocity
         */
        export type MoveLineAtVelocityCommand = {
                    /**  Index of the move parameters (amax, vmax etc.) to be used for the move */
                    moveParamsIndex?:number;
                    
                    line?:CartesianVector;
                    /**  Triggers the activity to stop and skip to the next in a task */
                    skipToNext?:boolean;
        }

        /** 
        Parameters for streamed moveLineAtVelocity
         */
        export type MoveLineAtVelocityStream = {
                    /**  Index of the Kinematics Configuration (KC) to use */
                    kinematicsConfigurationIndex?:number;
                    
                    moveParams?:MoveParametersConfig;
                    
                    line?:CartesianVector;
        }

        /** 
        Configuration parameters for moveArc.
         */
        export type MoveArcConfig = {
                    /**  Index of the Kinematics Configuration (KC) to use */
                    kinematicsConfigurationIndex?:number;
                    
                    superimposedIndex?:number;
        }

        /** 
        Status of MoveArc
         */
        export type MoveArcStatus = {
                    /**  Percentage through move we currently are */
                    percentageComplete?:number;
        }

        /** 
        Command parameters for moveArc
         */
        export type MoveArcCommand = {
                    /**  Index of the move parameters (amax, vmax etc.) to be used for the move */
                    moveParamsIndex?:number;
                    
                    arcIndex?:number;
                    /**  Triggers the activity to stop and skip to the next in a task */
                    skipToNext?:boolean;
        }

        /** 
        Parameters for streamed moveArc
         */
        export type MoveArcStream = {
                    /**  Index of the Kinematics Configuration (KC) to use */
                    kinematicsConfigurationIndex?:number;
                    
                    moveParams?:MoveParametersConfig;
                    
                    arc?:ArcsConfig;
                    
                    superimposedIndex?:number;
        }

        /** 
        Configuration parameters for moveSpline
         */
        export type MoveSplineConfig = {
                    /**  Index of the Kinematics Configuration (KC) to use */
                    kinematicsConfigurationIndex?:number;
        }

        /** 
        Status of MoveSpline
         */
        export type MoveSplineStatus = {
                    /**  Percentage through move we currently are */
                    percentageComplete?:number;
        }

        /** 
        Command parameters for moveSpline
         */
        export type MoveSplineCommand = {
                    /**  Index of the move parameters (amax, vmax etc.) to be used for the move */
                    moveParamsIndex?:number;
                    
                    splineIndex?:number;
                    /**  Triggers the activity to stop and skip to the next in a task */
                    skipToNext?:boolean;
        }

        /** 
        Configuration parameters for moveToPosition
         */
        export type MoveToPositionConfig = {
                    /**  Index of the Kinematics Configuration (KC) to use */
                    kinematicsConfigurationIndex?:number;
        }

        /** 
        Status of MoveToPosition
         */
        export type MoveToPositionStatus = {
                    /**  Percentage through move we currently are */
                    percentageComplete?:number;
        }

        /** 
        Command parameters for moveToPosition
         */
        export type MoveToPositionCommand = {
                    
                    cartesianPositionIndex?:number;
                    /**  Index of the move parameters (amax, vmax etc.) to be used for the move */
                    moveParamsIndex?:number;
                    /**  Triggers the activity to stop and skip to the next in a task */
                    skipToNext?:boolean;
        }

        /** 
        Parameters for streamed moveToPosition
         */
        export type MoveToPositionStream = {
                    /**  Index of the Kinematics Configuration (KC) to use */
                    kinematicsConfigurationIndex?:number;
                    
                    moveParams?:MoveParametersConfig;
                    
                    cartesianPosition?:CartesianPositionsConfig;
        }

        
        export type SetDoutConfig = {
        }

        
        export type SetDoutStatus = {
        }

        
        export type SetDoutCommand = {
                    
                    doutToSet?:number;
                    
                    valueToSet?:boolean;
        }

        
        export type SetAoutConfig = {
        }

        
        export type SetAoutStatus = {
        }

        
        export type SetAoutCommand = {
                    
                    aoutToSet?:number;
                    
                    valueToSet?:number;
        }

        
        export type SetIoutConfig = {
        }

        
        export type SetIoutStatus = {
        }

        
        export type SetIoutCommand = {
                    
                    ioutToSet?:number;
                    
                    valueToSet?:number;
        }

        /** 
        Configuration parameters for waitOn
         */
        export type WaitOnConfig = {
                    /**  Trigger upon which to wait */
                    waitOnTriggerIndex?:number;
        }

        /** 
        Status of waitOn
         */
        export type WaitOnStatus = {
                    /**  Signals the waitOn is in waiting state */
                    waiting?:boolean;
        }

        /** 
        Command parameters for waitOn
         */
        export type WaitOnCommand = {
                    /**  Triggers the activity to stop and skip to the next in a task */
                    skipToNext?:boolean;
        }

        /** 
        Configuration parameters for dwell
         */
        export type DwellConfig = {
                    /**  Number of ticks that you want to wait for */
                    ticksToDwell?:number;
        }

        /** 
        Status of Dwell
         */
        export type DwellStatus = {
                    /**  Number of ticks that are remaining in the dwell */
                    remainingTicks?:number;
        }

        /** 
        Command parameters for dwell
         */
        export type DwellCommand = {
                    /**  Triggers the activity to stop and skip to the next in a task */
                    skipToNext?:boolean;
        }

        /** 
        Configuration parameters for latchPos
         */
        export type LatchPosConfig = {
                    
                    cartesianLatch?:boolean;
                    /**  Index of the Kinematics Configuration (KC) to use */
                    kinematicsConfigurationIndex?:number;
                    
                    jointLatch?:boolean;
                    
                    latchTriggerIndex?:number;
        }

        /** 
        Status of latchPos
         */
        export type LatchPosStatus = {
                    
                    latched?:boolean;
                    
                    latchedCartesianPosition?:CartesianPosition;
                    
                    latchedJointArray?:JointPosition[];
        }

        /** 
        Command parameters for latchPos
         */
        export type LatchPosCommand = {
                    /**  Triggers the activity to stop and skip to the next in a task */
                    skipToNext?:boolean;
        }

        /** 
        Configuration parameters for switchPose
         */
        export type SwitchPoseConfig = {
                    /**  Index of the Kinematics Configuration (KC) to use */
                    kinematicsConfigurationIndex?:number;
                    
                    newJointConfiguration?:number;
                    /**  Index of the move parameters (amax, vmax etc.) to be used for the move */
                    moveParamsIndex?:number;
        }

        /** 
        Status of switchPose
         */
        export type SwitchPoseStatus = {
                    /**  Percentage through move we currently are */
                    percentageComplete?:number;
        }

        /** 
        Command parameters for switchPose
         */
        export type SwitchPoseCommand = {
                    /**  Triggers the activity to stop and skip to the next in a task */
                    skipToNext?:boolean;
        }

        /** 
        Configuration parameters for gearInVelo
         */
        export type GearInVeloConfig = {
                    /**  Kinematics configuration to use for the master */
                    masterKinematicsConfigurationIndex?:number;
                    /**  Kinematics configuration to use for the slave */
                    slaveKinematicsConfigurationIndex?:number;
                    
                    gearingFrameIndex?:number;
                    
                    gearRatio?:number;
                    
                    syncActivationDelay?:number;
        }

        /** 
        Status of gearInVelo
         */
        export type GearInVeloStatus = {
                    /**  Percentage through move we currently are */
                    percentageComplete?:number;
                    
                    gearInFailed?:boolean;
                    
                    gearedIn?:boolean;
        }

        /** 
        Command parameters for gearInVelo
         */
        export type GearInVeloCommand = {
                    /**  Triggers the activity to stop and skip to the next in a task */
                    skipToNext?:boolean;
                    
                    updatedRatio?:number;
                    
                    updateRation?:boolean;
        }

        /** 
        Configuration parameters for gearInPos
         */
        export type GearInPosConfig = {
                    /**  Kinematics configuration to use for the master */
                    masterKinematicsConfigurationIndex?:number;
                    /**  Kinematics configuration to use for the slave */
                    slaveKinematicsConfigurationIndex?:number;
                    
                    gearingFrameIndex?:number;
                    
                    gearRatio?:number;
                    
                    strategyToUse?:STRATEGYGEARINPOS;
                    
                    gearRatioMaster?:number;
                    
                    gearRatioSlave?:number;
                    
                    masterSyncPosition?:CartesianPosition;
                    
                    slaveSyncPosition?:CartesianPosition;
                    
                    syncActivationDelay?:number;
        }

        /** 
        Status of gearInPos
         */
        export type GearInPosStatus = {
                    /**  Percentage through move we currently are */
                    percentageComplete?:number;
                    
                    gearInFailed?:boolean;
                    
                    gearedIn?:boolean;
        }

        /** 
        Command parameters for gearInPos
         */
        export type GearInPosCommand = {
                    /**  Triggers the activity to stop and skip to the next in a task */
                    skipToNext?:boolean;
                    
                    updatedRatioMaster?:number;
                    
                    updatedRatioSlave?:number;
                    
                    updatedMasterSyncPosition?:CartesianPosition;
                    
                    updatedSlaveSyncPosition?:CartesianPosition;
        }

        /** 
        Configuration parameters for gearInDyn
         */
        export type GearInDynConfig = {
                    /**  Kinematics configuration to use for the master */
                    masterKinematicsConfigurationIndex?:number;
                    /**  Kinematics configuration to use for the slave */
                    slaveKinematicsConfigurationIndex?:number;
                    
                    gearingFrameIndex?:number;
                    
                    gearRatio?:number;
        }

        /** 
        Status of gearInDyn
         */
        export type GearInDynStatus = {
                    
                    gearInFailed?:boolean;
                    
                    gearedIn?:boolean;
        }

        /** 
        Command parameters for gearInDyn
         */
        export type GearInDynCommand = {
                    /**  Triggers the activity to stop and skip to the next in a task */
                    skipToNext?:boolean;
        }

        
        export type GearInDynMetrics = {
                    
                    timeToGearIn?:number;
        }

        
        export type StressTestConfig = {
        }

        
        export type StressTestStatus = {
        }

        
        export type StressTestCommand = {
        }

        
        export type StressTestStream = {
        }

        
        export type ActivityConfig = {
                    
                    activityType?:ACTIVITYTYPE;
                    
                    skipToNextTriggerIndex?:number;
                    
                    skipToNextTriggerType?:TRIGGERTYPE;
//              Start of Union
                    moveJoints?: MoveJointsConfig,
                    moveJointsAtVelocity?: MoveJointsAtVelocityConfig,
                    moveLine?: MoveLineConfig,
                    moveLineAtVelocity?: MoveLineAtVelocityConfig,
                    moveArc?: MoveArcConfig,
                    moveSpline?: MoveSplineConfig,
                    moveToPosition?: MoveToPositionConfig,
                    gearInPos?: GearInPosConfig,
                    gearInVelo?: GearInVeloConfig,
                    gearInDyn?: GearInDynConfig,
                    setDout?: SetDoutConfig,
                    setAout?: SetAoutConfig,
                    setIout?: SetIoutConfig,
                    dwell?: DwellConfig,
                    waitOn?: WaitOnConfig,
                    switchPose?: SwitchPoseConfig,
                    latchPos?: LatchPosConfig,
                    stressTest?: StressTestConfig,
//              End of Union
        }

        
        export type ActivityStatus = {
                    
                    state?:ACTIVITYSTATE;
                    
                    tag?:number;
//              Start of Union
                    moveJoints?: MoveJointsStatus,
                    moveJointsAtVelocity?: MoveJointsAtVelocityStatus,
                    moveLine?: MoveLineStatus,
                    moveLineAtVelocity?: MoveLineAtVelocityStatus,
                    moveArc?: MoveArcStatus,
                    moveSpline?: MoveSplineStatus,
                    moveToPosition?: MoveToPositionStatus,
                    gearInPos?: GearInPosStatus,
                    gearInVelo?: GearInVeloStatus,
                    gearInDyn?: GearInDynStatus,
                    setDout?: SetDoutStatus,
                    setAout?: SetAoutStatus,
                    setIout?: SetIoutStatus,
                    dwell?: DwellStatus,
                    waitOn?: WaitOnStatus,
                    switchPose?: SwitchPoseStatus,
                    latchPos?: LatchPosStatus,
                    stressTest?: StressTestStatus,
//              End of Union
        }

        
        export type ActivityCommand = {
//              Start of Union
                    moveJoints?: MoveJointsCommand,
                    moveJointsAtVelocity?: MoveJointsAtVelocityCommand,
                    moveLine?: MoveLineCommand,
                    moveLineAtVelocity?: MoveLineAtVelocityCommand,
                    moveArc?: MoveArcCommand,
                    moveSpline?: MoveSplineCommand,
                    moveToPosition?: MoveToPositionCommand,
                    gearInPos?: GearInPosCommand,
                    gearInVelo?: GearInVeloCommand,
                    gearInDyn?: GearInDynCommand,
                    setDout?: SetDoutCommand,
                    setAout?: SetAoutCommand,
                    setIout?: SetIoutCommand,
                    dwell?: DwellCommand,
                    waitOn?: WaitOnCommand,
                    switchPose?: SwitchPoseCommand,
                    latchPos?: LatchPosCommand,
                    stressTest?: StressTestCommand,
//              End of Union
                    
                    skipToNext?:boolean;
        }

        
        export type ActivityStreamItem = {
                    
                    activityType?:ACTIVITYTYPE;
                    
                    tag?:number;
//              Start of Union
                    moveJoints?: MoveJointsStream,
                    moveJointsAtVelocity?: MoveJointsAtVelocityStream,
                    moveLine?: MoveLineStream,
                    moveLineAtVelocity?: MoveLineAtVelocityStream,
                    moveArc?: MoveArcStream,
                    moveToPosition?: MoveToPositionStream,
                    setDout?: SetDoutCommand,
                    setAout?: SetAoutCommand,
                    setIout?: SetIoutCommand,
                    dwell?: DwellConfig,
                    stressTest?: StressTestStream,
//              End of Union
        }

        
        export type ActivityMetrics = {
//              Start of Union
                    gearInDyn?: GearInDynMetrics,
//              End of Union
        }

        
        export type SoloActivityConfig = {
        }

        export type SoloActivityStatus = ActivityStatus
        export type SoloActivityCommand = ActivityStreamItem
        
        export type FramesConfig = {
                    
                    translation?:Vector3;
                    
                    rotation?:Quat;
                    
                    parent?:number;
                    
                    absRel?:FRAME_ABSRELATIVE;
        }

        
        export type FramesCommand = {
                    
                    translation?:Vector3;
                    
                    rotation?:Quat;
                    
                    override?:boolean;
        }

        
        export type FramesStatus = {
        }

        
        export type ToolConfig = {
                    
                    toolIndex?:number;
                    
                    frameIndex?:number;
        }

        
        export type ToolStatus = {
                    
                    openOrClosed?:OPENCLOSED;
        }

        
        export type ToolCommand = {
                    
                    openOrClose?:OPENCLOSED;
        }

        
        export type TriggerOnConfig = {
                    
                    aiIndex?:number;
                    
                    vaiIndex?:number;
                    
                    threshold?:number;
                    
                    aiThreholdGreaterLessThan?:GTLT;
                    
                    diIndex?:number;
                    
                    vdiIndex?:number;
                    
                    diTriggerState?:ONOFF;
                    
                    numberofTicksBeforeTrigger?:number;
        }


