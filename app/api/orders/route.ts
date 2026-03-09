import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET() {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST!,
      user: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,
      database: process.env.DB_NAME!,
      port: 3306,
    });

    const [rows] = await db.query("SELECT * FROM orders");
    return NextResponse.json(rows);

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Orders fetch error" },
      { status: 500 }
    );
  }
}
