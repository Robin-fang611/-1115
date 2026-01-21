import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const MESSAGES_FILE = path.join(process.cwd(), 'src', 'data', 'messages.json');

export async function GET() {
  try {
    if (!fs.existsSync(MESSAGES_FILE)) {
      return NextResponse.json([]);
    }
    const data = fs.readFileSync(MESSAGES_FILE, 'utf-8');
    const messages = JSON.parse(data);
    // Sort by date desc
    messages.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return NextResponse.json(messages);
  } catch {
    return NextResponse.json({ error: 'Failed to read messages' }, { status: 500 });
  }
}
