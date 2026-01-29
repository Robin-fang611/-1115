import path from 'path';
import fs from 'fs';

/**
 * Utility to handle data storage paths, especially for persistent volumes in production (e.g., Zeabur).
 * If DATA_PATH environment variable is set, it uses that as the root for data files.
 * Otherwise, it defaults to the src/data directory within the project.
 */
export function getDataFilePath(filename: string): string {
  const customPath = process.env.DATA_PATH;
  
  if (customPath) {
    // Ensure the custom directory exists
    if (!fs.existsSync(customPath)) {
      try {
        fs.mkdirSync(customPath, { recursive: true });
      } catch (err) {
        console.error(`Failed to create custom data directory at ${customPath}:`, err);
      }
    }
    return path.join(customPath, filename);
  }
  
  // Default path in development or if no custom path is provided
  return path.join(process.cwd(), 'src', 'data', filename);
}

/**
 * Robustly writes data to a JSON file.
 * Uses a temporary file and renames it to ensure atomic write (prevents corruption).
 */
export async function safeWriteJson(filePath: string, data: any): Promise<void> {
  const tempPath = `${filePath}.${Date.now()}.tmp`;
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const content = JSON.stringify(data, null, 2);
    // Use synchronous write for simplicity in this environment, 
    // but the rename makes it atomic from the perspective of other readers.
    fs.writeFileSync(tempPath, content, 'utf-8');
    fs.renameSync(tempPath, filePath);
  } catch (err) {
    if (fs.existsSync(tempPath)) {
      try { fs.unlinkSync(tempPath); } catch {}
    }
    throw err;
  }
}

export const SITE_DATA_FILENAME = 'siteData.json';
export const MESSAGES_FILENAME = 'messages.json';
