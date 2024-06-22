import { resend } from "@/lib/resend";
import VerificationEmail from "@/emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
export const sendVerificationEmail = async (
    { email, verifyCode }: { email: string, verifyCode: string }
): Promise<ApiResponse> => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Please verify your email address',
            react: <VerificationEmail email={email} otp={verifyCode} />
        });
        if (error) {
            console.error(error);
            return {
                success: false,
                message: "Failed to send verification email. Please try again later."
            };
        }
        return {
            success: true,
            message: "Verification email sent successfully."
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to send verification email. Please try again later."
        };
    }
};