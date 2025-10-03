import { NextFunction, Request, Response } from "express";
import UsersService from "../services/UsersService";

class UsersController {
  async registrateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const userData = await UsersService.registerUser(password, email);
      res.cookie("refresh_token", userData.tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  }

  async getAllUsers() {
    return await UsersService.getAllUsers();
  }
}

export default new UsersController();
