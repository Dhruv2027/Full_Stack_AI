import dotenv from 'dotenv';
import loadedVectorStore from "./build_db.js";
import { ChatOpenAI } from "@langchain/openai";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";
import { pull } from "langchain/hub";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { Ollama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
dotenv.config();

// const openaiApiKey = process.env.OPENAI_API_KEY;
// if (!openaiApiKey) {
//   console.error('OPENAI_API_KEY not found in environment');
//   process.exit(1);
// }

const retriever = loadedVectorStore.asRetriever({ k: 3, searchType: "similarity" });

// const llm = new ChatOpenAI({ model: "gpt-3.5-turbo", temperature: 0 });
const llm = new Ollama({ model: "mistral"});

const generate = async (queryDescription) => {
    const prompt = await pull("rlm/rag-prompt");
    const retrievedDocs = await retriever.getRelevantDocuments(queryDescription);

    const ragChain = await createStuffDocumentsChain({
        llm,
        prompt,
        outputParser: new StringOutputParser(),
    });

    const result = await ragChain.invoke({
        question: queryDescription,
        context: retrievedDocs,
    });

    return result;
}

export default generate;