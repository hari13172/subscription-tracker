import { config } from "dotenv";

config({path: `.env.${process.env.NODE_ENV || "development"}.local`});


export const { PORT, NODE_ENV, SERVER_URL ,DB_URI , jwt_secret, jwt_expires_in,  ARCJET_ENV, ARCJET_KEY, QSTASH_URL, QSTASH_TOKEN  } = process.env;