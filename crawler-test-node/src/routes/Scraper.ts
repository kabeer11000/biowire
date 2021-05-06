import WiredDotCom from "../scrapers/WiredDotCom";
import {Router} from 'express';

const router = Router();
router.get('/', WiredDotCom);

export default router
