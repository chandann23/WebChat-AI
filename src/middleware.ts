import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {


const res = NextResponse.next();
  const cookies = request.cookies.get("sessionId");
  if (!cookies) {
res.cookies.set("sessionId" ,crypto.randomUUID());
  }
}
