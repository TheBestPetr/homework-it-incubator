import {AvailableResolutionsEnum} from "../enums/AvailableResolutionsEnum";

type videoType = {
    id: number
    title: string
    author: string
    canBeDownloaded: boolean
    minAgeRestriction: number | null
    createdAt: string
    publicationDate: string
    availableResolutions: AvailableResolutionsEnum[]
}

type dbType = {
    videos: Array<videoType>
}

export const db: dbType = {
    videos: [{
        id: 0,
        title: "string",
        author: "string",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2024-02-04T14:33:25.854Z",
        publicationDate: "2024-02-05T14:33:25.854Z",
        availableResolutions: [
            AvailableResolutionsEnum.P144
        ]
    }]
}
