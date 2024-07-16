import {PostModel} from "../../db/mongo/mongo-db";
import {InputPostQueryType, OutputPostQueryType, OutputPostType} from "../../types/input-output-types/post-type";
import {ObjectId} from "mongodb";
import {JwtService} from "../../application/jwt-service/jwt-service";
import {PostLikesInfoMongoRepository} from "./post-likes-info-mongo-repository";

export class PostsMongoQueryRepository {
    async find(query: InputPostQueryType, token?: string): Promise<OutputPostQueryType> {
        const items = await PostModel
            .find()
            .sort({[`${query.sortBy}`]: query.sortDirection})
            .skip((query.pageNumber - 1) * query.pageSize)
            .limit(query.pageSize)
            .lean()
        let postLikesInfo = null
        const totalCount = await PostModel.countDocuments()
        if (token) {
            const jwtService = new JwtService()
            const postLikesInfoMongoRepository = new PostLikesInfoMongoRepository()
            const userId = await jwtService.getUserIdByToken(token.split(' ')[1])
            const itemsWitsStatusNNewestLikes = await Promise.all(items.map(async post => {
                postLikesInfo = await postLikesInfoMongoRepository.findLikesInfo(post._id.toString(), userId)
                const newestLikes = await postLikesInfoMongoRepository.findNewestLikes(post._id.toString())
                return {
                    id: post._id.toString(),
                    title: post.title,
                    shortDescription: post.shortDescription,
                    content: post.content,
                    blogId: post.blogId,
                    blogName: post.blogName,
                    createdAt: post.createdAt,
                    extendedLikesInfo: {
                        likesCount: post.likesInfo.likesCount,
                        dislikesCount: post.likesInfo.dislikesCount,
                        myStatus: postLikesInfo?.status ? postLikesInfo.status : 'None',
                        newestLikes: newestLikes?.map(like => ({
                            addedAt: like.createdAt,
                            userId: like.userId,
                            login: like.userLogin
                        }))
                    }
                }
            }))
            return {
                pagesCount: Math.ceil(totalCount / query.pageSize),
                page: query.pageNumber,
                pageSize: query.pageSize,
                totalCount: totalCount,
                items: itemsWitsStatusNNewestLikes
            }
        }
        const itemsWithNewestLikes = await Promise.all(items.map(async post => {
            const postLikesInfoMongoRepository = new PostLikesInfoMongoRepository()
            const newestLikes = await postLikesInfoMongoRepository.findNewestLikes(post._id.toString())
            return {
                id: post._id.toString(),
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId,
                blogName: post.blogName,
                createdAt: post.createdAt,
                extendedLikesInfo: {
                    likesCount: post.likesInfo.likesCount,
                    dislikesCount: post.likesInfo.dislikesCount,
                    myStatus: 'None',
                    newestLikes: newestLikes?.map(like => ({
                        addedAt: like.createdAt,
                        userId: like.userId,
                        login: like.userLogin
                    }))
                }
            }
        }))
        return {
            pagesCount: Math.ceil(totalCount / query.pageSize),
            page: query.pageNumber,
            pageSize: query.pageSize,
            totalCount: totalCount,
            items: itemsWithNewestLikes
        }
    }

    async findPostsByBlogId(query: InputPostQueryType, blogId: string, token?: string): Promise<OutputPostQueryType> {
        const items = await PostModel
            .find({blogId: blogId})
            .sort({[`${query.sortBy}`]: query.sortDirection})
            .skip((query.pageNumber - 1) * query.pageSize)
            .limit(query.pageSize)
            .lean()
        const totalCount = await PostModel.countDocuments({blogId: blogId})
        return {
            pagesCount: Math.ceil(totalCount / query.pageSize),
            page: query.pageNumber,
            pageSize: query.pageSize,
            totalCount: totalCount,
            //@ts-ignore todo mapping
            items: items.map(post => ({
                id: post._id.toString(),
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId,
                blogName: post.blogName,
                createdAt: post.createdAt
            }))
        }
    }

    async findById(postId: string, token?: string): Promise<OutputPostType | null> {
        let postLikesInfo = null
        if (token) {
            const jwtService = new JwtService()
            const postLikesInfoMongoRepository = new PostLikesInfoMongoRepository()
            const userId = await jwtService.getUserIdByToken(token.split(' ')[1])
            postLikesInfo = await postLikesInfoMongoRepository.findLikesInfo(postId, userId)
        }
        const post = await PostModel.findOne({_id: new ObjectId(postId)}).lean()
        if (post) {
            const postLikesInfoMongoRepository = new PostLikesInfoMongoRepository()
            const newestLikes = await postLikesInfoMongoRepository.findNewestLikes(postId)
            return {
                id: post._id.toString(),
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId,
                blogName: post.blogName,
                createdAt: post.createdAt,
                extendedLikesInfo: {
                    likesCount: post.likesInfo.likesCount,
                    dislikesCount: post.likesInfo.dislikesCount,
                    myStatus: postLikesInfo?.status ? postLikesInfo?.status : 'None',
                    newestLikes: newestLikes?.map(like => ({
                        addedAt: like.createdAt,
                        userId: like.userId,
                        login: like.userLogin
                    }))
                }
            }
        }
        return null
    }
}