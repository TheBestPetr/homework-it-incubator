import {UserDbType} from "../types/db-types/user-db-type";

declare global {
    declare namespace Express {
        export interface Request {
            user: UserDbType | null
        }
    }
}