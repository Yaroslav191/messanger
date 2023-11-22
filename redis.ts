import Redis from 'ioredis'

const redis = new Redis("redis://default:65e75ac4b901401897c75b280c808a2f@eu2-evolving-leopard-31728.upstash.io:31728");

export default redis