import {config} from 'dotenv'
config()

export const SETTINGS = {
    PORT: process.env.PORT || 3000,
    PATH: {
        VIDEOS: '/videos',
        TESTING: '/testing/all-data',
        POSTS: '/posts',
        BLOGS: '/blogs'
    }
}