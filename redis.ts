import Redis from 'ioredis'

const redis = new Redis(process.env.GOOGLE_CLIENT_SECRET!);
await redis.set('foo', 'bar');

export default redis