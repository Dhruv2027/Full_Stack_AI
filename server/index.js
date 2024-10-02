import express from 'express';
import cors from 'cors';
import generate from './api.js';

const app = express();
app.use(express.json()); 

app.use(cors(
  { origin: "*" }
));
const port = 3005;

app.get('/', (req, res) => {

    res.send('Hello World!');
    }
);

app.post("/generate", async(req, res) => {
    try {
        const {queryDescription} = req.body;
        const queryResult = await generate(queryDescription);
        console.log(queryResult);
        res.json({result: queryResult});
    } catch (error) {
        console.log(error);
        res.json({queryResult: 'Great question.  I have not been trained on that.  Ask me something else.'});
    }
})

app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`);
});