// import { TextLoader } from "langchain/document_loaders/fs/text";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { OpenAIEmbeddings } from "@langchain/openai";
// import { FaissStore } from "@langchain/community/vectorstores/faiss";
// import { OllamaEmbeddings } from "@langchain/ollama";
// // import type { Document } from "@langchain/core/documents";
// import fs from "fs";

// const loader = new TextLoader("HPmini.txt");
// const docs = await loader.load();

// const splitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 500,
//     chunkOverlap: 100
// });

// // const openaiApiKey = process.env.OPENAI_API_KEY;
// // if (!openaiApiKey) {
// //   console.error('OPENAI_API_KEY not found in environment');
// //   process.exit(1);
// // }

// const splits = await splitter.splitDocuments(docs);

// const embeddings = new OllamaEmbeddings({
//     model: "nomic-embed-text"
// });

// const directory = "./";

// if (!fs.existsSync(directory)) {
//     const vectorStore = await FaissStore.fromDocuments(splits, embeddings);
//     await vectorStore.save(directory);
// }

// const loadedVectorStore = await FaissStore.load(
//     directory,
//     embeddings
// );

// export default loadedVectorStore;

// // const result = await loadedVectorStore.similaritySearch("Harry Potter", 1);
// // console.log(result);

import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { OllamaEmbeddings } from "@langchain/ollama";
import fs from "fs";
import path from "path";

const loader = new TextLoader("HPmini.txt");
const docs = await loader.load();

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 100,
});

const splits = await splitter.splitDocuments(docs);

const embeddings = new OllamaEmbeddings({
    model: "nomic-embed-text",
});

// Directory where vector store will be saved
const directory = "./";
const docstoreFile = path.join(directory, "docstore.json");

let vectorStore;

if (!fs.existsSync(directory) || !fs.existsSync(docstoreFile)) {
    // Create the directory if it doesn't exist
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }

    // Create a new vector store if the docstore.json file does not exist
    console.log("Creating new vector store...");
    vectorStore = await FaissStore.fromDocuments(splits, embeddings);

    // Save the vector store to the directory
    await vectorStore.save(directory);
    console.log("Vector store saved successfully.");
} else {
    // Load the existing vector store if the files exist
    console.log("Loading existing vector store...");
    vectorStore = await FaissStore.load(directory, embeddings);
    console.log("Vector store loaded successfully.");
}

// Export the vector store for use in the full stack app
export default vectorStore;

// Example usage (you can use this in your app's API routes):
// const result = await vectorStore.similaritySearch("Harry Potter", 1);
// console.log(result);
