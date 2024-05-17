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
        const fetchEvents = async () => {
            setLoading(true);
            setEvents([]);

            if (!user || !Array.isArray(user.urls)) {
                setLoading(false);
                return;
            }

            const { urls } = user;
            const allEvents: Event[] = [];

            for (const url of urls) {
                const newEvents = await getTimetableFromCelcat(url);
                allEvents.push(...newEvents);
            }

            const agendas: Agenda[] = await listAgendas(user.id);
            for (const agenda of agendas) {
                if (agenda.active) {
                    const newEvents = await listEvents(agenda.id);
                    allEvents.push(...newEvents);
                }
            }

            setEvents(allEvents);
            setLoading(false);
        };

        fetchEvents();
    }, [user]);

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
