import express from "express";
import config from "./config.js"
import productRoutes from './routes/tags_rutes.js'

const app = express();

app.set("port", config.port);

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(productRoutes)

export default app;
