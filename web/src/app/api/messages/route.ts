import { NextResponse } from 'next/server';
import fs from 'fs';
import { getDataFilePath, MESSAGES_FILENAME, safeWriteJson } from '@/lib/dataPaths';
import { contactFormSchema } from '@/lib/validation';
import { apiSuccess, apiError, apiNotFound, apiValidationError } from '@/lib/api';
import { Message } from '@/types';

const MESSAGES_FILE = getDataFilePath(MESSAGES_FILENAME);

export async function GET() {
  try {
    if (!fs.existsSync(MESSAGES_FILE)) {
      return apiSuccess([]);
    }
    const fileData = fs.readFileSync(MESSAGES_FILE, 'utf-8');
    const messages: Message[] = JSON.parse(fileData);
    return apiSuccess(messages);
  } catch (error) {
    console.error('Failed to read messages:', error);
    return apiError('Failed to read messages');
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const validation = contactFormSchema.safeParse(body);
    if (!validation.success) {
      return apiValidationError(validation.error.errors);
    }

    let messages: Message[] = [];
    if (fs.existsSync(MESSAGES_FILE)) {
      const fileData = fs.readFileSync(MESSAGES_FILE, 'utf-8');
      messages = JSON.parse(fileData);
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      ...validation.data,
      createdAt: new Date().toISOString(),
      isRead: false,
    };

    messages.unshift(newMessage);
    await safeWriteJson(MESSAGES_FILE, messages);

    return apiSuccess(newMessage, 'Message sent successfully');
  } catch (error) {
    console.error('Failed to save message:', error);
    return apiError('Failed to save message');
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;
    
    if (!id) {
      return apiError('Message ID is required', 400);
    }
    
    if (!fs.existsSync(MESSAGES_FILE)) {
      return apiNotFound('Messages file not found');
    }

    const fileData = fs.readFileSync(MESSAGES_FILE, 'utf-8');
    let messages: Message[] = JSON.parse(fileData);

    messages = messages.filter((msg) => msg.id !== id);
    await safeWriteJson(MESSAGES_FILE, messages);

    return apiSuccess({ id }, 'Message deleted successfully');
  } catch (error) {
    console.error('Failed to delete message:', error);
    return apiError('Failed to delete message');
  }
}
