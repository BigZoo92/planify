import {
    createContext,
    useContext,
    useReducer,
    ReactNode,
    useEffect,
    useMemo,
} from "react";
import { useUser } from "./UserProvider";
import { listEvents } from "../utils/queries";
import { Event } from "../schema";
import { listAgendas } from "../utils/queries/agenda";

interface TimetableState {
    loading: boolean;
    events: Event[];
    error: string | null;
}

type TimetableAction =
    | { type: "FETCH_INIT" }
    | { type: "FETCH_SUCCESS"; payload: Event[] }
    | { type: "FETCH_FAILURE"; error: string };

const timetableReducer = (
    state: TimetableState,
    action: TimetableAction
): TimetableState => {
    switch (action.type) {
        case "FETCH_INIT":
            return { ...state, loading: true, error: null };
        case "FETCH_SUCCESS":
            return {
                ...state,
                loading: false,
                events: action.payload,
                error: null,
            };
        case "FETCH_FAILURE":
            return { ...state, loading: false, error: action.error };
        default:
            throw new Error(`Unhandled action type: FETCH_FAILURE`);
    }
};

const initialState: TimetableState = {
    loading: false,
    events: [],
    error: null,
};

interface TimetableContextProps extends TimetableState {}

const TimetableContext = createContext<TimetableContextProps | undefined>(
    undefined
);

interface TimetableProviderProps {
    children: ReactNode;
}

export const TimetableProvider: React.FC<TimetableProviderProps> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(timetableReducer, initialState);
    const { user } = useUser();

    useEffect(() => {
        const fetchEvents = async () => {
            dispatch({ type: "FETCH_INIT" });

            if (!user) {
                dispatch({
                    type: "FETCH_FAILURE",
                    error: "User not available",
                });
                return;
            }

            try {
                const agendas = await listAgendas(user.id);

                const eventsFromAgendas = await Promise.all(
                    agendas.map((agenda) => listEvents(agenda.id))
                );

                const allEvents: Event[] = eventsFromAgendas.flat();

                dispatch({ type: "FETCH_SUCCESS", payload: allEvents });
            } catch (error) {
                dispatch({ type: "FETCH_FAILURE", error: error.message });
            }
        };

        fetchEvents();
    }, [user]);

    const value = useMemo(() => state, [state]);

    return (
        <TimetableContext.Provider value={value}>
            {children}
        </TimetableContext.Provider>
    );
};

export const useTimetable = () => {
    const context = useContext(TimetableContext);

    if (!context) {
        throw new Error(
            "useTimetable doit être utilisé à l'intérieur d'un TimetableProvider"
        );
    }

    return context;
};
