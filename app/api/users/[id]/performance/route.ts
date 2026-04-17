import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ performance: null, message: 'Not implemented' });
}