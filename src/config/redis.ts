interface IRedisConfig {
  host: string;
  port: number | undefined;
}

export default {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
} as IRedisConfig;