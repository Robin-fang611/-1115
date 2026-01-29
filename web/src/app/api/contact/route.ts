import { NextResponse } from 'next/server';
import fs from 'fs';
import { getDataFilePath, MESSAGES_FILENAME, safeWriteJson } from '@/lib/dataPaths';

const MESSAGES_FILE = getDataFilePath(MESSAGES_FILENAME);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, type, contact, content } = body;

    if (!name || !contact || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newMessage = {
      id: crypto.randomUUID(),
      name,
      type,
      contact,
      content,
      createdAt: new Date().toISOString(),
    };

    // 1. Save to messages.json
    let messages = [];
    try {
      if (fs.existsSync(MESSAGES_FILE)) {
        const fileData = fs.readFileSync(MESSAGES_FILE, 'utf-8');
        messages = JSON.parse(fileData);
      }
    } catch {
      // File might not exist or be empty, ignore
    }

    // Ensure messages is an array
    if (!Array.isArray(messages)) {
        messages = [];
    }

    messages.push(newMessage);
    
    await safeWriteJson(MESSAGES_FILE, messages);

    return NextResponse.json({ 
        success: true, 
        message: 'Message saved successfully',
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
