import jwt from "jsonwebtoken";
import client from "../db/prisma";
import "dotenv/config";

const ACCESS_TOKEN =
  process.env.JWT_ACCESS_SECRET || "jwt_sSfDfsff_acCCesSTOeken";
const REFRESH_TOKEN =
  process.env.JWT_REFRESH_SECRET || "jwt_sSfDfsff_refReshSTOeken";

class TokenService {
  async generateTokens(payload: object) {
    const accessToken = jwt.sign(payload, ACCESS_TOKEN, {
      expiresIn: "30min",
    });
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN, {
      expiresIn: "30d",
    });

    return { accessToken, refreshToken };
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await client.tokens.findFirst({
      where: { userid: userId },
    });

    if (tokenData) {
      tokenData.refreshtoken = refreshToken;
      return await client.tokens.update({
        where: { id: tokenData.id },
        data: tokenData,
      });
    }

    const token = await client.tokens.create({
      data: {
        userid: userId,
        refreshtoken: refreshToken,
      },
    });

    return token;
  }
}

export default new TokenService();
