import dotenv from "dotenv";
dotenv.config();

export const dbConfig = {
  uri: process.env.MONGOURL,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
