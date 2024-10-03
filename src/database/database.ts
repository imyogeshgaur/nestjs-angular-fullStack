
import { resolve } from "path"
import { config } from "dotenv"
import mongoose from "mongoose";
config({ path: resolve("./.env") })

export const databaseProviders = [
  {
    provide: 'DB_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => mongoose.connect(process.env.DB_URI as string)
  },
];  