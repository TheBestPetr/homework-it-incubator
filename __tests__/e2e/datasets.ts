import {DbType} from "../../src/db/db.type";
import {Resolutions} from "../../src/04-input-output-types/videoType";
import {DBType} from "../../src/db/db";

export const video1: DbType = {
    id: Date.now() + Math.random(),
    title: 't' + Date.now() + Math.random(),
    author: 'a' + Date.now() + Math.random(),
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date().toISOString(),
    availableResolutions: [Resolutions.P1440]
}

export const dataset1: DBType = {
    videos: [video1]
}