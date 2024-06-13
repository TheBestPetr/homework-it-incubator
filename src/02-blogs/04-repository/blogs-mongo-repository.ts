import {InputBlogType} from "../../types/input-output-types/blog-type";
import {BlogModel} from "../../db/mongo/mongo-db";
import {ObjectId} from "mongodb";
import {BlogDBType} from "../../types/db-types/blog-db-type";

class BlogsMongoRepository {
    async create(input: BlogDBType) {
        return BlogModel.create({...input})
    }

    async update(id: string, input: InputBlogType) {
        return BlogModel.updateOne({_id: new ObjectId(id)}, {$set: {...input}})
    }

    async delete(id: string) {
        return BlogModel.deleteOne({_id: new ObjectId(id)})
    }
}

export const blogsMongoRepository = new BlogsMongoRepository()