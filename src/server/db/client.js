const { Client } = require("pg");
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://betaromu:WIMT8jAlr1Hi@ep-tight-waterfall-61819902.us-west-2.aws.neon.tech/2309-7-db?sslmode=require";

const db = new Client({
  connectionString,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
});

module.exports = db;
