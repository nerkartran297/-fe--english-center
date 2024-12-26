"use client";

import React, { useState, useEffect } from "react";
import {
    Calendar,
    Clock,
    Search,
    Book,
    Video,
    AlertCircle,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

interface Class {
    classID: string;
    schedule: string[];
    name: string;
    description: string[][];
    teachers: string[][];
    lessonList: string[];
    progress: number;
    documents: string[];
    isActive: boolean;
    meeting: string;
    coverIMG: string;
    startDate: string;
    endDate: string;
}

interface Course {
    courseID: string;
    name: string;
    classes: Class[];
    coverIMG: string;
}

export default function MyClasses() {
    const [userClasses, setUserClasses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<
        "all" | "active" | "upcoming" | "completed"
    >("all");

    const { user, isLoaded } = useUser();

    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user || !isLoaded) return;

        const fetchUserClasses = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(
                    `http://localhost:5000/api/my-classes?clerkUserID=${user.id}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const data = await response.json();
                setUserClasses(data);
                setIsLoading(false);
                setError(null);
            } catch (error: any) {
                console.error("Error fetching my classes:", error);
                setIsLoading(false);
                setError(error);
            }
        };

        fetchUserClasses();
    }, [user, isLoaded]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!userClasses || userClasses.length === 0) {
        return (
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Không có lớp học nào
                </h1>
            </div>
        );
    }

    const filteredClasses = userClasses
        .flatMap((course) =>
            course.classes.map((classItem) => ({
                ...classItem,
                courseName: course.name,
                courseID: course.courseID,
            }))
        )
        .filter((classItem) => {
            const matchesSearch =
                classItem.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                classItem.courseName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

            if (filterStatus === "all") return matchesSearch;
            if (filterStatus === "active")
                return matchesSearch && classItem.isActive;
            if (filterStatus === "upcoming")
                return matchesSearch && !classItem.isActive;
            // Add more filter conditions as needed

            return matchesSearch;
        });

    // const LoadingSkeleton = () => (
    //     <div className="grid grid-cols-1 gap-4 animate-pulse">
    //         {[1, 2, 3].map((i) => (
    //             <div
    //                 key={i}
    //                 className="bg-white p-6 rounded-lg border border-gray-200"
    //             >
    //                 <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" />
    //                 <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
    //                 <div className="h-4 bg-gray-200 rounded w-1/3" />
    //             </div>
    //         ))}
    //     </div>
    // );

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    Lớp học của tôi
                </h1>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-none">
                        <input
                            type="text"
                            placeholder="Tìm kiếm lớp học..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full sm:w-64 px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                        />
                        <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as any)}
                        className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="all">Tất cả</option>
                        <option value="active">Đang diễn ra</option>
                        <option value="upcoming">Sắp diễn ra</option>
                        <option value="completed">Đã hoàn thành</option>
                    </select>
                </div>
            </div>

            {/* Classes List */}
            <div className="space-y-4">
                {filteredClasses.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Không tìm thấy lớp học
                        </h3>
                        <p className="text-gray-500">
                            Không tìm thấy lớp học nào phù hợp với tìm kiếm của
                            bạn
                        </p>
                    </div>
                ) : (
                    filteredClasses.map((classItem) => (
                        <div
                            key={classItem.classID}
                            className="bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
                        >
                            <div className="p-6">
                                {/* Class Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <Link
                                            href={`/course-info/${classItem.courseID}`}
                                            className="text-sm text-blue-600 hover:text-blue-700 mb-2 block"
                                        >
                                            {classItem.courseName}
                                        </Link>
                                        <h3 className="text-lg font-medium text-gray-900">
                                            {classItem.name}
                                        </h3>
                                    </div>
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            classItem.isActive
                                                ? "bg-green-100 text-green-800"
                                                : "bg-yellow-100 text-yellow-800"
                                        }`}
                                    >
                                        {classItem.isActive
                                            ? "Đang diễn ra"
                                            : "Sắp diễn ra"}
                                    </span>
                                </div>

                                {/* Class Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <span>
                                                {classItem.schedule.join(" ")}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Clock className="w-4 h-4 text-gray-400" />
                                            <span>
                                                {classItem.startDate} -{" "}
                                                {classItem.endDate}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Book className="w-4 h-4 text-gray-400" />
                                            <span>
                                                {classItem.lessonList.length}{" "}
                                                bài học
                                            </span>
                                        </div>
                                        {classItem.isActive && (
                                            <a
                                                href={classItem.meeting}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                                            >
                                                <Video className="w-4 h-4" />
                                                Vào lớp học
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mt-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-600">
                                            Tiến độ học tập
                                        </span>
                                        <span className="text-sm font-medium text-gray-900">
                                            {Math.round(
                                                (classItem.progress /
                                                    classItem.lessonList
                                                        .length) *
                                                    100
                                            )}
                                            %
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full"
                                            style={{
                                                width: `${
                                                    (classItem.progress /
                                                        classItem.lessonList
                                                            .length) *
                                                    100
                                                }%`,
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-4 flex items-center justify-end gap-3">
                                    <Link
                                        href={`/class/${classItem.classID}`}
                                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                                    >
                                        Xem chi tiết
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
