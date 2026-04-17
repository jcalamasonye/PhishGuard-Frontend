import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ quiz: null, message: 'Not implemented' });
}