import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { userRouter } from "./user/UserRouter";
import { loginRouter } from "./Login/LoginRouter";
import AuthMidleware from './Midlewares/AuthMidleware';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user", AuthMidleware, userRouter);
app.use("/api/login", loginRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
