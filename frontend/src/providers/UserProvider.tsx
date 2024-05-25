import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
    useCallback,
    useRef,
} from "react";
import { Event, User } from "../schema";
import { isAuth } from "../utils/queries";
import { useNavigate } from "react-router-dom";
import io, { Socket } from "socket.io-client";
import { registerPushNotifications } from "../utils/capacitor/notification";

interface UserContextProps {
    loading: boolean;
    user: User | null;
    fetchUser: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchUser = useCallback(async () => {
        const newUser = await isAuth();

        if (!newUser) {
            // navigate("/");
            setLoading(false);
        } else {
            setUser(newUser);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        (async () => await fetchUser())();
    }, [fetchUser]);

    useEffect(() => {
        if (!user) return;
        const ws: Socket = io("http://localhost:8000");
        ws.emit("register", user.id);
        registerPushNotifications(user.id);
        ws.on("event-updated", (updatedEvent: Event) => {
            alert(`Event updated: ${updatedEvent.summary}`);
        });

        return () => {
            ws.off("event-updated");
        };
    }, [user]);

    return (
        <UserContext.Provider
            value={{
                loading,
                user,
                fetchUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
export const useUser = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error(
            "useUserContext doit être utilisé à l'intérieur d'un UserProvider"
        );
    }

    return context;
};
