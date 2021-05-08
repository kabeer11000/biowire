import {Router} from 'express';
import scraperRoutes from "./Scraper";

// Export the base-router
const router = Router();

router.use('/scrape', scraperRoutes);

export default router;
