import { resend } from "@/lib/resend";
import VerificationEmailTemplate from "../../emails/VerificationEmailTemplate";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const { data } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "The Insight Box | Email Verification Code",
      react: VerificationEmailTemplate({ username, otp: verifyCode }),
    });

    console.log("Email sent successfully", data?.id);
    return {
      success: true,
      message: "Verification email sent successfully",
    };
  } catch (error) {
    console.error(`Error sending verification email: ${error}`);

    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}
