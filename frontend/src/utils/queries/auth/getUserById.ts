import { User } from "../../../schema";

export const getUserById = async (id: number) => {
    try {
        const response = await fetch(
            import.meta.env.VITE_SERVER_BACKEND_URL + "/auth/get",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(id),
                credentials: "include",
            }
        );

        if (!response.ok) {
            throw new Error("Signup failed");
        }

        const data: { user: User } = await response.json();
        return data.user;
    } catch (error) {
        console.error("Signup failed:", error);
        throw error;
    }
};
