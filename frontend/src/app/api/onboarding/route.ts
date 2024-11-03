import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const ctx = await request.json()
  const response = await fetch(`${process.env.API_URL}/api/aiResponse`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'max-age=3600',
    },
    body: JSON.stringify({ message: JSON.stringify(ctx) }),
  })
  if(response.status !== 200) { 
    return NextResponse.json({ data: { message: 'Error' }}, { status: 500 });
  }
  const data = await response.json();
  return NextResponse.json({ data: data, status: 200 });
}


export async function GET() {
  const data = await fetch("https://data.cityofnewyork.us/resource/8nqg-ia7v.json")
  if(data.status !== 200) { 
    return NextResponse.json({ data: { message: 'Error' }}, { status: 500 });
  }
  const response = await data.json();
  return NextResponse.json({ data: response, status: 200 });
}