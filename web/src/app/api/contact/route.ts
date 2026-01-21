import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const MESSAGES_FILE = path.join(process.cwd(), 'src', 'data', 'messages.json');

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
    
    // Ensure directory exists
    const dir = path.dirname(MESSAGES_FILE);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));

    return NextResponse.json({ 
        success: true, 
        message: 'Message saved successfully',
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
