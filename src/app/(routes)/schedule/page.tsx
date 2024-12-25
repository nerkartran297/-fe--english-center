"use client";

import React, { useState, useEffect } from "react";
import {
    Calendar,
    Clock,
    Video,
    ChevronLeft,
    ChevronRight,
    Sun,
    Sunset,
    Moon,
} from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

interface ParsedSchedule {
    day: string;
    startTime: string;
    endTime: string;
    timeSlot: "morning" | "afternoon" | "evening";
}

const parseSchedule = (scheduleStr: string): ParsedSchedule => {
    // Format: "Mon 15:30 18:00"
    const [day, startTime, endTime] = scheduleStr.split(" ");

    // Determine time slot based on start time
    const startHour = parseInt(startTime.split(":")[0]);
    let timeSlot: "morning" | "afternoon" | "evening";

    if (startHour < 12) {
        timeSlot = "morning";
    } else if (startHour < 18) {
        timeSlot = "afternoon";
    } else {
        timeSlot = "evening";
    }

    return {
        day,
        startTime,
        endTime,
        timeSlot,
    };
};

// Convert day string to number (0-6)
const dayToNumber = (day: string): number => {
    const dayMap: { [key: string]: number } = {
        Sun: 0,
        Mon: 1,
        Tue: 2,
        Wed: 3,
        Thu: 4,
        Fri: 5,
        Sat: 6,
    };
    return dayMap[day] || 0;
};

interface ClassSession {
    classID: string;
    courseID: string;
    courseName: string;
    className: string;
    schedule: string[]; // Array of schedule strings
    meeting: string;
    teacher: string;
    colorScheme?: "blue" | "green" | "purple" | "orange" | "pink";
}

// Mock data
const mockSchedule: ClassSession[] = [
    {
        classID: "WD1-C1",
        courseID: "1",
        courseName: "Web Development Bootcamp",
        className: "HTML & CSS Fundamentals",
        schedule: ["Mon 15:30 18:00", "Thu 19:30 23:00", "Sat 20:00 21:30"],
        meeting: "https://meet.example.com/wd1-c1",
        teacher: "John Doe",
        colorScheme: "blue",
    },
    // More mock data...
];

const getColorScheme = (
    scheme?: "blue" | "green" | "purple" | "orange" | "pink"
) => {
    switch (scheme) {
        case "blue":
            return "border-blue-400 hover:bg-blue-50";
        case "green":
            return "border-green-400 hover:bg-green-50";
        case "purple":
            return "border-purple-400 hover:bg-purple-50";
        case "orange":
            return "border-orange-400 hover:bg-orange-50";
        case "pink":
            return "border-pink-400 hover:bg-pink-50";
        default:
            return "border-gray-400 hover:bg-gray-50";
    }
};

