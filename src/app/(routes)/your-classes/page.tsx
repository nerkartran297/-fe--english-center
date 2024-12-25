"use client";

import React, { useState, useEffect } from "react";
import {
    Calendar,
    Clock,
    Search,
    Book,
    Video,
    CheckCircle,
    AlertCircle,
    ArrowRight,
    Filter,
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
    classes: Class[];
    coverIMG: string;
}

// Mock data for user's enrolled classes
const mockUserClasses = [
    {
        courseID: "1",
        name: "Web Development Bootcamp",
        coverIMG: "/logo.jpg",
        classes: [
            {
                classID: "WD1-C1",
                name: "HTML & CSS Fundamentals",
                schedule: ["Thứ 2", "19:30 - 21:30"],
                description: [
                    ["HTML Basics"],
                    ["CSS Styling"],
                    ["Responsive Design"],
                ],
                teachers: [["John Doe", "T001"]],
                lessonList: ["HTML", "CSS", "Responsive"],
                progress: 3,
                documents: ["https://docs.example.com/html-basics"],
                isActive: true,
                meeting: "https://meet.example.com/wd1-c1",
                coverIMG: "/html-css.jpg",
                startDate: "01 02 2024",
                endDate: "08 02 2024",
            },
            // Add more classes...
        ],
    },
    {
        courseID: "2",
        name: "Data Science và Machine Learning cơ bản",
        description:
            "Khám phá thế giới AI và ML với Python, NumPy, Pandas và Scikit-learn",
        classes: [
            {
                classID: "DS2-C1",
                name: "Giới thiệu và Cơ bản về Python",
                schedule: [
                    "Mon 15: 30 18:00",
                    "Thu 19: 30 23:00",
                    "Sat 20:00 21: 30",
                ],
                description: [
                    ["Tổng quan về Data Science và Machine Learning"],
                    ["Cài đặt môi trường Python và các thư viện cần thiết"],
                    ["Python cơ bản cho Data Science"],
                    ["Thực hành với Google Colab"],
                ],
                teachers: [["Dr. Hoàng Minh", "T003"]],
                lessonList: [
                    "Python Basics",
                    "Data Types",
                    "Control Flow",
                    "Functions",
                ],
                progress: 1,
                documents: [
                    "https://docs.example.com/ds2-c1-slides",
                    "https://docs.example.com/ds2-c1-exercises",
                ],
                isActive: true,
                meeting: "https://meet.example.com/ds2-c1",
                coverIMG: "/python-basics.jpg",
                startDate: "01 02 2024",
                endDate: "08 02 2024",
            },
            {
                classID: "DS2-C2",
                name: "Numpy và Pandas Foundation",
                schedule: [
                    "Mon 15: 30 18:00",
                    "Thu 19: 30 23:00",
                    "Sat 20:00 21: 30",
                ],
                description: [
                    ["Giới thiệu về NumPy và tính toán ma trận"],
                    ["Xử lý dữ liệu với Pandas"],
                    ["Data cleaning và preprocessing"],
                    ["Thực hành phân tích dữ liệu thực tế"],
                ],
                teachers: [["Dr. Hoàng Minh", "T003"]],
                lessonList: [
                    "NumPy Arrays",
                    "Pandas DataFrame",
                    "Data Cleaning",
                    "EDA",
                ],
                progress: 1,
                documents: [
                    "https://docs.example.com/ds2-c2-slides",
                    "https://docs.example.com/ds2-c2-exercises",
                ],
                isActive: true,
                meeting: "https://meet.example.com/ds2-c2",
                coverIMG: "/numpy-pandas.jpg",
                startDate: "15 02 2024",
                endDate: "22 02 2024",
            },
            {
                classID: "DS2-C3",
                name: "Visualization với Matplotlib và Seaborn",
                schedule: [
                    "Mon 15: 30 18:00",
                    "Thu 19: 30 23:00",
                    "Sat 20:00 21: 30",
                ],
                description: [
                    ["Cơ bản về data visualization"],
                    ["Matplotlib cho biểu đồ cơ bản"],
                    ["Seaborn cho statistical visualizations"],
                    ["Best practices trong trực quan hóa dữ liệu"],
                ],
                teachers: [["Dr. Hoàng Minh", "T003"]],
                lessonList: [
                    "Basic Plots",
                    "Advanced Visualization",
                    "Statistical Plots",
                    "Interactive Plots",
                ],
                progress: 1,
                documents: [
                    "https://docs.example.com/ds2-c3-slides",
                    "https://docs.example.com/ds2-c3-exercises",
                ],
                isActive: false,
                meeting: "https://meet.example.com/ds2-c3",
                coverIMG: "/visualization.jpg",
                startDate: "01 03 2024",
                endDate: "08 03 2024",
            },
            {
                classID: "DS2-C4",
                name: "Machine Learning Fundamentals",
                schedule: [
                    "Mon 15: 30 18:00",
                    "Thu 19: 30 23:00",
                    "Sat 20:00 21: 30",
                ],
                description: [
                    ["Giới thiệu về Machine Learning"],
                    ["Supervised vs Unsupervised Learning"],
                    ["Linear Regression và Logistic Regression"],
                    ["Model Evaluation và Validation"],
                ],
                teachers: [["Dr. Hoàng Minh", "T003"]],
                lessonList: [
                    "ML Intro",
                    "Regression",
                    "Classification",
                    "Model Evaluation",
                ],
                progress: 1,
                documents: [
                    "https://docs.example.com/ds2-c4-slides",
                    "https://docs.example.com/ds2-c4-exercises",
                ],
                isActive: false,
                meeting: "https://meet.example.com/ds2-c4",
                coverIMG: "/ml-basics.jpg",
                startDate: "15 03 2024",
                endDate: "22 03 2024",
            },
            {
                classID: "DS2-C5",
                name: "Project Thực tế",
                schedule: [
                    "Mon 15: 30 18:00",
                    "Thu 19: 30 23:00",
                    "Sat 20:00 21: 30",
                ],
                description: [
                    ["End-to-end Machine Learning project"],
                    ["Làm việc với dữ liệu thực tế"],
                    ["Model deployment cơ bản"],
                    ["Best practices và tips trong Data Science"],
                ],
                teachers: [["Dr. Hoàng Minh", "T003"]],
                lessonList: [
                    "Project Planning",
                    "Implementation",
                    "Deployment",
                    "Presentation",
                ],
                progress: 1,
                documents: [
                    "https://docs.example.com/ds2-c5-slides",
                    "https://docs.example.com/ds2-c5-exercises",
                ],
                isActive: false,
                meeting: "https://meet.example.com/ds2-c5",
                coverIMG: "/project.jpg",
                startDate: "01 04 2024",
                endDate: "30 04 2024",
            },
        ],
        teachers: [["Dr. Hoàng Minh", "T003"]],
        price: 2499000,
        compareAtPrice: 2499000,
        rating: 4.9,
        totalVote: 128,
        target: [
            "Lập trình viên Python",
            "Người quan tâm đến AI/ML",
            "Data Analyst",
        ],
        sumary: [
            "Nền tảng Python cho Data Science",
            "Phân tích dữ liệu với Pandas",
            "Machine Learning cơ bản",
            "Thực hành với dự án thực tế",
        ],
        studentList: [],
        studentLimit: 50,
        appliedNumber: 42,
        currentStudent: 38,
        coverIMG: "/logo.jpg",
        startDate: "01 02 2024",
        endDate: "30 04 2024",
    },
    // Add more courses...
];

