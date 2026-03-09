import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory store - replace with Supabase/Firebase for real-time
const wishes: any[] = [
  {
    id:        'sample-1',
    name:      'Budi Santoso',
    message:   'Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id:        'sample-2',
    name:      'Sari Dewi',
    message:   'Barakallahu lakuma wa baraka alaykuma. Semoga langgeng hingga kakek nenek ya! 💕',
    createdAt: new Date(Date.now() - 43200000).toISOString(),
  },
];

export async function GET() {
  // TODO: Replace with Supabase real-time subscription
  // const { data } = await supabase.from('wishes').select('*').order('created_at', { ascending: false });
  return NextResponse.json({ wishes: wishes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, message } = body;

    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message required' }, { status: 400 });
    }

    const wish = {
      id:        crypto.randomUUID(),
      name:      name.trim(),
      message:   message.trim(),
      createdAt: new Date().toISOString(),
    };

    wishes.push(wish);

    // TODO: Replace with real DB:
    // await supabase.from('wishes').insert(wish);

    return NextResponse.json({ success: true, wish }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
