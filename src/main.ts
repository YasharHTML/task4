import * as dotenv from "dotenv";
dotenv.config();

const HOST = process.env.HOST ?? "0.0.0.0";
const PORT = +(process.env.PORT ?? "3000");

import express from "express";
import { router } from "./router";

const app = express();

app.use(express.json());
app.use((req, res, next) => {
    console.log(
        `${req.method} ${req.url} query:`, req.query, "body:", req.body
    );
    next();
});

app.use("/api/newsposts", router);

app.listen(PORT, HOST, () => {
    console.log("Listening: " + HOST + ":" + PORT);
});
