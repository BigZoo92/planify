// types/ical.js/index.d.ts
declare module 'ical.js' {
    export function parse(input: string): any;
    export class Component {
        constructor(jcal: any);
        getAllSubcomponents(name: string): Component[];
    }

    export class Event {
        constructor(component: Component, options?: any);
        summary: string;
        location: string;
        description: string;
        startDate: Date;
        endDate: Date;
        getOrganizer(): { cn: string };
        getAttendees(): { cn: string }[];
    }
}
