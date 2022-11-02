import { ACTIVITYTYPE, KC_KINEMATICSCONFIGURATIONTYPE } from "@glowbuzzer/store"

// EDIT THIS FILE TO CONTROL THE INITIAL CONFIG IN THE REDUX STORE FOR GBC CONTROLS/TILES DOCS

const DEFAULT_JOINT_CONFIG = {
    pmin: -100,
    pmax: 100,
    vmax: 2000,
    amax: 40000,
    jmax: 800000,
    scale: 1000.0
}

export const sample_config = {
    machine: {
        default: {
            enabled: 1,
            busCycleTime: 1
        }
    },
    kinematicsConfiguration: {
        default: {
            frameIndex: 0,
            participatingJoints: [0, 1, 2],
            participatingJointsCount: 3,
            kinematicsParameters: {
                kinematicsConfigurationType: KC_KINEMATICSCONFIGURATIONTYPE.KC_CARTESIAN,
                xExtents: [-150, 150],
                yExtents: [-150, 150],
                zExtents: [-150, 150],
                cartesianParameters: {
                    linearVmax: 10000,
                    linearAmax: 100000,
                    linearJmax: 1000000,
                    tcpRotationalVmax: 100,
                    tcpRotationalAmax: 1000,
                    tcpRotationalJmax: 10000
                }
            }
        }
    },
    moveParameters: {
        default: { vmaxPercentage: 100, amaxPercentage: 100, jmaxPercentage: 100 }
    },
    joint: {
        0: DEFAULT_JOINT_CONFIG,
        1: DEFAULT_JOINT_CONFIG,
        2: DEFAULT_JOINT_CONFIG
    },
    jog: {
        0: {
            kinematicsConfigurationIndex: 0
        }
    },
    frames: {
        robot: {
            translation: {
                x: 50,
                y: 50,
                z: 0
            }
        },
        pallet: {
            translation: {
                x: 100,
                y: 100,
                z: 0
            }
        },
        part: {
            absRel: 1,
            parent: 1,
            translation: {
                x: 10,
                y: 0,
                z: 0
            }
        },
        other: {
            absRel: 1,
            parent: 0,
            translation: {
                x: 100,
                y: 0,
                z: 0
            }
        }
    },
    task: {
        "Run conveyor": {
            "Move conveyor at velocity": {
                activityType: ACTIVITYTYPE.ACTIVITYTYPE_MOVEJOINTSATVELOCITY
            }
        },
        "Perform quality check": {
            "Wait for magic eye": {
                activityType: ACTIVITYTYPE.ACTIVITYTYPE_DWELL
            },
            "Take photo": {
                activityType: ACTIVITYTYPE.ACTIVITYTYPE_SETDOUT
            },
            "Wait for 2s": {
                activityType: ACTIVITYTYPE.ACTIVITYTYPE_DWELL
            }
        }
    },
    dout: {
        0: {},
        1: {}
    },
    din: {
        0: {},
        1: {}
    },
    aout: {
        0: {},
        1: {}
    },
    ain: {
        0: {},
        1: {}
    }
}
