import express from "express";
import config from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import softwareRoute from "../routes/software";
import userRouter from "../routes/users";

config.config({ path: "./config/env/.env" });

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("HELLO");
});

app.use("/software", softwareRoute);
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is runningg on http://localhost:${PORT}`);
});
