import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'siteData.json');

export async function GET() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return NextResponse.json({ error: 'Data file not found' }, { status: 404 });
    }
    const fileData = fs.readFileSync(DATA_FILE, 'utf-8');
    const data = JSON.parse(fileData);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic validation could go here
    
    fs.writeFileSync(DATA_FILE, JSON.stringify(body, null, 2));
    
    return NextResponse.json({ success: true, data: body });
  } catch {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
