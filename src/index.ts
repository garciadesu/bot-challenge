import * as express from 'express'
import { AppDataSource } from './data-source'

import Helmet from 'helmet'
import * as cors from 'cors'
import { responseEnhancer } from 'express-response-formatter'
import * as bodyParser from 'body-parser'

import routes from './routes'

// import { User } from './entity/User'

AppDataSource.initialize().then(async () => {
  const app = express()

  /** middlewares */
  app.use(cors()) /** Enable cross-origin Requests */
  app.use(Helmet()) /** Help to secure application by setting various HTTP headers */
  app.use(bodyParser.json()) /** Parses request from json into javascript objects */
  app.use(responseEnhancer()) /** Format response */

  app.use('/', routes)

  app.listen(3000, () => {
    console.log('Server started on port 3000!')
  })

  /** Creates sample admin user */
  // const user = new User()
  // user.username = "admin"
  // user.password = "password"
  // user.role = "ADMIN"
  // user.hashPassword()

  // const userRepository = AppDataSource.getRepository(User)
  // const result = await userRepository.save(user)
  // console.log(result);
  /** end */
}).catch(error => console.log(error))
