import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ campaigns: [], message: 'Not implemented' });
}

export async function POST() {
  return NextResponse.json({ message: 'Create campaign not implemented' });
}