import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ departmentAnalytics: null, message: 'Not implemented' });
}