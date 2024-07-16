export class PostLikeInfoClass {
    constructor(
        public postId: string,
        public userId: string,
        public userLogin: string,
        public status: 'None' | 'Like' | 'Dislike',
        public createdAt: string,
    ) {
    }
}