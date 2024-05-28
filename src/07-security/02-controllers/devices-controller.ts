import {Request, Response} from "express";
import {OutputDeviceType} from "../../types/input-output-types/device-type";
import {devicesService} from "../03-service/devices-service";
import {devicesMongoQueryRepository} from "../04-repository/devices-mongo-query-repository";

export const getAllDevicesWithActiveSession = async (req: Request,
                                                     res: Response<OutputDeviceType[]>) => {
    const activeSessions = await devicesMongoQueryRepository.findActiveSessions(req.cookies.refreshToken)
    if (!activeSessions) {
        res.sendStatus(401)
        return
    }
    res.status(200).send(activeSessions)
}

export const terminateAllDevicesSession = async (req: Request,
                                                 res: Response) => {
    if (!req.cookies.refreshToken) {
        res.sendStatus(401)
        return
    }
    const isSessionsTerminated = await devicesService.terminateAllSessions(req.cookies.refreshToken)
    if (isSessionsTerminated) {
        res.sendStatus(204)
        return
    }
    res.sendStatus(404)
}

export const terminateSpecifiedDeviceSession = async (req: Request<{deviceId: string}>,
                                                      res: Response) => {
    const sessionToTerminate = await devicesService.findSessionToTerminate(req.params.deviceId)
    if (!sessionToTerminate) {
        res.sendStatus(404)
        return
    }
    if (!req.cookies.refreshToken) {
        res.sendStatus(401)
        return
    }
    const isUserCanTerminateSession = await devicesService.isUserCanTerminateSession(req.cookies.refreshToken, req.params.deviceId)
    if (!isUserCanTerminateSession) {
        res.sendStatus(403)
        return
    }
    res.sendStatus(204)
}