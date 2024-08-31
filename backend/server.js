import express from 'express';
import cors from 'cors'

import authRoutes from './routes/auth.route.js'
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';



const app = express();

app.use(cors());

const PORT =ENV_VARS.PORT

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173', 
}));

app.use("/api/v1/auth",authRoutes)

app.listen(PORT, ()=>{
    console.log("Server started at http://localhost:"+PORT);
    connectDB();
})

// DzUa5bYnEYklUebw