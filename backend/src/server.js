import exprees from 'express';
import cors from 'cors';
import foodRouter from './routers/food.router.js'
const app = exprees();

app.use(
    cors({
        credentials:true,
        origin: ['http://localhost:3000'],
    })
);

app.use('/api/foods', foodRouter);

const PORT = 5000;
app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
});