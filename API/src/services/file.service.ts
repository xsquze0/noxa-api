import { promises as fs } from 'fs';
import path from 'path';
import config from '../config';
import logger from '../utils/logger';

class FileService {
  private validFiles = [
    'serverLoad', 'sharedFile', 'sharedFileJS', 'serverFileJS', 'indexHTML', 
    'clientMain', 'serverAuth', 'serverExports', 'fxmanifest',
    'auth.lua', 'client.lua', 'server.lua', 'exports.lua', 'include.lua', 
    'waveshield.js', 'ui.html', 'ui.js', 'server.js'
  ];

  async getFile(fileName: string, useBeta: boolean = false): Promise<string | null> {
    const isAssetFile = fileName.includes('.');
    
    if (isAssetFile) {
      const assetDir = useBeta ? 'beta' : 'stable';
      const assetPath = path.resolve(__dirname, '../assets', assetDir, fileName);
      try {
        return await fs.readFile(assetPath, 'utf-8');
      } catch (err) {
        logger.error('Error reading asset file', { err, fileName, assetPath });
      }
    }

    let filePath: string;
    let fileExtension = 'lua';

    if (fileName === 'sharedFileJS' || fileName === 'serverFileJS') {
      fileExtension = 'js';
    } else if (fileName === 'indexHTML') {
      fileExtension = 'html';
    }

    const basePath = useBeta ? config.files.paths.updaterBeta : config.files.paths.updater;
    filePath = path.join(basePath, `${fileName}.${fileExtension}`);

    try {
      return await fs.readFile(filePath, 'utf-8');
    } catch (error) {
      logger.error('Error reading file', { error, fileName, filePath });
      return null;
    }
  }
}

export default new FileService();