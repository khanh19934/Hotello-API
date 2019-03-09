import { Connection } from 'typeorm';
import UserController from './api/users/UserController';
import UserRoutes from './api/users/UserRoutes';
import Users from './entities/Users';
import UserServices from './services/UserServices';

export default (connection: Connection) => {
  const userRepositories = connection.getRepository(Users);
  const userSrv = new UserServices(userRepositories);
  const userCtrl = new UserController(userSrv);

  return [new UserRoutes(userCtrl)];
};
