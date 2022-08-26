import { Request, Response, Router } from "express";

import { createUserController } from "../modules/users/useCases/createUser";
import { listAllUsersController } from "../modules/users/useCases/listAllUsers";
import { showUserProfileController } from "../modules/users/useCases/showUserProfile";
import { turnUserAdminController } from "../modules/users/useCases/turnUserAdmin";

const usersRoutes = Router();

usersRoutes.post("/", (request: Request, response: Response) =>
  createUserController.handle(request, response)
);

usersRoutes.patch("/:user_id/admin", (request: Request, response: Response) =>
  turnUserAdminController.handle(request, response)
);

usersRoutes.get("/:user_id", (request: Request, response: Response) =>
  showUserProfileController.handle(request, response)
);

usersRoutes.get("/", (request: Request, response: Response) =>
  listAllUsersController.handle(request, response)
);

export { usersRoutes };
