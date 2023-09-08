import { HttpException } from '@nestjs/common';
import { Request } from 'express';



export const sendResetPasswordEmail = async (resetToken: string, email: string, req: Request) => {
    const resetPasswordUrl: string = `${req.protocol}://${req.get("host")}/api/v1/user/password/reset/${resetToken}`;
    const message: string = `Your password reset link is \n\n  click to reset password \n ${resetPasswordUrl} \n\n If you have not requested this email then please igore it.`;

    // const mailResponse: boolean = await sendEmail(email, "Forgot password request | INtrinsic Science Labs", message);

    //WRITE LOGIC TO PUSH EMAIL INTO RABBITMQ QUEUQ HERE


    return { success: true, message: `Check your Inbox We've sent an Reset Password Email to Mail Id ${email}` }
}