import express from "express";
import * as mysql from "mysql2/promise";
import bcrypt from "bcrypt";

function createConnection() {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "tickets",
    port: 33060
  });
};

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({message: "Hello World"});
});

app.post ("/auth/login", (req, res) => {
  const { email, password } =req.body;
  console.log(email, password);
  res.send();
});

app.post("/partners", async (req, res) => {
  const { name, email, password, company_name } = req.body;

  const connection = await createConnection();
  
  try{
  const createdAt = new Date();
  const hashedPassword = await bcrypt.hashSync(password, 10);
  const [userResult] = await connection.execute<mysql.ResultSetHeader>("INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, ?)",
  [name, email, hashedPassword, createdAt]);
  const userId = userResult.insertId;

const [partnerResult] = await connection.execute<mysql.ResultSetHeader>("INSERT INTO partners (user_id, company_name, created_at) VALUES (?, ?, ?)",
[userId, company_name, createdAt]);

res.status(201).json({id: partnerResult.insertId, name, user_id: userId, company_name, created_at: createdAt});
  } finally {
    await connection.end();
  }
});


app.post("/customers", async (req, res) => {
  const { name, email, password, address, phone } = req.body;
  const connection = await createConnection();
    
  try{
  const createdAt = new Date();
  const hashedPassword = await bcrypt.hashSync(password, 10);
  const [userResult] = await connection.execute<mysql.ResultSetHeader>
  ("INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, ?)",
  [name, email, hashedPassword, createdAt]);
  const userId = userResult.insertId;

const [partnerResult] = await connection.execute<mysql.ResultSetHeader>
("INSERT INTO customers (user_id, address, phone, created_at) VALUES (?, ?, ?, ?)",
[userId, address, phone, createdAt]);

res.status(201).json({id: partnerResult.insertId, name, user_id: userId, address, phone, created_at: createdAt});
  } finally {
    await connection.end();
  }
});

app.post("/partners/events", (req, res) => {
  const { name, description, date, location } = req.body;
});

app.get("/partners/events", (req, res) => {

});

app.get("/partners/events/:eventId", (req, res) => {
  const {eventId} = req.params;
  console.log (eventId);
  res.send();
});

app.get("/events", (req, res) => {

});

app.get("/events/:eventId", (req, res) => {
  const {eventId} = req.params;
  console.log (eventId);
  res.send();
});

app.listen(3000, async () => {
  const connection = await createConnection();
  await connection.execute("SET FOREIGN_KEY_CHECKS = 0");
  await connection.execute("TRUNCATE TABLE events");
  await connection.execute("TRUNCATE TABLE customers");
  await connection.execute("TRUNCATE TABLE partners");
  await connection.execute("TRUNCATE TABLE users");
  await connection.execute("SET FOREIGN_KEY_CHECKS = 1");
  console.log("Server is running on port 3000");
});