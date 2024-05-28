import {Router} from "express";
import {
    getAllDevicesWithActiveSession,
    terminateAllDevicesSession,
    terminateSpecifiedDeviceSession
} from "../02-controllers/devices-controller";

export const devicesRouter = Router()

devicesRouter.get('/',
    getAllDevicesWithActiveSession)

devicesRouter.delete('/',
    terminateAllDevicesSession)

devicesRouter.delete('/:deviceId',
    terminateSpecifiedDeviceSession)