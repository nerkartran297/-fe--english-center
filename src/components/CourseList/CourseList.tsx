"use client";

import { useState, useEffect } from "react";
import { PlusIcon, PencilIcon, StarIcon, ChevronRightIcon } from "lucide-react";

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

interface CourseListProps {
    courses: Course[];
    onSelectCourse: (course: Course) => void;
    onSelectClass: (course: Course, classItem: Class) => void;
    onNewCourse: () => void;
    onNewClass: (course: Course) => void;
}

export default function CourseList({
    courses,
    onSelectCourse,
    onSelectClass,
    onNewCourse,
    onNewClass,
}: CourseListProps) {
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/courses"
                );
                const data = await response.json();
                // courses.forEach((c) => {
                //     // Do nothing here as we're using the courses prop
                // });
                setFetching(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCourses();
    }, []);

    if (fetching) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                    Courses ({courses.length})
                </h2>
                <button
                    onClick={onNewCourse}
                    className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                >
                    <PlusIcon className="w-4 h-4" />
                    New Course
                </button>
            </div>

            <div className="space-y-6">
                {courses.map((course) => (
                    <div
                        key={course.courseID}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                    >
                        <div className="relative">
                            <img
                                src={
                                    course.coverIMG || "/placeholder-course.jpg"
                                }
                                alt={course.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="absolute top-4 right-4 space-x-2">
                                <button
                                    onClick={() => onSelectCourse(course)}
                                    className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50"
                                >
                                    <PencilIcon className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        {course.name}
                                    </h3>
                                    <p className="text-gray-600 mt-1 line-clamp-2">
                                        {course.description}
                                    </p>
                                </div>
                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                    ${course.price}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                                <div>
                                    <p className="text-gray-500">Students</p>
                                    <p className="font-medium">
                                        {course.currentStudent}/
                                        {course.studentLimit}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Rating</p>
                                    <div className="flex items-center">
                                        <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
                                        <span className="font-medium">
                                            {course.rating}/5
                                        </span>
                                        <span className="text-gray-400 ml-1">
                                            ({course.totalVote})
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gray-500">Start Date</p>
                                    <p className="font-medium">
                                        {course.startDate}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500">End Date</p>
                                    <p className="font-medium">
                                        {course.endDate}
                                    </p>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="font-medium">
                                        Classes ({course.classes.length})
                                    </h4>
                                    <button
                                        onClick={() => onNewClass(course)}
                                        className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                                    >
                                        <PlusIcon className="w-4 h-4" />
                                        Add Class
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    {course.classes.map((classItem) => (
                                        <div
                                            key={classItem.classID}
                                            onClick={() =>
                                                onSelectClass(course, classItem)
                                            }
                                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg 
                                 hover:bg-gray-100 cursor-pointer transition-colors"
                                        >
                                            <div>
                                                <p className="font-medium">
                                                    {classItem.name}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {classItem.schedule.join(
                                                        " • "
                                                    )}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs
                            ${
                                classItem.isActive
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                            }`}
                                                >
                                                    {classItem.isActive
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>
                                                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
