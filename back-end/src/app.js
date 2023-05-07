import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import morgan from 'morgan';
import connect from './config/db/index';


import productRoutes from "./routes/product";
import categoryRoutes from "./routes/category";
import authRoters from "./routes/auth";

dotenv.config();
const app = express();

// middlerwares
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
// routes
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", authRoters);
// Connect db
connect();


const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Server is running on port: http://localhost:${PORT}`)
);





