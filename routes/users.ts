import UsersController from "../controllers/UsersController";
import express, { NextFunction } from "express";

const userRouter = express.Router();

userRouter.get("/", async (req: express.Request, res: express.Response) => {
  const users = await UsersController.getAllUsers();

  res.json(users);
});

userRouter.post(
  "/register",
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    await UsersController.registrateUser(req, res, next);
  }
);

export default userRouter;
