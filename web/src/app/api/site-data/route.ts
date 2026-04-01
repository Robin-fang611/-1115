import { NextResponse } from 'next/server';
import fs from 'fs';
import { getDataFilePath, SITE_DATA_FILENAME, safeWriteJson } from '@/lib/dataPaths';
import { siteDataSchema } from '@/lib/validation';
import { apiSuccess, apiError, apiNotFound, apiBadRequest, apiValidationError } from '@/lib/api';
import { SiteData } from '@/types';

const DATA_FILE = getDataFilePath(SITE_DATA_FILENAME);

export async function GET() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      console.warn(`Data file not found at: ${DATA_FILE}`);
      return apiNotFound('Data file not found');
    }
    const fileData = fs.readFileSync(DATA_FILE, 'utf-8');
    const data: SiteData = JSON.parse(fileData);
    return apiSuccess(data);
  } catch (error) {
    console.error('Failed to read site data:', error);
    return apiError('Failed to read data');
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const validation = siteDataSchema.safeParse(body);
    if (!validation.success) {
      return apiValidationError(validation.error.errors);
    }

    if (fs.existsSync(DATA_FILE)) {
      try {
        const backupPath = `${DATA_FILE}.bak`;
        fs.copyFileSync(DATA_FILE, backupPath);
      } catch (backupError) {
        console.error('Failed to create backup:', backupError);
      }
    }
    
    await safeWriteJson(DATA_FILE, validation.data);
    
    return apiSuccess(validation.data, 'Data saved successfully');
  } catch (error) {
    console.error('Failed to save site data:', error);
    return apiError('Failed to save data');
  }
}
