import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ template: null, message: 'Not implemented' });
}