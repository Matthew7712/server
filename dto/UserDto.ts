import { users } from "@prisma/client";

export default class UserDto {
  public email: string = "";
  public id: number;

  constructor(model: users) {
    this.email = model.email;
    this.id = model.id;
  }
}
