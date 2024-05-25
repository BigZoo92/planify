import "./CardCalendrier.scss";
import { UsersThree, MapPin, Student } from "@phosphor-icons/react";

interface CalendarCardProps {
    group: string;
    subject: string;
    staff: string;
    classroom: string;
    date: string;
    notes: string | null;
    starttime: string;
    endtime: string;
}

const getColor = (subject: string): string => {
    switch (subject) {
        case "Dispositifs inter DWA":
            return "var(--color-blue-100)";
        case "Dév web DWA":
            return "var(--color-orange)";
        case "Prod. disp. inter. DWA":
            return "var(--color-pink)";
        default:
            return "var(--color-black-25)";
    }
};

const getAdjustedColor = (subject: string): string => {
    switch (subject) {
        case "Dispositifs inter DWA":
            return "var(--color-blue-light)";
        case "Dév web DWA":
            return "var(--color-orange-light)";
        case "Prod. disp. inter. DWA":
            return "var(--color-pink-light)";
        default:
            return "var(--color-black-25)";
    }
};

const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const CardCalendrier: React.FC<CalendarCardProps> = ({
    group,
    subject,
    staff,
    classroom,
    date,
    notes,
    starttime,
    endtime,
}) => {
    const setColor = getColor(subject);
    const adjustedColor = getAdjustedColor(subject);

    const courseStatus = () => {
        const now = new Date();
        now.setSeconds(0, 0);

        const [day, month, year] = date.split("/").map(Number);
        const [startHour, startMinute] = starttime.split(":").map(Number);
        const [endHour, endMinute] = endtime.split(":").map(Number);

        const startDate = new Date(
            year,
            month - 1,
            day,
            startHour,
            startMinute
        );
        const endDate = new Date(year, month - 1, day, endHour, endMinute);

        let text, className;

        const startOfDay = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );
        const diffDays = Math.floor(
            (startDate.getTime() - startOfDay.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (startDate > now) {
            if (diffDays === 0) {
                text = `À ${capitalizeFirstLetter(starttime)}`;
            } else if (diffDays === 1) {
                text = `Demain - À ${capitalizeFirstLetter(starttime)}`;
            } else if (diffDays === 2) {
                text = `Après-demain - À ${capitalizeFirstLetter(starttime)}`;
            } else {
                const dayOfWeek = startDate.toLocaleDateString("fr-FR", {
                    weekday: "long",
                });
                text = `${capitalizeFirstLetter(dayOfWeek)} - À ${capitalizeFirstLetter(starttime)}`;
            }
        } else if (now >= startDate && now <= endDate) {
            text = "En cours";
            className = "active";
        } else {
            text = "Passé";
        }

        return { text, className };
    };

    const status = courseStatus();

    const formattedStaff = staff
        .split(",")
        .map((name) => name.trim())
        .join(", ");

    return (
        <div className="card-wrapper-element">
            <div className="card-cours" style={{ backgroundColor: setColor }}>
                <svg
                    width="103"
                    height="73"
                    viewBox="0 0 103 73"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="element"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M79.3463 -91.64C96.6954 -96.7396 115.389 -86.6312 129.814 -75.7074C144.064 -64.9162 152.131 -48.5951 158.349 -31.8141C164.821 -14.3483 173.663 5.14892 166.079 22.1592C158.597 38.94 136.99 42.3173 121.16 51.5963C107.311 59.7138 95.3888 72.8968 79.3463 72.9991C63.2671 73.1017 47.8398 64.1661 37.1444 52.1321C27.5511 41.3382 30.5783 24.9259 24.8351 11.666C18.1108 -3.85939 -4.67571 -15.656 0.857984 -31.6466C6.42916 -47.7455 33.0892 -40.9165 46.6077 -51.2496C60.7147 -62.0324 62.3221 -86.6359 79.3463 -91.64Z"
                        style={{ fill: adjustedColor }}
                    />
                </svg>
                <div
                    className="card-temps"
                    style={{ borderColor: adjustedColor }}
                >
                    <span>{starttime}</span>
                    <hr />
                    <span>{endtime}</span>
                </div>
                <div className="card-description">
                    <div className="card-header">
                        <p className="card-titre">{subject}</p>
                        <span className={status.className}>{status.text}</span>
                    </div>
                    {notes && <p className="notes">{notes}</p>}
                    <div className="card-bottom">
                        <div className="card-texte-wrapper">
                            <Student size={15} color="currentColor" />
                            <p>{formattedStaff}</p>
                        </div>
                        <hr />
                        <div className="card-bottom-texte">
                            <div className="card-texte-wrapper">
                                <UsersThree size={15} color="currentColor" />
                                <p>{group}</p>
                            </div>
                            <div className="card-texte-wrapper">
                                {classroom && (
                                    <>
                                        <MapPin
                                            size={15}
                                            color="currentColor"
                                        />
                                        <p>{classroom}</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardCalendrier;
