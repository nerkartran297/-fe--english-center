"use client";

import { PlusIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

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

interface CourseFormProps {
    course?: Course; // Optional for new course creation
    onSubmit: (course: Course) => void;
    onCancel: () => void;
}

export default function CourseForm({
    course,
    onSubmit,
    onCancel,
}: CourseFormProps) {
    const [formData, setFormData] = useState<Course>(
        course || {
            courseID: "",
            name: "",
            description: "",
            classes: [],
            teachers: [[]],
            price: 0,
            compareAtPrice: 0,
            rating: 0,
            totalVote: 0,
            target: [],
            sumary: [],
            studentList: [],
            studentLimit: 20,
            appliedNumber: 0,
            currentStudent: 0,
            coverIMG: "",
            startDate: "",
            endDate: "",
        }
    );

    const [targets, setTargets] = useState("");
    const [summaryPoint, setSummaryPoint] = useState("");

    const handleChange = (field: keyof Course, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const addTarget = () => {
        if (targets.trim()) {
            setFormData((prev) => ({
                ...prev,
                target: [...prev.target, targets.trim()],
            }));
            setTargets("");
        }
    };

    const addSummaryPoint = () => {
        if (summaryPoint.trim()) {
            setFormData((prev) => ({
                ...prev,
                sumary: [...prev.sumary, summaryPoint.trim()],
            }));
            setSummaryPoint("");
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if (course) {
                const response = await fetch(
                    `http://localhost:5000/api/courses/${course.courseID}`,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData),
                    }
                );
                const data = await response.json();
                onSubmit(data);
            } else {
                const response = await fetch(
                    "http://localhost:5000/api/courses",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData),
                    }
                );
                const data = await response.json();
                onSubmit(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        // Rest of the form code remains the same
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg p-6 space-y-6"
        >
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">
                    {course ? "Edit Course" : "Create New Course"}
                </h2>
                <button
                    type="button"
                    onClick={onCancel}
                    className="text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cover Image URL
                    </label>
                    <input
                        type="url"
                        value={formData.coverIMG}
                        onChange={(e) =>
                            handleChange("coverIMG", e.target.value)
                        }
                        className="pl-4 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Course Name
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="pl-4 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        value={formData.description}
                        onChange={(e) =>
                            handleChange("description", e.target.value)
                        }
                        rows={3}
                        className="pl-4 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price ($)
                    </label>
                    <input
                        type="number"
                        value={formData.price}
                        onChange={(e) =>
                            handleChange("price", Number(e.target.value))
                        }
                        className="pl-4 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        min="0"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Compare Price ($)
                    </label>
                    <input
                        type="number"
                        value={formData.compareAtPrice}
                        onChange={(e) =>
                            handleChange(
                                "compareAtPrice",
                                Number(e.target.value)
                            )
                        }
                        className="pl-4 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        min="0"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 ">
                        Student Limit
                    </label>
                    <input
                        type="number"
                        value={formData.studentLimit}
                        onChange={(e) =>
                            handleChange("studentLimit", Number(e.target.value))
                        }
                        className="pl-4 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        min="1"
                        required
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Target Audience
                    </label>
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={targets}
                            onChange={(e) => setTargets(e.target.value)}
                            className="pl-4 flex-1 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            placeholder="Add target audience"
                        />
                        <button
                            type="button"
                            onClick={addTarget}
                            className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            <PlusIcon className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.target.map((t, index) => (
                            <span
                                key={index}
                                className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                            >
                                {t}
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleChange(
                                            "target",
                                            formData.target.filter(
                                                (_, i) => i !== index
                                            )
                                        )
                                    }
                                    className="text-indigo-600 hover:text-indigo-800"
                                >
                                    ✕
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Course Summary
                    </label>
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={summaryPoint}
                            onChange={(e) => setSummaryPoint(e.target.value)}
                            className="pl-4 flex-1 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            placeholder="Add summary point"
                        />
                        <button
                            type="button"
                            onClick={addSummaryPoint}
                            className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            <PlusIcon className="w-5 h-5" />
                        </button>
                    </div>
                    <ul className="space-y-2">
                        {formData.sumary.map((s, index) => (
                            <li
                                key={index}
                                className="pl-4 flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                            >
                                {s}
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleChange(
                                            "sumary",
                                            formData.sumary.filter(
                                                (_, i) => i !== index
                                            )
                                        )
                                    }
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                    </label>
                    <input
                        type="text"
                        value={formData.startDate}
                        onChange={(e) =>
                            handleChange("startDate", e.target.value)
                        }
                        className="pl-4 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        placeholder="dd mm yyyy"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date
                    </label>
                    <input
                        type="text"
                        value={formData.endDate}
                        onChange={(e) =>
                            handleChange("endDate", e.target.value)
                        }
                        className="pl-4 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        placeholder="dd mm yyyy"
                        required
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-6">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                    {course ? "Save Changes" : "Create Course"}
                </button>
            </div>
        </form>
    );
}
