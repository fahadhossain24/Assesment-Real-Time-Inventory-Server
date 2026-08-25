import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

dotenv.config({
  path: path.join(process.cwd(), '.env'),
});

const envSchema = z.object({
  NODE_ENV: z.enum(['production', 'development', 'test']).default('development'),
  PORT: z.preprocess((val) => Number(val), z.number().default(5003)),
  SERVER_NAME: z.string().min(1, 'Server name is required'),
  DATABASE_URL: z.string().min(1, 'Database connection URL is required'),
});

const envVars = envSchema.parse(process.env);

export default {
  node_env: envVars.NODE_ENV,
  server_port: envVars.PORT,
  server_name: envVars.SERVER_NAME,
  database_url: envVars.DATABASE_URL,
};