export default function MyClasses() {
    const [userClasses, setUserClasses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<
        "all" | "active" | "upcoming" | "completed"
    >("all");

    useEffect(() => {
        const fetchUserClasses = async () => {
            try {
                setIsLoading(true);
                // Simulate API call
                setTimeout(() => {
                    setUserClasses(mockUserClasses);
                    setIsLoading(false);
                }, 1000);
            } catch (error) {
                console.error("Error fetching classes:", error);
                setIsLoading(false);
            }
        };

        fetchUserClasses();
    }, []);

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

    const LoadingSkeleton = () => (
        <div className="grid grid-cols-1 gap-4 animate-pulse">
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="bg-white p-6 rounded-lg border border-gray-200"
                >
                    <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                </div>
            ))}
        </div>
    );

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
            {isLoading ? (
                <LoadingSkeleton />
            ) : (
                <div className="space-y-4">
                    {filteredClasses.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Không tìm thấy lớp học
                            </h3>
                            <p className="text-gray-500">
                                Không tìm thấy lớp học nào phù hợp với tìm kiếm
                                của bạn
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
                                                    {classItem.schedule.join(
                                                        " "
                                                    )}
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
                                                    {
                                                        classItem.lessonList
                                                            .length
                                                    }{" "}
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
            )}
        </div>
    );
}
