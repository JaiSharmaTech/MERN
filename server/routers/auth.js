import { Router } from "express";

const router = Router();
router.get("/", (req, res) => {
    res.send("Router route")
})
router.post("/register", (req, res) => {
    console.log(req.body);
    res.json({ message: req.body })
})
export default router;