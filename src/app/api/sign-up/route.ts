import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { username, email, password } = await request.json();

        const existingUserByVerifiedUsername = await UserModel.findOne({
            username,
            isVerified: true,
        });

        if (existingUserByVerifiedUsername) {
            return Response.json(
                { success: false, message: `username already exist. Choose different username` },
                { status: 400 }
            );
        }

        const existingUserByEmail = await UserModel.findOne({ email });
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json(
                    { success: false, message: `User already exist` },
                    { status: 400 }
                )
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await existingUserByEmail.save();
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const verifyCodeExpiryTime = new Date();
            verifyCodeExpiryTime.setHours(verifyCodeExpiryTime.getHours() + 1);

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: verifyCodeExpiryTime,
                isVerified: false,
                isAcceptingMessage: true,
                messages: [],
            });

            await newUser.save();
        }

        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        );

        if (!emailResponse.success) {
            return Response.json(
                { success: false, message: emailResponse.message },
                { status: 400 }
            );
        }

        return Response.json(
            {
                success: true,
                message: "User registered successfully. Please verify your email.",
            },
            {
                status: 201
            }
        )
    } catch (error) {
        console.error(`User Registration error : ${error}`);
        return Response.json(
            {
                success: false,
                message: `User registration error : ${error}`,
            },
            {
                status: 400,
            }
        );
    }
}
