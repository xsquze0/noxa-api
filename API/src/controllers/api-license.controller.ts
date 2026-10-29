import { Request, Response } from 'express';
import licenseService from '../services/license.service';
import fileService from '../services/file.service';
import versionService from '../services/version.service';
import tokenService from '../services/token.service';
import logger from '../utils/logger';

export const handleLicenseAuth = async (req: Request, res: Response) => {
  try {
    const licenseKey = (req.params.licenseKey || req.query.license as string || '').trim();
    const clientIp = req.clientIp || req.ip || '';
    const { serverName, bannerUrl, version, beta } = req.body || {};
    const useBeta = beta === true || req.query.beta !== undefined;

    if (!licenseKey) {
      return res.status(909).json({ error: 'License key is missing or invalid', code: 909 });
    }

    // Validate license against database
    const validation = await licenseService.validateLicense(licenseKey, clientIp);
    if (!validation.valid) {
      return res.status(validation.code).json({ error: validation.message, code: validation.code });
    }

    // Check blacklist
    const isBlacklisted = await licenseService.isIpBlacklisted(clientIp);
    if (isBlacklisted) {
      return res.status(912).json({ error: 'License or IP is blacklisted', code: 912 });
    }

    // Auto-update server IP if empty
    if (!validation.license.serverIp || validation.license.serverIp === '') {
      await licenseService.updateServerIp(licenseKey, clientIp);
    }

    // Update serverName if provided
    if (serverName && serverName !== '' && serverName !== validation.license.serverName) {
      await licenseService.updateServerName(licenseKey, serverName);
    }

    // Update bannerUrl if provided
    if (bannerUrl && bannerUrl !== '' && bannerUrl !== validation.license.bannerUrl) {
      await licenseService.updateServerBanner(licenseKey, bannerUrl);
    }

    // Load server.lua content
    const loadContent = await fileService.getFile('server.lua', useBeta);
    if (!loadContent) {
      return res.status(404).json({ error: 'Failed to retrieve load content', code: 404 });
    }

    // Get latest version
    const latestVersion = await versionService.getVersion();

    // Generate token expected by FiveM NetApi
    const reqVersion = version || latestVersion || '1.0.0';
    const authToken = tokenService.generateToken(licenseKey, reqVersion, latestVersion);
    res.setHeader('x-ws-token', authToken);

    // Get configuration
    let configuration = await licenseService.getServerConfiguration(licenseKey, clientIp);
    if (!configuration || Object.keys(configuration).length === 0) {
      configuration = require('../defaultConfig.json');
    }

    return res.status(200).json({
      success: true,
      configuration: configuration,
      latestVersion: latestVersion,
      load: loadContent,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Error handling license auth', { error });
    return res.status(500).json({ error: 'Internal server error', code: 500 });
  }
};

export const handleGetConfig = async (req: Request, res: Response) => {
  try {
    const licenseKey = (req.params.licenseKey || req.query.license as string || '').trim();
    const clientIp = req.clientIp || req.ip || '';

    let configuration = await licenseService.getServerConfiguration(licenseKey, clientIp);
    if (!configuration || Object.keys(configuration).length === 0) {
      configuration = require('../defaultConfig.json');
    }

    return res.status(200).json({
      success: true,
      configuration: configuration,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return res.status(400).json({ error: 'Invalid request' });
  }
};

export const handleGetLatestVersion = async (req: Request, res: Response) => {
  try {
    const latestVersion = await versionService.getVersion();
    return res.status(200).json({
      success: true,
      latestVersion: latestVersion,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return res.status(400).json({ error: 'Invalid request' });
  }
};

export const handleUpdateFile = async (req: Request, res: Response) => {
  try {
    const fileName = req.query.fileName as string;
    const beta = req.query.beta === 'true' || req.query.beta === true;

    if (!fileName) {
      return res.status(400).json({ error: 'Missing fileName' });
    }

    const fileContent = await fileService.getFile(fileName, beta);
    if (!fileContent) {
      return res.status(404).json({ error: 'File not found' });
    }

    return res.status(200).json({
      success: true,
      file: fileContent,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return res.status(400).json({ error: 'Invalid request' });
  }
};