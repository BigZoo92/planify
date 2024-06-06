import { Preferences } from "@capacitor/preferences";
import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

type LoginFormData = z.infer<typeof LoginSchema>;

export const login = async (formData: LoginFormData): Promise<void> => {
    try {
        LoginSchema.parse(formData);

        const response = await fetch(
            `${import.meta.env.VITE_SERVER_BACKEND_URL}/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Login failed:", errorData);
            throw new Error("Login failed");
        }

        const responseData = await response.json();
        console.log(responseData);

        await Preferences.set({
            key: "jwtToken",
            value: responseData.tokenUser,
        });
    } catch (error) {
        console.error("An error occurred during login:", error);
        throw error;
    }
};
