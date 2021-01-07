import fs from "fs";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import dotenv from "dotenv";
import ccqRouter from "./routes/ccq";

let result = dotenv.config();

if(result.error) {
    console.log(result.error);
}

const app = express();

const PORT = process.env.PORT || 3000;

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    { flags: "a" }
  );

app.use(helmet()); // Security Headers
app.use(compression()); // Performance Impovement
app.use(morgan("combined", { stream: accessLogStream })); //Logging
app.use(cors());
app.use(bodyParser.json());

app.use('/ccq', ccqRouter);

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});