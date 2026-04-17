import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ tracked: false, message: 'Not implemented' });
}