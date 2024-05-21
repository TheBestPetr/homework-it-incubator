import {Resolutions} from "../input-output-types/video-type";

export type VideoDbType = {
    id: number
    title: string
    author: string
    canBeDownloaded: boolean
    minAgeRestriction: null | number
    createdAt: string
    publicationDate: string
    availableResolutions: Resolutions[]
}