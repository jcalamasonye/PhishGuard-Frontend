import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ templates: [], message: 'Not implemented' });
}

export async function POST() {
  return NextResponse.json({ message: 'Create template not implemented' });
}