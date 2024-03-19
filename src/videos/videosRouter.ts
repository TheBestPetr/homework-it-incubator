import {Router} from 'express'
import {GetVideosController} from './getVideosController'
import {CreateVideoController} from './createVideoController'
import {FindVideoController} from './findVideoController'
import {DeleteVideoController} from './deleteVideoController'
import {UpdateVideoController} from "./updateVideoController";

export const videosRouter = Router()

videosRouter.get('/', GetVideosController)
videosRouter.post('/', CreateVideoController)
videosRouter.get('/:id', FindVideoController)
videosRouter.put('/:id', UpdateVideoController)
videosRouter.delete('/:id', DeleteVideoController)
