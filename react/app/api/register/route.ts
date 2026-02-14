import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function POST(request: Request) {
  try {
    const { username, password, email, phone } = await request.json();

    // validation
    if (!username || !password || !email || !phone) {
      return NextResponse.json(
        { success: false, message: "ಎಲ್ಲಾ fields ತುಂಬಬೇಕು" },
        { status: 400 }
      );
    }

    // MySQL connection
    const db = await mysql.createConnection({
      host: process.env.DB_HOST!,
      user: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,
      database: process.env.DB_NAME!,
      port: 3306,   // 👈 VERY IMPORTANT
    });

    // insert user
    await db.execute(
      "INSERT INTO users (username, password, email, phone) VALUES (?, ?, ?, ?)",
      [username, password, email, phone]
    );

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
