import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ overview: null, message: 'Not implemented' });
}