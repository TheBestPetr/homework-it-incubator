import {Router} from "express"
import {TestingAllData} from "./testingAllData";

export const testingRouter = Router()

testingRouter.delete('/', TestingAllData)