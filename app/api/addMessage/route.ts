import { databases } from "@/appwrite";
import { serverPusher } from "@/pusher";

export async function POST(req: Request, res: Response) {
  const { newMessage } = await req.json();

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

  serverPusher.trigger("messages", "new-message", message);

  return Response.json({ message });
}
