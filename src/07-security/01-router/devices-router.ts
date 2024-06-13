import {Router} from "express";
import {devicesController} from "../02-controllers/devices-controller";

export const devicesRouter = Router()

devicesRouter.get('/',
    devicesController.getAllDevicesWithActiveSession)

devicesRouter.delete('/',
    devicesController.terminateAllDevicesSession)

devicesRouter.delete('/:deviceId',
    devicesController.terminateSpecifiedDeviceSession)