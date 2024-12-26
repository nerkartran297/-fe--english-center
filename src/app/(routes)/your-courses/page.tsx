"use client";
import React, { useState, useEffect } from "react";
import {
    Calendar,
    Search,
    DollarSign,
    CheckCircle,
    Clock,
    AlertCircle,
    BookOpen,
} from "lucide-react";
import Link from "next/link";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

interface Assignment {
    score: number;
    description: string;
    comment: string;
}

interface CourseInfo {
    courseID: string;
    enrollDate: string;
    isPaid: boolean;
    scores: Assignment[];
    paycheckIMG?: string;
}

interface Course {
    courseID: string;
    name: string;
    description: string;
    teachers: string[][];
    price: number;
    rating: number;
    totalVote: number;
    coverIMG: string;
    startDate: string;
    endDate: string;
}

interface ClassInfo {
    classID: string;
    className: string;
    schedule: string[];
    meeting: string;
    teacher: string[][];
}

interface CourseData {
    courseID: string;
    courseName: string;
    classes: ClassInfo[];
}

export default function YourCourses() {
    const [enrolledCourses, setEnrolledCourses] = useState<
        (Course & { enrollInfo: CourseInfo })[]
    >([]);
    const [filteredCourses, setFilteredCourses] = useState<
        (Course & { enrollInfo: CourseInfo })[]
    >([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<
        "all" | "active" | "completed" | "unpaid"
    >("all");
    const { isLoaded, user } = useUser();

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                setIsLoading(true);
                if (isLoaded && user) {
                    const response = await fetch(
                        `http://localhost:5000/api/student-information?clerkUserID=${user.id}`
                    );
                    const data = await response.json();
                    const courses = data.courses.map((course) => {
                        return {
                            courseID: course.courseID,
                            name: course.courseName,
                            description: "",
                            teachers: course.classes[0].teacher,
                            price: course.price,
                            rating: course.rating,
                            totalVote: course.totalVote,
                            coverIMG: course.coverIMG,
                            startDate: course.startDate,
                            endDate: course.endDate,
                            enrollInfo: {
                                courseID: course.courseID,
                                enrollDate: course.enrollDate,
                                isPaid: course.isPaid,
                                scores: [],
                            },
                        };
                    });

                    console.log(courses);
                    setEnrolledCourses(courses);
                    setFilteredCourses(courses);
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
                setIsLoading(false);
            }
        };

        fetchEnrolledCourses();
    }, [isLoaded, user]);

    useEffect(() => {
        const filtered = enrolledCourses.filter((course) => {
            const matchesSearch = course.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const currentDate = new Date();
            const endDate = new Date(
                course.endDate.split(" ").reverse().join("-")
            );
            const isCompleted = endDate < currentDate;

            switch (filterStatus) {
                case "active":
                    return (
                        matchesSearch &&
                        !isCompleted &&
                        course.enrollInfo.isPaid
                    );
                case "completed":
                    return matchesSearch && isCompleted;
                case "unpaid":
                    return matchesSearch && !course.enrollInfo.isPaid;
                default:
                    return matchesSearch;
            }
        });
        setFilteredCourses(filtered);
    }, [searchTerm, filterStatus, enrolledCourses]);

    const LoadingSkeleton = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="bg-white rounded-lg border border-gray-200 p-4"
                >
                    <div className="w-full h-40 bg-gray-200 rounded-lg mb-4" />
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
            ))}
        </div>
    );

    const getAverageScore = (scores: Assignment[]) => {
        if (scores.length === 0) return null;
        const sum = scores.reduce((acc, curr) => acc + curr.score, 0);
        return (sum / scores.length).toFixed(1);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Khóa học của bạn
                </h1>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Tìm kiếm khóa học..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 pl-10 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                        />
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    </div>

                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as any)}
                        className="px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="all">Tất cả khóa học</option>
                        <option value="active">Đang học</option>
                        <option value="completed">Đã hoàn thành</option>
                        <option value="unpaid">Chưa thanh toán</option>
                    </select>
                </div>
            </div>

            {/* Courses Grid */}
            {isLoading ? (
                <LoadingSkeleton />
            ) : filteredCourses.length === 0 ? (
                <div className="text-center py-12">
                    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Không tìm thấy khóa học
                    </h3>
                    <p className="text-gray-500">
                        Không có khóa học nào phù hợp với tìm kiếm của bạn
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                        <Link
                            key={course.courseID}
                            href={`/course-info/${course.courseID}?paid=true`}
                            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-blue-300 transition-colors"
                        >
                            <div className="relative">
                                <img
                                    src={course.coverIMG}
                                    alt={course.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-2 right-2">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            !course.enrollInfo.isPaid
                                                ? "bg-red-100 text-red-800"
                                                : new Date(
                                                      course.endDate
                                                          .split(" ")
                                                          .reverse()
                                                          .join("-")
                                                  ) < new Date()
                                                ? "bg-gray-100 text-gray-800"
                                                : "bg-green-100 text-green-800"
                                        }`}
                                    >
                                        {!course.enrollInfo.isPaid
                                            ? "Chưa thanh toán"
                                            : new Date(
                                                  course.endDate
                                                      .split(" ")
                                                      .reverse()
                                                      .join("-")
                                              ) < new Date()
                                            ? "Đã hoàn thành"
                                            : "Đang học"}
                                    </span>
                                </div>
                            </div>

                            <div className="p-4">
                                <h3 className="font-medium text-gray-900 mb-2">
                                    {course.name}
                                </h3>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Calendar className="w-4 h-4" />
                                        <span>
                                            Ngày đăng ký:{" "}
                                            {course.enrollInfo.enrollDate}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Clock className="w-4 h-4" />
                                        <span>
                                            {course.startDate} -{" "}
                                            {course.endDate}
                                        </span>
                                    </div>

                                    {course.enrollInfo.scores.length > 0 && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <BookOpen className="w-4 h-4 text-blue-500" />
                                            <span className="text-blue-600 font-medium">
                                                Điểm TB:{" "}
                                                {getAverageScore(
                                                    course.enrollInfo.scores
                                                )}
                                                /10
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                    <div className="flex items-center gap-1 text-sm">
                                        {course.teachers[0][0]}
                                    </div>
                                    {course.enrollInfo.isPaid ? (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Đã thanh toán</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    ) : (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <DollarSign className="w-5 h-5 text-red-500" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Chưa thanh toán</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
