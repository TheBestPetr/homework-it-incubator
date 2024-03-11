import {VideoDBType} from "../../src/db/video.db.type";
import {Resolutions} from "../../src/enums/AvailableResolutionsEnum";
import {DBType} from "../../src/db/video.db";

export const video1: VideoDBType = {
    id: Date.now() + Math.random(),
    title: 't' + Date.now() + Math.random(),
    author: 'a' + Date.now() + Math.random(),
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date().toISOString(),
    availableResolution: [Resolutions.P1080]
}

export const dataset1: DBType = {
    videos: [video1]
}