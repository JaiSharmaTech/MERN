import { Router } from "express";
import USER from "../models/User.js";
import bcrypt from "bcryptjs";
const router = Router();
/* Register the user */
router.post("/register", (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Please fill out all fields" });
    } else if (password !== cpassword) {
        return res.status(422).json({ error: "Passwords don't match" });
    }
    USER.findOne({ email: email })
        .then(userExists => {
            if (userExists) return res.status(422).json({ error: "Email already exists" })
        })
    const user = new USER({ name, email, phone, work, password });
    user.save().then(async () => {
        const token = await user.generateAuthToken();
        res.status(201).json({ msg: "You were registerred successfully" })
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({ success: false, err });
        })
})
/* Logging the User In */
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Please enter out all the fields" })
    }
    const user = await USER.findOne({ email })
    const isPasswordValid = user ? await bcrypt.compare(password, user.password) : false;
    if (isPasswordValid) {
        const token = await user.generateAuthToken();
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 2629800000),
            httpOnly: true,
        })
        return res.status(201).json({ msg: "You were logged in successfully" })
    }

    res.status(400).json({ error: "Please enter valid credentials" })

})
export default router;