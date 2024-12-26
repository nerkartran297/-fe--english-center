"use client";

import React, { useState, useEffect } from "react";
import {
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
import { useUser } from "@clerk/nextjs";

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

export default function Schedule() {
    const { user, isLoaded } = useUser();
    const [weekDate, setWeekDate] = useState(new Date());
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
        const fetchStudentInfo = async () => {
            try {
                setIsLoading(true);
                // Fetch student info from API
                if (!isLoaded || !user) return;

                const response = await fetch(
                    `http://localhost:5000/api/student-information?clerkUserID=${user.id}`
                );

                const data = await response.json();

                if (data.error) {
                    return console.error(data.error);
                }

                const courseData = data;

                const scheduleData: ClassSession[] = [];

                courseData.courses.forEach((course: any) => {
                    const classSessions = course.classes;

                    classSessions.forEach((classSession: any) => {
                        const schedule = classSession.schedule;

                        schedule.forEach((scheduleItem: any) => {
                            const parsedSchedule = parseSchedule(scheduleItem);
                            const courseStartDate = new Date(
                                course.startDate.split(" ").reverse().join("-")
                            );
                            const courseEndDate = new Date(
                                course.endDate.split(" ").reverse().join("-")
                            );
                            const weekStart = new Date(weekDate);
                            weekStart.setDate(
                                weekStart.getDate() - weekStart.getDay()
                            );
                            const weekEnd = new Date(weekStart);
                            weekEnd.setDate(weekEnd.getDate() + 6);

                            if (
                                (courseStartDate >= weekStart &&
                                    courseStartDate <= weekEnd) ||
                                (courseEndDate >= weekStart &&
                                    courseEndDate <= weekEnd) ||
                                (courseStartDate <= weekStart &&
                                    courseEndDate >= weekEnd)
                            ) {
                                const classSessionItem: ClassSession = {
                                    classID: classSession.classID,
                                    courseID: course.courseID,
                                    courseName: course.courseName,
                                    className: classSession.className,
                                    schedule: [scheduleItem],
                                    meeting: classSession.meeting,
                                    teacher: classSession.teacher[0][0],
                                    colorScheme: [
                                        "blue",
                                        "green",
                                        "purple",
                                        "orange",
                                        "pink",
                                    ][Math.floor(Math.random() * 5)],
                                };

                                scheduleData.push(classSessionItem);
                            }
                        });
                    });
                });

                setSchedule(scheduleData);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching schedule:", error);
                setIsLoading(false);
            }
        };

        fetchStudentInfo();
    }, [user, isLoaded, weekDate]);

    const weekDates = getWeekDates(weekDate);

    const previousWeek = () => {
        const newDate = new Date(weekDate);
        newDate.setDate(newDate.getDate() - 7);
        setWeekDate(newDate);
    };

    const nextWeek = () => {
        const newDate = new Date(weekDate);
        newDate.setDate(newDate.getDate() + 7);
        setWeekDate(newDate);
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
                                            className={`bg-white rounded-md p-2 shadow-sm border-l-4 ${
                                                classItem.colorScheme === "blue"
                                                    ? "border-blue-400 hover:bg-blue-50"
                                                    : classItem.colorScheme ===
                                                      "green"
                                                    ? "border-green-400 hover:bg-green-50"
                                                    : classItem.colorScheme ===
                                                      "purple"
                                                    ? "border-purple-400 hover:bg-purple-50"
                                                    : classItem.colorScheme ===
                                                      "orange"
                                                    ? "border-orange-400 hover:bg-orange-50"
                                                    : classItem.colorScheme ===
                                                      "pink"
                                                    ? "border-pink-400 hover:bg-pink-50"
                                                    : "border-gray-400 hover:bg-gray-50"
                                            }`}
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
