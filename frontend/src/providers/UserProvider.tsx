import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
    useCallback,
} from "react";
import { User } from "../schema";
import { isAuth } from "../utils/queries";
import { useLocation, useNavigate } from "react-router-dom";
import { registerPushNotifications } from "../utils/capacitor/notification";
import { useLoading } from "./LoadingProvider";

interface UserContextProps {
    user: User | null;
    fetchUser: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const { setLoading } = useLoading();
    const navigate = useNavigate();
    const location = useLocation();

    const fetchUser = useCallback(async () => {
        const newUser = await isAuth();
        if (!newUser) {
            navigate("/");
            setLoading(false);
        } else {
            const currentPath = location.pathname;
            const restrictedPaths = ["/", "/login", "/signup"];
            setUser(newUser);
            setLoading(false);
            if (restrictedPaths.includes(currentPath)) {
                navigate("/accueil");
            }
        }
    }, []);

    useEffect(() => {
        (async () => await fetchUser())();
    }, [fetchUser]);

    useEffect(() => {
        if (!user) return;
        registerPushNotifications(user.id);
    }, [user]);

    return (
        <UserContext.Provider
            value={{
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
