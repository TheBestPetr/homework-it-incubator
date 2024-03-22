import {Resolutions} from "../04-input-output-types/videoType";


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

export type BlogDBType = {
    id: string
    name: string
    description: string
    websiteUrl: string
}

export type PostDBType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
}