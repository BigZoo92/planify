import {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";

interface LoadingContextProps {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

interface LoadingProviderProps {
    children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
    const [loading, setLoading] = useState(true);

    return (
        <LoadingContext.Provider
            value={{
                loading,
                setLoading,
            }}
        >
            {children}
        </LoadingContext.Provider>
    );
};
export const useLoading = () => {
    const context = useContext(LoadingContext);

    if (!context) {
        throw new Error(
            "useLoadingContext doit être utilisé à l'intérieur d'un LoadingProvider"
        );
    }

    return context;
};
