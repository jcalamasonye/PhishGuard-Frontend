import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ preview: null, message: 'Not implemented' });
}