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
import { useNavigate } from "react-router-dom";

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
    }, [navigate]);

    useEffect(() => {
        (async () => await fetchUser())();
    }, [fetchUser]);

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
