import WiredDotCom from "@scrapers/WiredDotCom";
import TechCrunch from "@scrapers/TechCrunch";
import {Router} from 'express';
import TheVerge from "@scrapers/TheVerge";

const router = Router();
router.get('/tech-crunch', async (req, res) => res.json(await TechCrunch()));
router.get('/wired', async (req, res) => res.json(await WiredDotCom()));
router.get('/the-verge', async (req, res) => res.send(await TheVerge()));

export default router
