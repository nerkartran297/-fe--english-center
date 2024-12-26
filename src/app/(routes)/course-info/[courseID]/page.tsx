"use client";

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
    Calendar,
    Clock,
    Users,
    Star,
    Target,
    CheckCircle,
    Book,
    Video,
} from "lucide-react";
import Link from "next/link";

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
    description: string;
    classes: Class[];
    teachers: string[][];
    price: number;
    compareAtPrice: number;
    rating: number;
    totalVote: number;
    target: string[];
    sumary: string[];
    studentList: string[];
    studentLimit: number;
    appliedNumber: number;
    currentStudent: number;
    coverIMG: string;
    startDate: string;
    endDate: string;
}

const LoadingSkeleton = () => (
    <div className="animate-pulse">
        <div className="h-64 bg-gray-200 rounded-lg mb-6" />
        <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
    </div>
);

export default function CourseInfo() {
    const params = useParams();
    const searchParams = useSearchParams();
    const paid = searchParams.get("paid") === "true";
    console.log(paid);
    const [course, setCourse] = useState<Course | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `http://localhost:5000/api/course-information/${params.courseID}`
                );
                console.log(params.courseID);
                const data = await response.json();
                setCourse(data.course);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching course:", error);
                setIsLoading(false);
            }
        };

        fetchCourse();
    }, [params.courseID]);

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    if (isLoading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <LoadingSkeleton />
            </div>
        );
    }

    if (!course) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Không tìm thấy khóa học
                    </h1>
                    <p className="text-gray-600">
                        Khóa học bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="m-4 px-3 py-3 bg-white rounded-xl min-h-[87vh]">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <div className="lg:col-span-2">
                        <img
                            src={course.coverIMG}
                            alt={course.name}
                            className="w-full h-64 object-cover rounded-lg mb-4"
                        />
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            {course.name}
                        </h1>
                        <p className="text-gray-600 mb-4">
                            {course.description}
                        </p>

                        {/* Course Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <Users className="w-5 h-5 text-blue-500" />
                                    <span className="text-sm font-medium text-blue-700">
                                        Học viên
                                    </span>
                                </div>
                                <p className="text-lg font-semibold text-blue-900">
                                    {course.currentStudent}/
                                    {course.studentLimit}
                                </p>
                            </div>

                            <div className="bg-yellow-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <Star className="w-5 h-5 text-yellow-500" />
                                    <span className="text-sm font-medium text-yellow-700">
                                        Đánh giá
                                    </span>
                                </div>
                                <p className="text-lg font-semibold text-yellow-900">
                                    {course.rating}/5 ({course.totalVote})
                                </p>
                            </div>

                            <div className="bg-green-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar className="w-5 h-5 text-green-500" />
                                    <span className="text-sm font-medium text-green-700">
                                        Thời gian
                                    </span>
                                </div>
                                <p className="text-sm font-semibold text-green-900">
                                    {course.startDate} - {course.endDate}
                                </p>
                            </div>

                            <div className="bg-purple-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <Book className="w-5 h-5 text-purple-500" />
                                    <span className="text-sm font-medium text-purple-700">
                                        Bài học
                                    </span>
                                </div>
                                <p className="text-lg font-semibold text-purple-900">
                                    {course.classes.length} buổi
                                </p>
                            </div>
                        </div>

                        {/* Course Content */}
                        <div className="space-y-6">
                            {/* Target Audience */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Target className="w-5 h-5 text-blue-500" />
                                    Đối tượng phù hợp
                                </h2>
                                <ul className="space-y-2">
                                    {course.target.map((target, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-2"
                                        >
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-600">
                                                {target}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Course Summary */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-blue-500" />
                                    Bạn sẽ học được gì
                                </h2>
                                <ul className="space-y-2">
                                    {course.sumary.map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-2"
                                        >
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-600">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Class Schedule */}
                            <div className="mt-8">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-blue-500" />
                                    Lịch học chi tiết
                                </h2>
                                <div className="space-y-4">
                                    {course.classes.map((classItem) => (
                                        <div
                                            key={classItem.classID}
                                            className={`border ${
                                                classItem.isActive
                                                    ? "border-blue-200 bg-blue-50"
                                                    : "border-gray-200 bg-gray-50"
                                            } rounded-lg p-4`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="font-medium text-gray-900">
                                                    {classItem.name}
                                                </h3>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        classItem.isActive
                                                            ? "bg-blue-100 text-blue-800"
                                                            : "bg-gray-100 text-gray-800"
                                                    }`}
                                                >
                                                    {classItem.isActive
                                                        ? "Đang diễn ra"
                                                        : "Sắp diễn ra"}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                                                <div>
                                                    <p className="text-sm text-gray-600 mb-2">
                                                        <Clock className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                                        Lịch học:{" "}
                                                        {classItem.schedule.join(
                                                            " "
                                                        )}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        <Calendar className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                                        {classItem.startDate} -{" "}
                                                        {classItem.endDate}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-sm text-gray-600 mb-2">
                                                        <Book className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                                        {
                                                            classItem.lessonList
                                                                .length
                                                        }{" "}
                                                        bài học
                                                    </p>
                                                    {classItem.isActive &&
                                                        classItem.meeting && (
                                                            <Link
                                                                href={
                                                                    classItem.meeting
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                                            >
                                                                <Video className="w-4 h-4" />
                                                                Tham gia lớp học
                                                            </Link>
                                                        )}
                                                </div>
                                            </div>

                                            <div className="mt-3">
                                                <h4 className="text-sm font-medium text-gray-900 mb-2">
                                                    Nội dung buổi học:
                                                </h4>
                                                <ul className="space-y-1">
                                                    {classItem.description.map(
                                                        (desc, index) => (
                                                            <li
                                                                key={index}
                                                                className="text-sm text-gray-600 flex items-start gap-2"
                                                            >
                                                                <CheckCircle className="w-4 h-4 text-gray-400 mt-0.5" />
                                                                {desc[0]}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Teachers */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Users className="w-5 h-5 text-blue-500" />
                                    Giảng viên
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {course.teachers.map((teacher, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                                        >
                                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                                <Users className="w-6 h-6 text-gray-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-900">
                                                    {teacher[0]}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    ID: {teacher[1]}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Class Schedule */}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-4 bg-white rounded-lg border border-gray-200 p-6">
                            <div className="mb-4">
                                <div className="text-3xl font-bold text-blue-600 mb-2">
                                    {formatPrice(course.price)}
                                </div>
                                {course.compareAtPrice > course.price && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg text-gray-400 line-through">
                                            {formatPrice(course.compareAtPrice)}
                                        </span>
                                        <span className="text-sm font-medium text-red-600">
                                            (-
                                            {Math.round(
                                                ((course.compareAtPrice -
                                                    course.price) /
                                                    course.compareAtPrice) *
                                                    100
                                            )}
                                            %)
                                        </span>
                                    </div>
                                )}
                            </div>

                            <button className="w-full bg-blue-600 text-white rounded-lg py-3 px-4 text-sm font-medium hover:bg-blue-700 transition-colors mb-4">
                                <Link
                                    href={`/purchase/${course.courseID}`}
                                ></Link>
                                {paid === true ? (
                                    <div>Đã đăng ký</div>
                                ) : (
                                    <Link href={`/purchase/${course.courseID}`}>
                                        Đăng ký ngay
                                    </Link>
                                )}
                            </button>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Users className="w-5 h-5 text-blue-500" />
                                    <span>
                                        {course.currentStudent} học viên đã đăng
                                        ký
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Calendar className="w-5 h-5 text-blue-500" />
                                    <span>Khai giảng: {course.startDate}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Clock className="w-5 h-5 text-blue-500" />
                                    <span>Kết thúc: {course.endDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
