import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import { useUser } from "./UserProvider";
import { getTimetableFromCelcat, listEvents } from "../utils/queries";
import { Agenda, Event } from "../schema";
import { listAgendas } from "../utils/queries/agenda";

interface TimetableContextProps {
    loading: boolean;
    events: Event[];
}

const TimetableContext = createContext<TimetableContextProps | undefined>(
    undefined
);

interface TimetableProviderProps {
    children: ReactNode;
}

export const TimetableProvider: React.FC<TimetableProviderProps> = ({
    children,
}) => {
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState<Event[]>([]);
    const { user } = useUser();

    useEffect(() => {
        setLoading(true);
        if (!user) return;
        const { urls } = user;
        for (const url of urls) {
            (async () => {
                const newEvents: Event[] = await getTimetableFromCelcat(url);
                setEvents([...events, ...newEvents]);
                const agendas: Agenda[] = await listAgendas(user.id);
                for (const agenda of agendas) {
                    if (agenda.active) {
                        const newEvents: Event[] = await listEvents(agenda.id);
                        setEvents([...events, ...newEvents]);
                    }
                }
            })();
        }
        setLoading(false);
    }, [user, events]);

    return (
        <TimetableContext.Provider
            value={{
                loading,
                events,
            }}
        >
            {children}
        </TimetableContext.Provider>
    );
};

export const useTimetable = () => {
    const context = useContext(TimetableContext);

    if (!context) {
        throw new Error(
            "useTimetableContext doit être utilisé à l'intérieur d'un TimetableProvider"
        );
    }

    return context;
};
