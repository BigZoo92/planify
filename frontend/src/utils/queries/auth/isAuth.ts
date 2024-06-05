import { Preferences } from "@capacitor/preferences";
import { User } from "../../../schema";
import { requestForToken } from "../../../firebaseConfig";

export const isAuth = async (): Promise<User | null> => {
    console.log(import.meta.env.VITE_SERVER_BACKEND_URL);

    try {
        const token = await Preferences.get({ key: "jwtToken" });
        if (!token.value) return null;

        // Obtenez le pushToken
        const pushToken = await requestForToken();
        console.log("pushToken", pushToken);

        const response = await fetch(
            import.meta.env.VITE_SERVER_BACKEND_URL + "/auth/isAuth",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token.value}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ pushToken }),
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
