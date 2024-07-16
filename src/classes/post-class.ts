export class PostClass {
    constructor(
        public title: string,
        public shortDescription: string,
        public content: string,
        public blogId: string,
        public blogName: string,
        public createdAt: string,
        public likesInfo: {
            likesCount: number,
            dislikesCount: number
        }
    ) {
    }
}