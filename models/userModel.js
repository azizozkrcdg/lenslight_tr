import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "username alanı doldurulması zorunlu bir alandır!"],
            lowercase: true,
            validate: [validator.isAlphanumeric, "username sadece harf ve rakamlardan oluşmalıdır!"]
        },
        email: {
            type: String,
            required: [true, "email alanı doldurulması zorunlu bir alandır!"],
            unique: true,
            validate: [validator.isEmail, "Lütfen geçerli bir email girin!"]
        },
        password: {
            type: String,
            required: [true, "password alanı doldurulması zorunlu bir alandır!"],
            minlength: [6, "password en az 6 karakterden oluşmalıdır!"]
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        user.password = hash;
        next();
    });
});

const User = mongoose.model("User", userSchema);

export default User;