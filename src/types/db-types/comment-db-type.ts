export type CommentatorType = {
    userId: string
    userLogin: string
}

export type LikesType = {
    likesCount: number
    dislikesCount: number
}

export type CommentDbType = {
    postId: string
    content: string
    commentatorInfo: CommentatorType
    createdAt: string
    likesInfo: LikesType
}