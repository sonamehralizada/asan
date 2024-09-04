import express from 'express';
import cors from 'cors';
import userRouter from './routers/userRouter.js';



const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cors());

// Define routes after cors middleware
app.use('/users', userRouter);


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  
});

