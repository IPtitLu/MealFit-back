
import Redis from 'ioredis';
import { promisify } from 'util';



export class CacheService {
    private client;

    constructor() {
        this.client = new Redis(process.env.CACHE_URL);
    }

    async getFromCache(key: string): Promise<string | null> {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    saveToCache(key: string, value: string) {
        this.client.set(key, value, 'EX', 60 * 60 * 7); // Cache for 7 hour
    }
}