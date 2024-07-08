export class CommentLikeInfoClass {
    constructor(
        public commentId: string,
        public userId: string,
        public status: 'None' | 'Like' | 'Dislike',
        public createdAt: string
    ) {
    }
}