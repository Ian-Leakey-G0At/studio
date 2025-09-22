import { getAuth } from "@/lib/firebase/adminApp";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const authorization = request.headers.get("Authorization");
  if (authorization?.startsWith("Bearer ")) {
    const idToken = authorization.split("Bearer ")[1];
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    try {
      const sessionCookie = await getAuth().createSessionCookie(idToken, { expiresIn });
      const options = {
        name: "__session",
        value: sessionCookie,
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
      };

      const response = NextResponse.json({ status: "success" });
      response.cookies.set(options);
      return response;

    } catch (error) {
      console.error("Session login error:", error);
      return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
}
