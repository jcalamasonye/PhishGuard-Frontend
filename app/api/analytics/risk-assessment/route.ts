import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ riskAssessment: null, message: 'Not implemented' });
}