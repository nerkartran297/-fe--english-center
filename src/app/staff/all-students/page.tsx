"use client";
import React, { useState, useEffect } from "react";
import {
    Search,
    GraduationCap,
    Calendar,
    CheckCircle,
    XCircle,
    ExternalLink,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface UserResponse {
    userRole: "student" | "teacher" | "accountant" | "manager" | "admin";
    mongoID: string;
    isActivated: boolean;
}

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

interface Student {
    clerkUserId: string;
    userRole: "student" | "teacher" | "accountant" | "manager" | "admin";
    mongoID: string;
    isActivated: boolean;
    courses: CourseInfo[];
    createdAt: Date;
}

export default function AllStudents() {
    const { isLoaded, user } = useUser();
    const [students, setStudents] = useState<Student[]>([]);
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(
        null
    );

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCourse, setSelectedCourse] = useState<string>("");
    const [availableCourses, setAvailableCourses] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `http://localhost:5000/api/all-students?clerkUserID=${user.id}`
                );

                const data = await response.json();

                setStudents(data);
                // Extract unique course IDs
                const courses = Array.from(
                    new Set(
                        data.forEach((student: any) =>
                            student.courses.map(
                                (course: any) => course.courseID
                            )
                        )
                    )
                );
                setAvailableCourses(courses);
                setFilteredStudents(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching students:", error);
                setIsLoading(false);
            }
        };

        const getUserRole = async (): Promise<UserResponse> => {
            const response = await fetch(
                `http://localhost:5000/api/get-role?clerkUserID=${user.id}`
            );

            return response.json();
        };

        if (isLoaded && user) {
            getUserRole().then((role) => {
                if (
                    role.userRole !== "manager" &&
                    role.userRole !== "accountant" &&
                    role.userRole !== "admin"
                )
                    router.push("/");
                else fetchData();
            });
        }
    }, [isLoaded, user]);

    useEffect(() => {
        const filtered = students.filter((student) => {
            const matchesSearch = student.mongoID
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const matchesCourse = selectedCourse
                ? student.courses.some(
                      (course) => course.courseID === selectedCourse
                  )
                : true;
            return matchesSearch && matchesCourse;
        });
        setFilteredStudents(filtered);
    }, [searchTerm, selectedCourse, students]);

    const LoadingSkeleton = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                    key={i}
                    className="bg-white p-6 rounded-lg border animate-pulse"
                >
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
            ))}
        </div>
    );

    const StudentCard = ({ student }: { student: Student }) => (
        <div
            onClick={() => setSelectedStudent(student)}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 cursor-pointer transition-colors"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-medium text-gray-900">
                        ID: {student.mongoID}
                    </h3>
                    <p className="text-sm text-gray-500">
                        Joined:{" "}
                        {new Date(student.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                        student.isActivated
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                    }`}
                >
                    {student.isActivated ? "Active" : "Inactive"}
                </span>
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <GraduationCap className="w-4 h-4" />
                    {student.courses.length} Courses
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {student.courses[0]?.enrollDate || "No enrollment"}
                </div>
            </div>
        </div>
    );

    const StudentDetailsModal = () => {
        if (!selectedStudent) return null;

        return (
            <Dialog
                open={!!selectedStudent}
                onOpenChange={() => setSelectedStudent(null)}
            >
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Student Information</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                        {/* Basic Info */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Student ID
                                    </p>
                                    <p className="font-medium">
                                        {selectedStudent.mongoID}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Status
                                    </p>
                                    <span
                                        className={`inline-flex items-center ${
                                            selectedStudent.isActivated
                                                ? "text-green-700"
                                                : "text-red-700"
                                        }`}
                                    >
                                        {selectedStudent.isActivated ? (
                                            <CheckCircle className="w-4 h-4 mr-1" />
                                        ) : (
                                            <XCircle className="w-4 h-4 mr-1" />
                                        )}
                                        {selectedStudent.isActivated
                                            ? "Active"
                                            : "Inactive"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Courses */}
                        <div className="space-y-4">
                            <h3 className="font-medium text-gray-900">
                                Enrolled Courses
                            </h3>
                            {selectedStudent.courses.map((course, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 rounded-lg p-4 space-y-4"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-medium text-gray-900">
                                                Course ID: {course.courseID}
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                Enrolled: {course.enrollDate}
                                            </p>
                                        </div>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                course.isPaid
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                            }`}
                                        >
                                            {course.isPaid
                                                ? "Paid"
                                                : "Pending Payment"}
                                        </span>
                                    </div>

                                    {/* Scores */}
                                    {course.scores.length > 0 && (
                                        <div>
                                            <h5 className="font-medium text-sm text-gray-900 mb-2">
                                                Assignments
                                            </h5>
                                            <div className="space-y-2">
                                                {course.scores.map(
                                                    (score, scoreIndex) => (
                                                        <div
                                                            key={scoreIndex}
                                                            className="bg-gray-50 rounded p-3"
                                                        >
                                                            <div className="flex justify-between mb-1">
                                                                <span className="text-sm font-medium">
                                                                    {
                                                                        score.description
                                                                    }
                                                                </span>
                                                                <span className="text-sm font-medium text-blue-600">
                                                                    {
                                                                        score.score
                                                                    }
                                                                    /10
                                                                </span>
                                                            </div>
                                                            {score.comment && (
                                                                <p className="text-sm text-gray-500">
                                                                    {
                                                                        score.comment
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Payment Proof */}
                                    {course.paycheckIMG && (
                                        <div>
                                            <h5 className="font-medium text-sm text-gray-900 mb-2">
                                                Payment Proof
                                            </h5>
                                            <a
                                                href={course.paycheckIMG}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                                            >
                                                View Receipt
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    All Students
                </h1>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search by Student ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 pl-10 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                        />
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    </div>

                    <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className="px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="">All Courses</option>
                        {availableCourses.map((course) => (
                            <option key={course} value={course}>
                                {course}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Students Grid */}
            {isLoading ? (
                <LoadingSkeleton />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredStudents.map((student) => (
                        <StudentCard key={student.mongoID} student={student} />
                    ))}
                </div>
            )}

            {/* Student Details Modal */}
            <StudentDetailsModal />
        </div>
    );
}
