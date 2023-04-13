import User from "../models/M_user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { signinSchema,signupSchema } from "../schemas/auth";
// import dotenv from "dotenv";




export const signup = async (req, res) => {
    try {
        const {email, password, name, role} = req.body;
        const { error } = signupSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
              message: errors,
            });
          }
        const existUser = await User.findOne({email}).exec();
        if(existUser) return res.status(400).json({message: "Email đã tồn tại trong hệ thống"});


        const hashedPassword = await bcrypt.hash(password, 10);
        // Tạo user mới với password đã được mã hoá
        const user = await User.create({
            name,
            email,
            role,
            password: hashedPassword,
          });        
        user.password = undefined;
        return  res.status(200).json({  
            message: "User created successfully",
            user,
        })

    } catch (error) {
        res.status(400).json({
            message: "Đăng ký không thành công",error
        })
    }
}
export const signin = async (req, res) => {
    try {

        const {email, password} = req.body;


        const user = await User.findOne({email}).exec();
        if(!user){
            // Check exist email
            res.status(400).json(
                {message: "Người dùng không tồn tại"}
            );            
        }
        const isMatch = await bcrypt.compare(req.body.password  , user.password);
        if (!isMatch) {
          return res.status(400).json({
            message: "Không đúng mật khẩu",
          });
        }

        const token = jwt.sign({_id:user._id}, "svfpl", {expiresIn: "1h"});
            user.password = undefined;

        return res.json({
            token,
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        })    
    } catch (error) {
        res.status(400).json({
            message: "Đăng nhập không thành công"
        })
    }
}