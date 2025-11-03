import pg from "pg";
const { Pool } = pg;

// สร้าง connection ไปยัง PostgreSQL
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
});

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE,
      password TEXT
    );
  `);

    // user_id === id ในตาราง users ด้านบน
  await pool.query(`
    CREATE TABLE IF NOT EXISTS information (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      user_type TEXT CHECK (user_type IN ('personal', 'company')),
      fullname TEXT,
      address_no TEXT,
      address_moo TEXT,
      address_village TEXT,
      address_soi TEXT,
      address_road TEXT,
      subdistrict TEXT,
      district TEXT,
      province TEXT,
      postal_code TEXT,
      contact_title TEXT CHECK (contact_title IN ('mr', 'ms', 'mrs')),
      contact_firstname TEXT,
      contact_lastname TEXT,
      contact_phone TEXT,
      contact_email TEXT UNIQUE,
      ref_code TEXT
    );
  `);

  console.log("Database ready");
}

initDB();

export default pool;
