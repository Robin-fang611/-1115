import { NextResponse } from 'next/server';
import fs from 'fs';
import { getDataFilePath, MESSAGES_FILENAME, safeWriteJson } from '@/lib/dataPaths';

const MESSAGES_FILE = getDataFilePath(MESSAGES_FILENAME);

export async function GET() {
  try {
    if (!fs.existsSync(MESSAGES_FILE)) {
      return NextResponse.json([]);
    }
    const fileData = fs.readFileSync(MESSAGES_FILE, 'utf-8');
    const messages = JSON.parse(fileData);
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Failed to read messages:', error);
    return NextResponse.json({ error: 'Failed to read messages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    let messages = [];
    if (fs.existsSync(MESSAGES_FILE)) {
      const fileData = fs.readFileSync(MESSAGES_FILE, 'utf-8');
      messages = JSON.parse(fileData);
    }

    const newMessage = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      isRead: false,
    };

    messages.unshift(newMessage);
    await safeWriteJson(MESSAGES_FILE, messages);

    return NextResponse.json({ success: true, data: newMessage });
  } catch (error) {
    console.error('Failed to save message:', error);
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    
    if (!fs.existsSync(MESSAGES_FILE)) {
      return NextResponse.json({ error: 'Messages file not found' }, { status: 404 });
    }

    const fileData = fs.readFileSync(MESSAGES_FILE, 'utf-8');
    let messages = JSON.parse(fileData);

    messages = messages.filter((msg: any) => msg.id !== id);
    await safeWriteJson(MESSAGES_FILE, messages);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete message:', error);
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}
