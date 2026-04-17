import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ profile: null, message: 'Not implemented' });
}

export async function POST() {
  return NextResponse.json({ message: 'Update profile not implemented' });
}