import {Router} from 'express';
import {addOneUser, deleteOneUser, getAllUsers, updateOneUser} from './Users';
import scraperRoutes from "./Scraper";


// User-route
const userRouter = Router();
userRouter.get('/all', getAllUsers);
userRouter.post('/add', addOneUser);
userRouter.put('/update', updateOneUser);
userRouter.delete('/delete/:id', deleteOneUser);


// Export the base-router
const baseRouter = Router();
baseRouter.use('/users', userRouter);
baseRouter.use('/scrapers', scraperRoutes)
export default baseRouter;
