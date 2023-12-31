import express from 'express'
import {register, login, getAllUsers, getSingleUser, updateUser, deleteSingleUser, forgetPassword, verifyOtp} from '../controllers/user.controller.js'
import { middlewarefunc } from '../middlewares/middlewares.js';
// import {authenticateWithToken} from "../middlewares/middlewares.js"



const router= express.Router();

router.post("/user/register", register);
router.post("/user/login", login);
router.get("/user", middlewarefunc, getAllUsers);
router.get("/user/:id", getSingleUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteSingleUser);
router.post("/user-forget", forgetPassword)
router.post("/otp-veify", verifyOtp)


export default router;
