import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = await MongoClient.connect("mongodb+srv://admin-aamir:speed123@cluster0.qntvk.mongodb.net/usersDB?retryWrites=true&w=majority");

  return client;
}