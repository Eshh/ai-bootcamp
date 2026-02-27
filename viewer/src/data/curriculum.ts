export interface DayInfo {
    day: string;
    slug: string;
    title: string;
    subtitle: string;
    topics: string[];
    contentPath: string;
}

export interface WeekInfo {
    week: number;
    slug: string;
    title: string;
    description: string;
    days: DayInfo[];
}

export const curriculum: WeekInfo[] = [
    {
        week: 1,
        slug: "week-1",
        title: "Python Foundations",
        description: "Core Python concepts, data structures, control flow, and introduction to Pandas",
        days: [
            {
                day: "Tuesday",
                slug: "tuesday",
                title: "Python Fundamentals",
                subtitle: "Variables, Types, Strings, Math, Data Structures & Loops",
                topics: [
                    "Variables & Dynamic Typing",
                    "Strings & f-Strings",
                    "Math Module",
                    "Lists, Tuples, Dicts, Sets",
                    "List Comprehensions",
                    "For & While Loops",
                ],
                contentPath: "/content/week-1/tuesday/study_material.html",
            },
            {
                day: "Thursday",
                slug: "thursday",
                title: "Python Intermediate & Pandas",
                subtitle: "Dictionary Comprehension, Copying, Naming Conventions, Pandas",
                topics: [
                    "Dictionary Comprehension",
                    "Shallow vs. Deep Copy",
                    "PEP 8 Naming Conventions",
                    "Import Aliases & Namespaces",
                    "Pandas Series",
                    "Pandas DataFrames",
                ],
                contentPath: "/content/week-1/thursday/study_material.html",
            },
        ],
    },
];
