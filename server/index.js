import express from "express";
import cors from "cors";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Chroma } from "@langchain/community/vectorstores/chroma";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

// const vectorStore = new Chroma({ url: "http://localhost:8000" });
// const collection = await Chroma.getCollection("harry-potter-ai");

app.get('/', (req,res) =>{
    res.send("hello");
})

app.post("/generate", async(req,res) =>{
    const {queryDescription} = req.body;
    console.log("here is the query");
    res.json({answer: "answer goes here"});
})

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});