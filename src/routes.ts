import { Router } from 'express';

import SessionController from './controllers/SessionController';
import UserController from './controllers/UserController';

import AuthMiddleware from './middlewares/AuthMiddleware';

const routes = Router();

routes.post('/register', SessionController.register);
routes.post('/login', SessionController.login);

routes.use(AuthMiddleware);

/**
 * Any route below the middleware will need authentication or
 * you can specify which routes will use the middleware passing it as a second paramater to the route
 * eg: routes.get('/me', AuthMiddleware, UserController.me)
 */

routes.get('/me', UserController.me);

export default routes;