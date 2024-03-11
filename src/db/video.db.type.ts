import {Resolutions} from "../input-output-types/outputVideoType";


export type VideoDBType = {
    id: number
    title: string
    author: string
    canBeDownloaded: boolean
    minAgeRestriction: null
    createdAt: string
    publicationDate: string
    availableResolution: Resolutions[]
}