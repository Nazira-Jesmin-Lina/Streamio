// import express from 'express';
// import cors from 'cors'

// import authRoutes from './routes/auth.route.js'
// import { ENV_VARS } from './config/envVars.js';
// import { connectDB } from './config/db.js';
// import path from "path";



// const app = express();

// app.use(cors());

// const PORT =ENV_VARS.PORT
// const __dirname=path.resolve();

// app.use(express.json());

// app.use(cors({
//     origin: 'http://localhost:5173', 
// }));

// app.use("/api/v1/auth",authRoutes)

// if (ENV_VARS.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "/frontend/dist")));

//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//     });
// }



// app.listen(PORT, ()=>{
//     console.log("Server started at http://localhost:"+PORT);
//     connectDB();
// })

// DzUa5bYnEYklUebw


import express from 'express';
import path from 'path';
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.route.js'
import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.json());
const PORT =ENV_VARS.PORT
const __dirname=path.resolve();

app.use("/api/v1/auth",authRoutes)
app.use(cors({
    origin: 'http://localhost:5173', 
}));


// Serve static files from React app
app.use(express.static(path.join(__dirname, '/frontend/dist')));

// Fallback to serve React app for any unknown routes
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    connectDB();
});

