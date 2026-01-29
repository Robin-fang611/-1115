import { NextResponse } from 'next/server';
import fs from 'fs';
import { getDataFilePath, MESSAGES_FILENAME } from '@/lib/dataPaths';

const MESSAGES_FILE = getDataFilePath(MESSAGES_FILENAME);

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
