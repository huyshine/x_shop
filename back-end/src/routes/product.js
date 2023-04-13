import {read,create,list,remove,update } from '../controllers/product';
import { Router } from 'express';
import { isAdmin, isAuth, requireSignin } from "../middlerwares/checkAuth";



const router = Router();

router.get("/products", list);
router.get("/products/:id", read);
router.post("/products/:userId",  create);
router.put("/products/:id/:userId",  update);
router.delete("/products/:id/:userId",  remove);

// router.param("userId", userById);
export default router;