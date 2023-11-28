import { databases } from "@/appwrite";

export async function POST(req: Request, res: Response) {
  const { newMessage } = await req.json();

  console.log(newMessage);

  const message = {
    ...newMessage,
    created_at: Date.now(),
  };

  const documentResponse = await databases.createDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
    message.id,
    { id: message.id, message: JSON.stringify(message) }
  );

  console.log(JSON.stringify(message));

  // await redis.hset('messages', message.id, JSON.stringify(message))

  return Response.json({ message });
}
