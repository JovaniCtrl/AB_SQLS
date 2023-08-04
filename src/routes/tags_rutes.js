import { Router } from "express";
import {getTags}from '../controllers/tags_ctrl.js'

const router = Router()

router.get('/var',getTags )

export default router
