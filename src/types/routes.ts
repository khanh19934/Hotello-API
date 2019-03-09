import * as Hapi from 'hapi';
export interface IRoutes {
  registerToServer(server: Hapi.Server): void;
}
