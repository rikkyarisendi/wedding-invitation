import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory store - replace with your DB (Prisma/Supabase/MongoDB)
// For production: use lib/db.ts with Prisma
const rsvps: any[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, attendance, guests, session, message } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    const rsvp = {
      id:         crypto.randomUUID(),
      name:       name.trim(),
      phone:      phone.trim(),
      attendance,
      guests:     Number(guests) || 1,
      session,
      message:    message?.trim() || '',
      createdAt:  new Date().toISOString(),
    };

    rsvps.push(rsvp);

    // TODO: Replace with real DB:
    // await prisma.rsvp.create({ data: rsvp });
    // OR: await supabase.from('rsvps').insert(rsvp);

    return NextResponse.json({ success: true, rsvp }, { status: 201 });
  } catch (err) {
    console.error('RSVP error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  // TODO: Replace with real DB query
  return NextResponse.json({ rsvps, total: rsvps.length });
}
