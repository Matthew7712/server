import { users } from "@prisma/client";
import bcrypt from "bcrypt";
import client from "../db/prisma";
import TokenService from "./TokenService";
import UserDto from "../dto/UserDto";

class UsersService {
  async registerUser(password: string, email: string) {
    if (await client.users.findFirst({ where: { email: email } }))
      throw new Error("System has user with this email");

    const hashPassword: string = await bcrypt.hashSync(password, 3);
    const user: users = await client.users.create({
      data: {
        password: hashPassword,
        email: email,
      },
    });
    const userDto = new UserDto(user);
    const tokens = await TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(user.id, tokens.refreshToken);

    return { user: userDto, tokens: { ...tokens } };
  }

  async getAllUsers() {
    return await client.users.findMany();
  }
}

export default new UsersService();
