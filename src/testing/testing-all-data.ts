import {Request, Response} from "express";
import {db} from "../db/db";
import {
    BlogModel, CommentLikeInfoModel,
    CommentModel,
    DeviceModel, PostLikeInfoModel,
    PostModel,
    RefreshTokenBlacklistModel,
    ReqCountModel,
    UserModel
} from "../db/mongo/mongo-db";

export const TestingAllData = async (req: Request, res: Response) => {
    db.videos = []
    db.blogs = []
    db.posts = []
    await BlogModel.deleteMany()
    await PostModel.deleteMany()
    await UserModel.deleteMany()
    await CommentModel.deleteMany()
    await DeviceModel.deleteMany()
    await RefreshTokenBlacklistModel.deleteMany()
    await DeviceModel.deleteMany()
    await ReqCountModel.deleteMany()
    await CommentLikeInfoModel.deleteMany()
    await PostLikeInfoModel.deleteMany()
    res.status(204).send('you delete all data')
}