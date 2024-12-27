"use client";

import { useState, useEffect } from "react";
import CourseList from "@/components/CourseList/CourseList";
import CourseForm from "@/components/CourseForm/CourseForm";
import ClassForm from "@/components/ClassForm/ClassForm";

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

const CourseManagement = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [selectedClass, setSelectedClass] = useState<Class | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingClass, setIsEditingClass] = useState(false);
    const [isCreatingCourse, setIsCreatingCourse] = useState(false);
    const [isCreatingClass, setIsCreatingClass] = useState(false);
    const [selectedCourseID, setSelectedCourseID] = useState<string | null>(
        null
    );

    // In CourseManagement.tsx
    const onNewClass = (course: Course) => {
        console.log("Selected course for new class:", course);

        if (!course || !course.courseID) {
            console.error("Invalid course object:", course);
            return;
        }

        setSelectedCourseID(course.courseID);
        setSelectedCourse(course);
        setIsCreatingClass(true);
        setIsEditing(false);
        setIsEditingClass(false);
        setSelectedClass(null);
    };

    // Add this useEffect to monitor selectedCourse changes
    useEffect(() => {
        console.log("Selected course updated:", selectedCourse);
    }, [selectedCourse]);

    const onSelectCourse = (course: any) => {
        setSelectedCourseID(course.courseID);
        setIsEditing(true);
        setIsCreatingCourse(false);
        setIsCreatingClass(false);
    };

    const handleUpdateCourse = (updatedCourse: Course) => {
        setCourses(
            courses.map((c) =>
                c.courseID === updatedCourse.courseID ? updatedCourse : c
            )
        );
        setSelectedCourse(null);
        setIsEditing(false);
    };

    const handleCreateCourse = (newCourse: Course) => {
        const {
            name,
            description,
            classes,
            price,
            compareAtPrice,
            target,
            sumary,
            studentLimit,
            coverIMG,
            startDate,
            endDate,
        } = newCourse;

        const data = {
            name,
            description,
            classes,
            price,
            compareAtPrice,
            target,
            sumary,
            studentLimit,
            coverIMG,
            startDate,
            endDate,
        };

        fetch("http://localhost:5000/api/add-course", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setCourses([...courses, data]);
                    setIsCreatingCourse(false);
                }
            })
            .catch((error) => console.error(error));
    };

    const handleUpdateClass = (updatedClass: Class) => {
        if (selectedCourse) {
            const updatedCourse = {
                ...selectedCourse,
                classes: selectedCourse.classes.map((c) =>
                    c.classID === updatedClass.classID ? updatedClass : c
                ),
            };
            handleUpdateCourse(updatedCourse);
            setSelectedClass(null);
            setIsEditingClass(false);
        }
    };

    const handleCreateClass = async (newClass: Class) => {
        // Use courseID directly since we know it's set
        const courseID = selectedCourseID;

        if (!courseID) {
            console.error("No course selected");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5000/api/courses/${courseID}/classes`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newClass),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            setCourses((prevCourses) =>
                prevCourses.map((course) => {
                    if (course.courseID === courseID) {
                        return {
                            ...course,
                            classes: [...course.classes, data],
                        };
                    }
                    return course;
                })
            );

            setIsCreatingClass(false);
        } catch (error) {
            console.error("Error creating class:", error);
        }
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/courses"
                );
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCourses();
    }, []);

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Course Management</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CourseList
                    courses={courses}
                    onSelectCourse={(course) => {
                        if (!course) return;
                        setSelectedCourse(course);
                        setSelectedCourseID(course.courseID);
                        setIsEditing(true);
                        setIsCreatingCourse(false);
                        setIsCreatingClass(false);
                    }}
                    onSelectClass={(course, classItem) => {
                        if (!course || !classItem) return;
                        setSelectedCourse(course);
                        setSelectedCourseID(course.courseID);
                        setSelectedClass(classItem);
                        setIsEditingClass(true);
                        setIsCreatingClass(false);
                    }}
                    onNewCourse={() => {
                        setIsCreatingCourse(true);
                        setIsEditing(false);
                        setIsEditingClass(false);
                        setSelectedCourse(null);
                        setSelectedCourseID(null);
                        setSelectedClass(null);
                    }}
                    onNewClass={(course) => {
                        if (!course) return;
                        onNewClass(course);
                    }}
                />

                <div className="space-y-6">
                    {isCreatingCourse && (
                        <CourseForm
                            onSubmit={handleCreateCourse}
                            onCancel={() => setIsCreatingCourse(false)}
                        />
                    )}

                    {isEditing && selectedCourse && (
                        <CourseForm
                            course={selectedCourse}
                            onSubmit={handleUpdateCourse}
                            onCancel={() => {
                                setSelectedCourse(null);
                                setIsEditing(false);
                            }}
                        />
                    )}

                    {isCreatingClass &&
                        selectedCourseID && ( // Check for selectedCourseID
                            <ClassForm
                                courseID={selectedCourseID} // Pass courseID
                                onSubmit={handleCreateClass}
                                onCancel={() => setIsCreatingClass(false)}
                            />
                        )}

                    {isEditingClass &&
                        selectedClass &&
                        selectedCourseID && ( // Check for selectedCourseID
                            <ClassForm
                                classData={selectedClass}
                                courseID={selectedCourseID} // Pass courseID
                                onSubmit={handleUpdateClass}
                                onCancel={() => {
                                    setSelectedClass(null);
                                    setIsEditingClass(false);
                                }}
                            />
                        )}
                </div>
            </div>
        </div>
    );
};

export default CourseManagement;
