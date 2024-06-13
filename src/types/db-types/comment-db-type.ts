export type CommentatorType = {
    userId: string
    userLogin: string
}

export type LikesType = {
    likesCount: number
    dislikesCount: number
    myStatus: 'None' | 'Like' | 'Dislike'
}

export type CommentDbType = {
    postId: string
    content: string
    commentatorInfo: CommentatorType
    createdAt: string
    //likesInfo: LikesType
}