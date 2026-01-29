import { NextResponse } from 'next/server';
import fs from 'fs';
import { getDataFilePath, SITE_DATA_FILENAME, safeWriteJson } from '@/lib/dataPaths';

const DATA_FILE = getDataFilePath(SITE_DATA_FILENAME);

export async function GET() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      console.warn(`Data file not found at: ${DATA_FILE}`);
      return NextResponse.json({ error: 'Data file not found' }, { status: 404 });
    }
    const fileData = fs.readFileSync(DATA_FILE, 'utf-8');
    const data = JSON.parse(fileData);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to read site data:', error);
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid data format. Expected JSON object.' }, { status: 400 });
    }

    // Ensure critical sections exist (shallow check)
    const requiredKeys = ['global', 'home', 'aboutMe', 'projectProgress', 'entrepreneurship', 'growthNotes', 'contact'];
    const missingKeys = requiredKeys.filter(key => !(key in body));
    
    if (missingKeys.length > 0) {
      console.warn('Saving data with missing keys:', missingKeys);
      // Optional: Reject if critical data is missing, or just warn. 
      // For now, we proceed but log it, as partial updates might be intended in some designs (though this store usually saves whole state).
    }

    // Create backup before writing (simple robustness)
    if (fs.existsSync(DATA_FILE)) {
      try {
        const backupPath = `${DATA_FILE}.bak`;
        fs.copyFileSync(DATA_FILE, backupPath);
      } catch (backupError) {
        console.error('Failed to create backup:', backupError);
        // Continue even if backup fails? Yes, to not block saving.
      }
    }
    
    await safeWriteJson(DATA_FILE, body);
    
    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    console.error('Failed to save site data:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
