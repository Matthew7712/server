import client from "../db/prisma";

class SoftwareServices {
  async getAllSoftware() {
    return await client.software.findMany();
  }
}

export default new SoftwareServices();
