import redis from "@/redis"

export async function POST(req: Request, res: Response) {
    
    const  {newMessage} = await req.json()

    console.log(newMessage)

    const message = {
        ...newMessage,
        created_at: Date.now()
    }
   
    await redis.hset('messages', message.id, JSON.stringify(message))

    return Response.json({message})
 }