import {fs} from 'fs';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { pull } from "langchain/hub";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

const file_path = "../data/harrypotter.pdf";
const pdf_loader = new PDFLoader();
const pdf = await pdf_loader.load(file_path);
console.log(pdf[0]);