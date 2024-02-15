import request from 'supertest'
import {app} from "../../src/settings/setting"
import {videos} from "../../src/routes/videos.router";

describe('/videos', () => {
    it('should return 200 and all videos', async () => {
        await request(app)
            .get('/videos')
            .expect(200, videos)
    })
    it('should return 404 for existing video', async () => {
        await request(app)
            .get('/videos/-1')
            .expect(404)
    })
    it(`shouldn't create new video with incorrect data`, async () => {
        await request(app)
            .post('/videos')
            .send({
                id: new Date(),
                title: 5,
                author: 'hghghghghghghghghghghgh',
                age: 33
            })
            .expect(400)
    })
    it(`should create new video with correct data`, async () => {
        const createResponse = await request(app)
            .post('/videos')
            .send({id: new Date(),
                title: 'New video',
                author: 'Ignat',
                canBeDownloaded: true,
                age: 18,
                createdAt: "2024-02-04T14:33:25.854Z",
                publicationDate: "2024-02-04T14:33:25.854Z",
                availableResolutions: [
                    "P144"
                ]
            })
            .expect(201)
            const createdResponse = createResponse.body
            expect(createdResponse).toEqual({
                id: expect.any(Number),
                title: 'New video',
                author: 'Ignat',
                canBeDownloaded: true,
                age: 18,
                createdAt: "2024-02-04T14:33:25.854Z",
                publicationDate: "2024-02-04T14:33:25.854Z",
                availableResolutions: [
                    "P144"
                ]
            })
    })
    it(`shouldn't update new video with incorrect data`, async () => {
        await request(app)
            .put('/videos/0')
            .send({
                    id: 'sk',
                    title: 10,
                    author: 35,
                    canBeDownloaded: true,
                    age: '15',
                    createdAt: "2024-02-04T14:33:25.854Z",
                    publicationDate: "2024-02-04T14:33:25.854Z",
                    availableResolutions: [
                        "P144"
                    ]
                }
            )
            .expect(400)
    })
    it(`should update new video with correct data`, async () => {
        const createResponse = await request(app)
            .put('/videos/0')
            .send({
                    id: 10,
                    title: 'New video',
                    author: 'Ignat',
                    canBeDownloaded: true,
                    age: 15,
                    createdAt: "2024-02-04T14:33:25.854Z",
                    publicationDate: "2024-02-04T14:33:25.854Z",
                    availableResolutions: [
                        "P144"
                    ]
                }
            )
            .expect(204)
            const createdResponse = createResponse.body
            expect(createdResponse).toEqual({
                id: 10,
                title: 'New video',
                author: 'Ignat',
                canBeDownloaded: true,
                age: 15,
                createdAt: "2024-02-04T14:33:25.854Z",
                publicationDate: "2024-02-04T14:33:25.854Z",
                availableResolutions: [
                    "P144"
                ]
            })
    })
    it('should delete video', async () => {
        request(app)
            .delete('/videos/0')
            .expect(204)
    })
    it('shouldn`t delete video', async () => {
        request(app)
            .delete('/videos/-1')
            .expect(404)
    })
})
