import { getAuth } from "@/lib/firebase/adminApp";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const sessionCookie = cookies().get("__session")?.value;
  
  if (!sessionCookie) {
    return NextResponse.json({ status: 'success', message: 'No session to clear.' });
  }

  cookies().delete("__session");

  try {
    const decodedClaims = await getAuth().verifySessionCookie(sessionCookie);
    await getAuth().revokeRefreshTokens(decodedClaims.sub);
  } catch (error) {
    console.error("Session logout error:", error);
    // Even if token revocation fails, the cookie is cleared, so we can consider it a success on the client side.
  }

  return NextResponse.json({ status: "success" });
}
