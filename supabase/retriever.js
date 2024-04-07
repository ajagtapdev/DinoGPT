import "dotenv/config.js"
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createClient } from "@supabase/supabase-js";

const openAIApiKey = process.env.OPENAI_API_KEY

const embeddings = new OpenAIEmbeddings({openAIApiKey: openAIApiKey})
const sbApiKey = process.env.SUPABASE_API_KEY
const sbUrl = process.env.SUPABASE_URL
const client = createClient(sbUrl,sbApiKey)

const vectorStore = new SupabaseVectorStore(embeddings, {
    client,
    tableName: 'documents',
    queryName: 'match_documents'
  })

// Retrieves values from Supabase
const retriever = vectorStore.asRetriever(2)

export {retriever}