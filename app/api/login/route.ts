import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username ಮತ್ತು password ಬೇಕು" },
        { status: 400 }
      );
    }

    const [rows] = await pool.query<any[]>(
      "SELECT * FROM users WHERE username=? AND password=?",
      [username, password]
    );

    if (rows.length > 0) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false });
    }

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
