import { NextRequest, NextResponse } from 'next/server';

// Simple token store - replace with DB
const validTokens = new Map<string, { name: string; guests: number; checkedIn: boolean }>();

// For demo: pre-populate with some test tokens
// In production: generate tokens when RSVP is confirmed
validTokens.set('TEST-TOKEN-001', { name: 'Test Guest', guests: 2, checkedIn: false });

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.json({ valid: false, error: 'Token required' }, { status: 400 });
  }

  const guest = validTokens.get(token);

  if (!guest) {
    return NextResponse.json({ valid: false, error: 'Invalid QR code' }, { status: 404 });
  }

  if (guest.checkedIn) {
    return NextResponse.json({ valid: false, error: 'Already checked in', guest }, { status: 409 });
  }

  // Mark as checked in
  guest.checkedIn = true;
  validTokens.set(token, guest);

  return NextResponse.json({ valid: true, guest });
}

// Generate QR token for a guest
export async function POST(req: NextRequest) {
  try {
    const { name, guests, rsvpId } = await req.json();
    const token = `WED-${rsvpId ?? Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    validTokens.set(token, { name, guests: guests || 1, checkedIn: false });

    return NextResponse.json({ token, qrData: `${process.env.NEXT_PUBLIC_BASE_URL}/checkin?token=${token}` });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
