import { Client, Storage } from 'node-appwrite';

const client = new Client();

if (!process.env.APPWRITE_ENDPOINT || !process.env.APPWRITE_PROJECT_ID || !process.env.APPWRITE_API_KEY) {
  throw new Error("Missing Appwrite environment configuration");
}

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY); 

const storage = new Storage(client);

export default storage ;
