import { Router } from "express";
import {getTags,insertData }from '../controllers/tags_ctrl.js'

const router = Router()

router.get('/var',getTags )
router.post('/ins',insertData)

export default router
