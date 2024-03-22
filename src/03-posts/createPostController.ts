import {Request, Response} from "express";
import {InputPostType, PostType} from "../04-input-output-types/postType";
import {db} from "../db/db";

export const CreatePostController = (req: Request<{}, {}, InputPostType>,
                                     res: Response<PostType | Object>) => {
    const blogIdName = db.blogs.findIndex(b => b.id === req.body.blogId)
    if (blogIdName === -1) {res.status(400).json({
        errorsMessages: [{
                "message": "blog does not exist",
                "field": "blogId"
            }]
    })
    }
    const newPost: PostType = {
        id: Date.now() + Math.random().toString(),
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.body.blogId,
        blogName: db.blogs[blogIdName].name
    }
    db.posts.push(newPost)
    res.status(201).json(newPost)
}