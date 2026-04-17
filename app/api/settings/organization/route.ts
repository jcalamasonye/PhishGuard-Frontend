import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ organization: null, message: 'Not implemented' });
}

export async function POST() {
  return NextResponse.json({ message: 'Update organization not implemented' });
}