export default function Schedule() {
    const [currentWeek, setCurrentWeek] = useState(new Date());
    const [schedule, setSchedule] = useState<ClassSession[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Get week dates
    const getWeekDates = (date: Date) => {
        const start = new Date(date);
        start.setDate(start.getDate() - start.getDay()); // Start from Sunday

        return Array.from({ length: 7 }, (_, i) => {
            const day = new Date(start);
            day.setDate(start.getDate() + i);
            return day;
        });
    };

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                setIsLoading(true);
                // Simulate API call
                setTimeout(() => {
                    setSchedule(mockSchedule);
                    setIsLoading(false);
                }, 1000);
            } catch (error) {
                console.error("Error fetching schedule:", error);
                setIsLoading(false);
            }
        };

        fetchSchedule();
    }, [currentWeek]);

    const weekDates = getWeekDates(currentWeek);

    const previousWeek = () => {
        const newDate = new Date(currentWeek);
        newDate.setDate(newDate.getDate() - 7);
        setCurrentWeek(newDate);
    };

    const nextWeek = () => {
        const newDate = new Date(currentWeek);
        newDate.setDate(newDate.getDate() + 7);
        setCurrentWeek(newDate);
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat("vi-VN", {
            day: "2-digit",
            month: "2-digit",
        }).format(date);
    };

    const getDayName = (date: Date) => {
        const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
        return days[date.getDay()];
    };

    const isToday = (date: Date) => {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    };

    const LoadingSkeleton = () => (
        <div className="space-y-4 animate-pulse">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-32 bg-gray-100 rounded-lg" />
            ))}
        </div>
    );

    const TimeSlotSection = ({
        slot,
        icon,
        title,
    }: {
        slot: "morning" | "afternoon" | "evening";
        icon: React.ReactNode;
        title: string;
    }) => (
        <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
                {icon}
                <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            </div>
            <div className="grid grid-cols-7 gap-3">
                {weekDates.map((date, index) => {
                    // Filter classes for this day and time slot
                    const dayClasses = schedule.filter((classItem) =>
                        classItem.schedule.some((scheduleStr) => {
                            const parsed = parseSchedule(scheduleStr);
                            return (
                                dayToNumber(parsed.day) === date.getDay() &&
                                parsed.timeSlot === slot
                            );
                        })
                    );

                    return (
                        <div
                            key={index}
                            className={`min-h-[150px] rounded-lg p-2 ${
                                isToday(date)
                                    ? "bg-blue-50 border-2 border-blue-200"
                                    : "bg-gray-50 border border-gray-200"
                            }`}
                        >
                            <div className="space-y-2">
                                {dayClasses.map((classItem) => {
                                    const scheduleForDay = classItem.schedule
                                        .map(parseSchedule)
                                        .find(
                                            (s) =>
                                                dayToNumber(s.day) ===
                                                date.getDay()
                                        );

                                    if (!scheduleForDay) return null;

                                    return (
                                        <div
                                            key={classItem.classID}
                                            className={`bg-white rounded-md p-2 shadow-sm border-l-4 ${getColorScheme(
                                                classItem.colorScheme
                                            )}`}
                                        >
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Link
                                                            href={`/course-info/${classItem.courseID}`}
                                                            className="text-sm font-medium text-gray-900 hover:text-blue-600 block mb-1 truncate"
                                                        >
                                                            {
                                                                classItem.className
                                                            }
                                                        </Link>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>
                                                            {
                                                                classItem.courseName
                                                            }
                                                        </p>
                                                        <p>
                                                            {
                                                                classItem.className
                                                            }
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>

                                            <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                                                <Clock className="w-3 h-3" />
                                                {
                                                    scheduleForDay.startTime
                                                } - {scheduleForDay.endTime}
                                            </div>
                                            <div className="text-xs text-gray-500 mb-2 truncate">
                                                {classItem.teacher}
                                            </div>
                                            <a
                                                href={classItem.meeting}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
                                            >
                                                <Video className="w-3 h-3" />
                                                Vào lớp
                                            </a>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">
                    Lịch học trong tuần
                </h1>
                <div className="flex items-center gap-4">
                    <button
                        onClick={previousWeek}
                        className="p-2 hover:bg-gray-100 rounded-full"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="text-sm font-medium">
                        {formatDate(weekDates[0])} - {formatDate(weekDates[6])}
                    </div>
                    <button
                        onClick={nextWeek}
                        className="p-2 hover:bg-gray-100 rounded-full"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-3 mb-6">
                {weekDates.map((date, index) => (
                    <div
                        key={index}
                        className={`text-center p-2 rounded-lg ${
                            isToday(date)
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-50 text-gray-600"
                        }`}
                    >
                        <div className="text-sm font-medium">
                            {getDayName(date)}
                        </div>
                        <div className="text-lg font-semibold">
                            {date.getDate()}
                        </div>
                    </div>
                ))}
            </div>

            {/* Schedule Grid */}
            {isLoading ? (
                <LoadingSkeleton />
            ) : (
                <>
                    <TimeSlotSection
                        slot="morning"
                        icon={<Sun className="w-5 h-5 text-orange-500" />}
                        title="Buổi sáng (6:00 - 12:00)"
                    />
                    <TimeSlotSection
                        slot="afternoon"
                        icon={<Sunset className="w-5 h-5 text-yellow-500" />}
                        title="Buổi chiều (12:00 - 18:00)"
                    />
                    <TimeSlotSection
                        slot="evening"
                        icon={<Moon className="w-5 h-5 text-blue-500" />}
                        title="Buổi tối (18:00 - 22:00)"
                    />
                </>
            )}
        </div>
    );
}
