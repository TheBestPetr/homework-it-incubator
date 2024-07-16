import {PostsMongoRepository} from "../04-repository/posts-mongo-repository";
import {InputBlogPostType, InputPostType, OutputPostType} from "../../types/input-output-types/post-type";
import {ObjectId} from "mongodb";
import {BlogsMongoQueryRepository,} from "../../02-blogs/04-repository/blogs-mongo-query-repository";
import {PostClass} from "../../classes/post-class";
import {LikeStatus} from "../../types/input-output-types/comment-type";
import {PostLikesInfoMongoRepository} from "../04-repository/post-likes-info-mongo-repository";
import {PostLikeInfoClass} from "../../classes/post-like-info-class";
import {UsersMongoQueryRepository} from "../../04-users/04-repository/users-mongo-query-repository";

export class PostsService {
    constructor(
        protected postsMongoRepository: PostsMongoRepository,
        protected blogsMongoQueryRepository: BlogsMongoQueryRepository,
        protected postLikeInfoMongoRepository: PostLikesInfoMongoRepository,
        protected usersMongoQueryRepository: UsersMongoQueryRepository
    ) {}

    async create(input: InputPostType): Promise<OutputPostType> {
        const blog = await this.blogsMongoQueryRepository.findById(input.blogId)
        const createdPost = new PostClass(
            input.title,
            input.shortDescription,
            input.content,
            new ObjectId(input.blogId).toString(),
            blog!.name,
            new Date().toISOString(),
            {likesCount: 0, dislikesCount: 0}
        )
        const insertedPost = await this.postsMongoRepository.create(createdPost)
        return {
            id: insertedPost.id.toString(),
            title: createdPost.title,
            shortDescription: createdPost.shortDescription,
            content: createdPost.content,
            blogId: createdPost.blogId,
            blogName: createdPost.blogName,
            createdAt: createdPost.createdAt,
            extendedLikesInfo: {
                likesCount: insertedPost.likesInfo.likesCount,
                dislikesCount: insertedPost.likesInfo.dislikesCount,
                myStatus: 'None',
            }
        }
    }

    async createPostForBlogIdParams(blogId: string, input: InputBlogPostType): Promise<OutputPostType> {
        const blog = await this.blogsMongoQueryRepository.findById(blogId)
        const createdPost = new PostClass(
            input.title,
            input.shortDescription,
            input.content,
            new ObjectId(blogId).toString(),
            blog!.name,
            new Date().toISOString(),
            {likesCount: 0, dislikesCount: 0}
        )
        const insertedPost = await this.postsMongoRepository.create(createdPost)
        return {
            id: insertedPost.id.toString(),
            title: createdPost.title,
            shortDescription: createdPost.shortDescription,
            content: createdPost.content,
            blogId: createdPost.blogId,
            blogName: createdPost.blogName,
            createdAt: createdPost.createdAt,
            extendedLikesInfo: {
                likesCount: insertedPost.likesInfo.likesCount,
                dislikesCount: insertedPost.likesInfo.dislikesCount,
                myStatus: 'None',
            }
        }
    }

    async update(id: string, input: InputPostType): Promise<boolean> {
        const result = await this.postsMongoRepository.update(id, input)
        return result.matchedCount === 1
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.postsMongoRepository.delete(id)
        return result.deletedCount === 1
    }

    async updateLikeStatus(postId: string, userId: string, inputLikeStatus: LikeStatus): Promise<boolean> {
        const postLikesInfo = await this.postLikeInfoMongoRepository.findLikesInfo(postId, userId)
        const user = await this.usersMongoQueryRepository.findById(userId)
        if (!postLikesInfo?.status) {
            const newCommentLikeInfo = new PostLikeInfoClass(
                postId,
                userId,
                user!.login,
                inputLikeStatus,
                new Date().toISOString()
            )
            const createLikeInfo = await this.postLikeInfoMongoRepository.createNewLikeInfo(newCommentLikeInfo)
            const updateLikesCount = await this.postsMongoRepository.updateAddPostLikesCount(postId, inputLikeStatus)
            return createLikeInfo && updateLikesCount
        }
        const updateLikeInfo = await this.postLikeInfoMongoRepository.updatePostLikeInfo(postId, userId, inputLikeStatus)
        const updateLikesCount = await this.postsMongoRepository.updateExistPostLikesCount(postId, postLikesInfo.status, inputLikeStatus)
        return updateLikeInfo && updateLikesCount
    }
}