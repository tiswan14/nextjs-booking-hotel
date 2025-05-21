import { signIn } from "@/auth";
import { FaGoogle } from "react-icons/fa6";

export const LoginGoogleButton = ({ redirectUrl }: { redirectUrl: string }) => {
    return (
        <form
            action={async () => {
                "use server";
                await signIn("google", { redirectTo: redirectUrl });
            }}
        >
            <button
                className="flex items-center justify-center gap-2 w-full bg-blue-700 text-white font-medium py-3 px-6 text-base rounded-sm hover:bg-blue-600 cursor-pointer"
            >
                <FaGoogle className="size-6" />
                Sign In With Google
            </button>
        </form>
    );
};
