import { config } from "dotenv";
config();
import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    work: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    tokens: [
        {
            token: String
        }
    ]
})
//hash the password
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 4)
    }
    next();
})
//generate a jwt token
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY || "your_secret_key");
        this.tokens = this.tokens.concat({ token });
        await this.save();
        return token;
    } catch (err) { console.log(err) }
}

export default model("user", userSchema);