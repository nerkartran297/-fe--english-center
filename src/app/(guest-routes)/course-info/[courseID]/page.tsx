"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
    Calendar,
    Clock,
    Users,
    Star,
    Target,
    CheckCircle,
    Book,
    DollarSign,
    Video,
} from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

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

const sampleCourses: Course[] = [
    {
        courseID: "1",
        name: "Complete Web Development Bootcamp 2024",
        description:
            "Học lập trình web từ cơ bản đến nâng cao với HTML, CSS, JavaScript, React và Node.js",
        classes: [],
        teachers: [
            ["Nguyễn Văn Anh", "T001"],
            ["Trần Minh Đức", "T002"],
        ],
        price: 1499000,
        compareAtPrice: 1999000,
        rating: 4.8,
        totalVote: 245,
        target: [
            "Người mới bắt đầu học lập trình",
            "Sinh viên CNTT",
            "Người muốn chuyển nghề sang lập trình",
        ],
        sumary: [
            "Hiểu sâu về HTML, CSS và JavaScript",
            "Xây dựng website responsive",
            "Làm chủ React.js và Node.js",
            "Deploy ứng dụng thực tế",
        ],
        studentList: [],
        studentLimit: 100,
        appliedNumber: 85,
        currentStudent: 72,
        coverIMG: "/web-dev.jpg",
        startDate: "15 01 2024",
        endDate: "15 04 2024",
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
                schedule: ["Thứ 2", "19:30 - 21:30"],
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
                schedule: ["Thứ 4", "19:30 - 21:30"],
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
                schedule: ["Thứ 2", "19:30 - 21:30"],
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
                schedule: ["Thứ 4", "19:30 - 21:30"],
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
                schedule: ["Thứ 2", "19:30 - 21:30"],
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
    {
        courseID: "3",
        name: "UI/UX Design Masterclass",
        description:
            "Học thiết kế giao diện người dùng chuyên nghiệp với Figma và Adobe XD",
        classes: [],
        teachers: [
            ["Lê Thị Mai", "T004"],
            ["Phạm Văn Bình", "T005"],
        ],
        price: 899000,
        compareAtPrice: 1299000,
        rating: 4.7,
        totalVote: 89,
        target: [
            "Người mới bắt đầu học UI/UX",
            "Graphic Designer",
            "Product Manager",
        ],
        sumary: [
            "Nguyên lý thiết kế UI/UX",
            "Thành thạo Figma",
            "Design System",
            "Portfolio thực tế",
        ],
        studentList: [],
        studentLimit: 60,
        appliedNumber: 45,
        currentStudent: 40,
        coverIMG: "/uiux.jpg",
        startDate: "10 02 2024",
        endDate: "10 05 2024",
    },
    {
        courseID: "4",
        name: "Advanced React & NextJS Development",
        description:
            "Xây dựng ứng dụng web hiện đại với React 18, NextJS 14 và TypeScript",
        classes: [],
        teachers: [["Alex Johnson", "T006"]],
        price: 1799000,
        compareAtPrice: 2299000,
        rating: 4.9,
        totalVote: 156,
        target: [
            "React Developer",
            "Frontend Developer",
            "Fullstack Developer",
        ],
        sumary: [
            "React 18 new features",
            "Server Components",
            "NextJS App Router",
            "Performance Optimization",
        ],
        studentList: [],
        studentLimit: 80,
        appliedNumber: 65,
        currentStudent: 58,
        coverIMG: "/react-next.jpg",
        startDate: "20 02 2024",
        endDate: "20 05 2024",
    },
    {
        courseID: "5",
        name: "DevOps & Cloud Engineering",
        description: "Làm chủ CI/CD, Docker, Kubernetes và AWS Cloud",
        classes: [],
        teachers: [
            ["David Nguyen", "T007"],
            ["Maria Garcia", "T008"],
        ],
        price: 2999000,
        compareAtPrice: 3499000,
        rating: 4.8,
        totalVote: 92,
        target: [
            "Backend Developer",
            "System Administrator",
            "DevOps Engineer",
        ],
        sumary: [
            "CI/CD Pipeline",
            "Container Orchestration",
            "Cloud Architecture",
            "Infrastructure as Code",
        ],
        studentList: [],
        studentLimit: 40,
        appliedNumber: 35,
        currentStudent: 32,
        coverIMG: "/devops.jpg",
        startDate: "05 03 2024",
        endDate: "05 06 2024",
    },
];

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
    const [course, setCourse] = useState<Course | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setIsLoading(true);
                // Simulated API call
                await new Promise((resolve) => setTimeout(resolve, 1000));
                // Use your sample data here
                const foundCourse = sampleCourses.find(
                    (c) => c.courseID === String(params.courseID) // Convert ID to string for comparison
                );
                setCourse(foundCourse || null);
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
                    <p className="text-gray-600 mb-4">{course.description}</p>

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
                                {course.currentStudent}/{course.studentLimit}
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
                                                        <a
                                                            href={
                                                                classItem.meeting
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                                        >
                                                            <Video className="w-4 h-4" />
                                                            Tham gia lớp học
                                                        </a>
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
                            Đăng ký ngay
                        </button>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Users className="w-5 h-5 text-blue-500" />
                                <span>
                                    {course.currentStudent} học viên đã đăng ký
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
    );
}
