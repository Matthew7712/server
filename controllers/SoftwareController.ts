import SoftwareService from "../services/SoftwareService";
import express from "express";

class SoftwareController {
    async getAllSoftware(req: express.Request, res: express.Response) {
        return await SoftwareService.getAllSoftware();
    }
}

export default new SoftwareController();
