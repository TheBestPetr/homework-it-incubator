import {ResultStatus} from "./result-status";

export type Result<T = null> = {
    status: ResultStatus
    errorMessage?: string
    extensions?: [{field: 'id', message: ''}]
    data: T
}