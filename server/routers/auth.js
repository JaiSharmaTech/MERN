import { Router } from "express";
import USER from "../models/User.js";

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
    user.save().then(() => res.status(201).json({ msg: "You were registerred successfully" }))
        .catch(err => {
            console.log(err);
            res.status(500).json({ success: false, err });
        })
})
/* Logging the User In */
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(422).json({error:"Please enter out all the fields"})
    }
    USER.find({email})
    .then(user=>{
        if(user.length==1 && user[0].password == password){
            return res.status(201).json({msg:"You were logged in successfully"})
        }
        res.status(400).json({error:"Please enter valid credentials"})
    })
})
export default router;