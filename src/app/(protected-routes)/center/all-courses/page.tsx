"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
    Search,
    Star,
    Users,
    DollarSign,
    Sparkles,
    Filter,
    X,
    Calendar,
} from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import debounce from "lodash/debounce";
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

interface FilterState {
    teacherName: string;
    priceFrom: string;
    priceTo: string;
    minRating: string;
    minStudents: string;
}

type SortOption = "price-asc" | "price-desc" | "rating-desc" | "students-desc";

const AllCourses: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [formInputs, setFormInputs] = useState<FilterState>({
        teacherName: "",
        priceFrom: "",
        priceTo: "",
        minRating: "",
        minStudents: "",
    });

    const [activeFilters, setActiveFilters] = useState<FilterState>({
        teacherName: "",
        priceFrom: "",
        priceTo: "",
        minRating: "",
        minStudents: "",
    });

    const [sortBy, setSortBy] = useState<SortOption>("rating-desc");

    useEffect(() => {
        const fetchCourses = async (): Promise<void> => {
            try {
                setIsLoading(true);
                setTimeout(() => {
                    setCourses([
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
                            coverIMG: "/logo.jpg",
                            startDate: "15 01 2024",
                            endDate: "15 04 2024",
                        },
                        {
                            courseID: "2",
                            name: "Data Science và Machine Learning cơ bản",
                            description:
                                "Khám phá thế giới AI và ML với Python, NumPy, Pandas và Scikit-learn",
                            classes: [],
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
                            coverIMG: "/logo.jpg",
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
                            coverIMG: "/logo.jpg",
                            startDate: "20 02 2024",
                            endDate: "20 05 2024",
                        },
                        {
                            courseID: "5",
                            name: "DevOps & Cloud Engineering",
                            description:
                                "Làm chủ CI/CD, Docker, Kubernetes và AWS Cloud",
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
                            coverIMG: "/logo.jpg",
                            startDate: "05 03 2024",
                            endDate: "05 06 2024",
                        },
                    ]);
                    setIsLoading(false);
                }, 1000);
            } catch (error) {
                console.error("Error fetching courses:", error);
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const { name, value } = e.target;
        setFormInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numericValue = value.replace(/\D/g, "");
        handleInputChange({
            ...e,
            target: { ...e.target, name, value: numericValue },
        });
    };

    const handleSearch = useCallback(
        (e?: React.FormEvent) => {
            e?.preventDefault();
            setActiveFilters(formInputs);
        },
        [formInputs]
    );

    const debouncedSearch = useMemo(
        () =>
            debounce(() => {
                handleSearch();
            }, 1000),
        [handleSearch]
    );

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const clearFilters = () => {
        const emptyFilters = {
            teacherName: "",
            priceFrom: "",
            priceTo: "",
            minRating: "",
            minStudents: "",
        };
        setFormInputs(emptyFilters);
        setActiveFilters(emptyFilters);
        setSortBy("rating-desc");
    };

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    const filteredAndSortedCourses = useMemo(() => {
        return courses
            .filter((course) => {
                const teacherMatches =
                    !activeFilters.teacherName ||
                    course.teachers.some((teacher) =>
                        teacher[0]
                            .toLowerCase()
                            .includes(activeFilters.teacherName.toLowerCase())
                    );

                return (
                    teacherMatches &&
                    (!activeFilters.priceFrom ||
                        course.price >= Number(activeFilters.priceFrom)) &&
                    (!activeFilters.priceTo ||
                        course.price <= Number(activeFilters.priceTo)) &&
                    (!activeFilters.minRating ||
                        course.rating >= Number(activeFilters.minRating)) &&
                    (!activeFilters.minStudents ||
                        course.currentStudent >=
                            Number(activeFilters.minStudents))
                );
            })
            .sort((a, b) => {
                switch (sortBy) {
                    case "price-asc":
                        return a.price - b.price;
                    case "price-desc":
                        return b.price - a.price;
                    case "rating-desc":
                        return b.rating - a.rating;
                    case "students-desc":
                        return b.currentStudent - a.currentStudent;
                    default:
                        return 0;
                }
            });
    }, [courses, activeFilters, sortBy]);

    const LoadingSkeleton = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                    key={i}
                    className="bg-white rounded-lg overflow-hidden border border-gray-200"
                >
                    <div className="w-full h-32 bg-gray-200 animate-pulse" />
                    <div className="p-3 space-y-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
                        <div className="flex gap-2">
                            <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                            <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                            <div className="h-6 w-8 bg-gray-200 rounded animate-pulse" />
                        </div>
                        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                    </div>
                </div>
            ))}
        </div>
    );
    return (
        <div className="m-4 px-3 py-3 bg-gray-100 rounded-xl min-h-[87vh] flex flex-row gap-4">
            {/* Filters Panel */}
            <form
                onSubmit={handleSearch}
                className="bg-white px-4 py-3 rounded-lg w-[280px] shadow-sm border border-gray-200"
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5">
                        <Filter className="w-4 h-4 text-blue-600" />
                        <h2 className="font-semibold text-base text-blue-600">
                            Bộ lọc tìm kiếm
                        </h2>
                    </div>
                    {Object.values(activeFilters).some((v) => v !== "") && (
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                        >
                            <X className="w-4 h-4" />
                            Xóa bộ lọc
                        </button>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="relative group">
                        <input
                            type="text"
                            name="teacherName"
                            value={formInputs.teacherName}
                            onChange={handleInputChange}
                            placeholder="Tên giảng viên"
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                        />
                        <Search className="absolute right-2.5 top-2.5 w-4 h-4 text-gray-400" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                            <DollarSign className="w-3.5 h-3.5 text-blue-500" />
                            Giá khóa học
                        </label>
                        <div className="flex items-center gap-2">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    name="priceFrom"
                                    value={formInputs.priceFrom}
                                    onChange={handlePriceInput}
                                    placeholder="Từ"
                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                                />
                                <span className="absolute right-2 top-2 text-xs text-gray-400">
                                    đ
                                </span>
                            </div>
                            <span className="text-gray-400">-</span>
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    name="priceTo"
                                    value={formInputs.priceTo}
                                    onChange={handlePriceInput}
                                    placeholder="Đến"
                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                                />
                                <span className="absolute right-2 top-2 text-xs text-gray-400">
                                    đ
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <input
                            type="number"
                            name="minRating"
                            value={formInputs.minRating}
                            onChange={handleInputChange}
                            placeholder="Đánh giá từ số sao"
                            min="0"
                            max="5"
                            step="0.1"
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                        />
                        <Star className="absolute right-2.5 top-2.5 w-4 h-4 text-gray-400" />
                    </div>

                    <div className="relative">
                        <input
                            type="number"
                            name="minStudents"
                            value={formInputs.minStudents}
                            onChange={handleInputChange}
                            placeholder="Số lượng học sinh tối thiểu"
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                        />
                        <Users className="absolute right-2.5 top-2.5 w-4 h-4 text-gray-400" />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                        Áp dụng bộ lọc
                    </button>
                </div>
            </form>

            {/* Courses Grid */}
            <div className="flex-1 bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <h2 className="font-semibold text-base text-blue-600">
                            Tất cả khóa học ({filteredAndSortedCourses.length})
                        </h2>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Sắp xếp:</span>
                        <select
                            value={sortBy}
                            onChange={(e) =>
                                setSortBy(e.target.value as SortOption)
                            }
                            className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="rating-desc">
                                Đánh giá cao nhất
                            </option>
                            <option value="students-desc">
                                Học viên nhiều nhất
                            </option>
                            <option value="price-asc">Giá thấp đến cao</option>
                            <option value="price-desc">Giá cao đến thấp</option>
                        </select>
                    </div>
                </div>

                {isLoading ? (
                    <LoadingSkeleton />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredAndSortedCourses.map((course) => (
                            <Link
                                href={`/course-info/${course.courseID}`}
                                key={course.courseID}
                                className="group relative bg-white rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-200"
                            >
                                <div className="relative">
                                    <img
                                        src={course.coverIMG}
                                        alt={course.name}
                                        className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    {course.compareAtPrice > course.price && (
                                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                            Giảm{" "}
                                            {Math.round(
                                                ((course.compareAtPrice -
                                                    course.price) /
                                                    course.compareAtPrice) *
                                                    100
                                            )}
                                            %
                                        </div>
                                    )}
                                </div>
                                <div className="p-3">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <h3 className="font-medium text-sm mb-1.5 text-gray-800 line-clamp-2 text-left">
                                                    {course.name}
                                                </h3>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{course.name}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>

                                    <p className="text-xs text-gray-600 mb-2 flex items-center gap-1.5">
                                        <span className="w-4 h-4 rounded-full bg-gray-50 flex items-center justify-center">
                                            <Users className="w-3 h-3 text-gray-500" />
                                        </span>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <span className="line-clamp-1">
                                                        {course.teachers[0][0]}
                                                    </span>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>
                                                        {course.teachers
                                                            .map((t) => t[0])
                                                            .join(", ")}
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </p>

                                    <div className="flex items-center gap-2 mb-2">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded">
                                                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                        <span className="text-xs font-medium text-yellow-700">
                                                            {course.rating}
                                                        </span>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>
                                                        {course.totalVote} đánh
                                                        giá - {course.rating}/5
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <div className="flex items-center gap-1 bg-blue-50 px-1.5 py-0.5 rounded">
                                                        <Users className="w-3 h-3 text-blue-500" />
                                                        <span className="text-xs font-medium text-blue-700">
                                                            {
                                                                course.currentStudent
                                                            }
                                                        </span>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>
                                                        {course.currentStudent}/
                                                        {course.studentLimit}{" "}
                                                        học viên
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <div className="flex items-center gap-1 bg-green-50 px-1.5 py-0.5 rounded">
                                                        <Calendar className="w-3 h-3 text-green-500" />
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>
                                                        Từ {course.startDate}{" "}
                                                        đến {course.endDate}
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>

                                    <div className="text-sm font-semibold text-blue-600">
                                        {formatPrice(course.price)}
                                        {course.compareAtPrice >
                                            course.price && (
                                            <span className="ml-2 text-xs text-gray-400 line-through">
                                                {formatPrice(
                                                    course.compareAtPrice
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {!isLoading && filteredAndSortedCourses.length === 0 && (
                    <div className="text-center py-12">
                        <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto border border-gray-200">
                            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Không tìm thấy khóa học
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">
                                Không tìm thấy khóa học nào phù hợp với bộ lọc
                                hiện tại. Vui lòng thử điều chỉnh lại các tiêu
                                chí tìm kiếm.
                            </p>
                            <button
                                onClick={clearFilters}
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                            >
                                <X className="w-4 h-4" />
                                Xóa bộ lọc
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllCourses;
