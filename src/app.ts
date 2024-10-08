import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { apiRoutes } from "./routes/api.routes";
import { errorHandler } from "./middleware/ErrorHandler";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(errorHandler);
app.use(fileUpload());
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiRoutes);

app.get('/', async (req: Request, res: Response) => {
  res.send({ message: "health Ok!" })
})

app.listen(PORT, () => {
  console.log(`Server-${PORT}`);
});
