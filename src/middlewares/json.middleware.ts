import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class JSONMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['content-type'] !== 'application/json') {
      res.status(400).send('Only JSON is accepted')
      return
    }
    next()
  }
}
