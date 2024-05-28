import {config} from 'dotenv'

config()

export const SETTINGS = {
    PORT: process.env.PORT || 3000,
    MONGO_URL: process.env.MONGO_URL || '',
    DB_NAME: process.env.DB_NAME || '',
    DB_COLLECTION_NAME: {
        BLOG: process.env.BLOG_COLLECTION_NAME || '',
        POST: process.env.POST_COLLECTION_NAME || '',
        USER: process.env.USER_COLLECTION_NAME || '',
        COMMENT: process.env.COMMENT_COLLECTION_NAME || '',
        DEVICE: process.env.DEVICE_COLLECTION_NAME || '',
        REFRESH_TOKEN_BLACKLIST: process.env.REFRESH_TOKEN_BLACKLIST_COLLECTION_NAME || '',
        REQ_COUNTER: process.env.REQ_COUNTER_COLLECTION_NAME || ''
    },
    PATH: {
        VIDEOS: '/videos',
        TESTING: '/testing/all-data',
        BLOGS: '/blogs',
        POSTS: '/posts',
        USERS: '/users',
        AUTH: '/auth',
        COMMENTS: '/comments',
        DEVICES: '/security/devices'
    },
    JWT_SECRET: process.env.JWT_SECRET || ''
}