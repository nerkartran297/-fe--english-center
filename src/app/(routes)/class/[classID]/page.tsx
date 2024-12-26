"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
    Calendar,
    Clock,
    Video,
    FileText,
    Users,
    CheckCircle,
    AlertCircle,
    ExternalLink,
} from "lucide-react";
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

export default function ClassDetail() {
    const params = useParams();
    const { user, isLoaded } = useUser();
    const [classData, setClassData] = useState<Class | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchClassData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `http://localhost:5000/api/class/${params.classID}?clerkUserID=${user.id}`
                );
                const data = await response.json();
                setClassData(data.classInfo);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching class:", error);
                setIsLoading(false);
            }
        };

        if (isLoaded && user) fetchClassData();
    }, [params.classID, user, isLoaded]);

    const LoadingSkeleton = () => (
        <div className="animate-pulse space-y-4">
            <div className="h-48 bg-gray-200 rounded-lg" />
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
    );

    if (isLoading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <LoadingSkeleton />
            </div>
        );
    }

    if (!classData) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Không tìm thấy lớp học
                    </h1>
                    <p className="text-gray-600">
                        Lớp học bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            {classData.name}
                        </h1>
                        <div className="flex items-center gap-4">
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    classData.isActive
                                        ? "bg-green-100 text-green-800"
                                        : "bg-yellow-100 text-yellow-800"
                                }`}
                            >
                                {classData.isActive
                                    ? "Đang diễn ra"
                                    : "Sắp diễn ra"}
                            </span>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar className="w-4 h-4" />
                                {classData.startDate} - {classData.endDate}
                            </div>
                        </div>
                    </div>
                    <a
                        href={classData.meeting}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Video className="w-4 h-4" />
                        Vào lớp học
                    </a>
                </div>

                {/* Schedule Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    {classData.schedule.map((scheduleItem, index) => {
                        const [day, startTime, endTime] =
                            scheduleItem.split(" ");

                        return (
                            <div
                                key={index}
                                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                            >
                                <div className="font-medium text-gray-900 mb-2">
                                    {day}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock className="w-4 h-4" />
                                    {startTime} - {endTime}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Progress Section */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Tiến độ học tập
                        </h2>
                        <div className="mb-4">
                            <div className="flex justify-between mb-2">
                                <span className="text-sm text-gray-600">
                                    Hoàn thành: {classData.progress}/
                                    {classData.lessonList.length} bài học
                                </span>
                                <span className="text-sm font-medium text-gray-900">
                                    {Math.round(
                                        (classData.progress /
                                            classData.lessonList.length) *
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
                                            (classData.progress /
                                                classData.lessonList.length) *
                                            100
                                        }%`,
                                    }}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            {classData.lessonList.map((lesson, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <CheckCircle
                                        className={`w-4 h-4 ${
                                            index < classData.progress
                                                ? "text-green-500"
                                                : "text-gray-300"
                                        }`}
                                    />
                                    <span
                                        className={`${
                                            index < classData.progress
                                                ? "text-gray-900"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        {lesson}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Nội dung bài học
                        </h2>
                        <div className="space-y-6">
                            {classData.description.map((section, index) => (
                                <div key={index} className="space-y-2">
                                    <h3 className="font-medium text-gray-900">
                                        Phần {index + 1}
                                    </h3>
                                    <ul className="list-disc list-inside space-y-1">
                                        {section.map((item, itemIndex) => (
                                            <li
                                                key={itemIndex}
                                                className="text-sm text-gray-600"
                                            >
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Teachers Section */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            Giảng viên
                        </h2>
                        <div className="space-y-4">
                            {classData.teachers.map(([name, id], index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                                >
                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                        <Users className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">
                                            {name}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            ID: {id}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Documents Section */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Tài liệu học tập
                        </h2>
                        <div className="space-y-3">
                            {classData.documents.map((doc, index) => (
                                <a
                                    key={index}
                                    href={doc}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <FileText className="w-4 h-4 text-blue-500" />
                                    <span className="text-sm text-gray-900">
                                        Document {index + 1}
                                    </span>
                                    <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
