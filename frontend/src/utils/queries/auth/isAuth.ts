import { Preferences } from "@capacitor/preferences";
import { User } from "../../../schema";

export const isAuth = async (): Promise<User | null> => {
    try {
        const token = await Preferences.get({ key: "jwtToken" });
        if (!token.value) return null;

        const response = await fetch(
            import.meta.env.VITE_SERVER_BACKEND_URL + "/auth/isAuth",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Auth check failed:", errorData);
            return null;
        } else {
            const responseData: User = await response.json();
            console.log(responseData);
            return responseData;
        }
    } catch (error) {
        console.error("An error occurred:", error);
        return null;
    }
};
