import { Router, Request, Response } from 'express';
import { handleLicenseAuth, handleGetConfig, handleGetLatestVersion, handleUpdateFile } from '../controllers/api-license.controller';
import { validateUserAgent, getClientIp } from '../middleware/auth.middleware';

const router = Router();

router.post('/:licenseKey/auth', [validateUserAgent, getClientIp], handleLicenseAuth);
router.get('/:licenseKey/config', [validateUserAgent, getClientIp], handleGetConfig);
router.get('/:licenseKey/latestVersion', [validateUserAgent, getClientIp], handleGetLatestVersion);
router.get('/:licenseKey/update', [validateUserAgent, getClientIp], handleUpdateFile);
router.post('/:licenseKey/retard', [validateUserAgent, getClientIp], (req: Request, res: Response) => { res.status(200).json({ success: true }); });

export default router;