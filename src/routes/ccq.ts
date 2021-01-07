import { Router } from  "express";
import { onMailDev, onMail } from "../controllers/ccq";

const router = Router();

router.post("/mail-dev", onMailDev).post("/mail", onMail);

export default router;