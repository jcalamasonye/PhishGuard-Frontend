import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ users: [], message: 'Not implemented' });
}

export async function POST() {
  return NextResponse.json({ message: 'Create user not implemented' });
}