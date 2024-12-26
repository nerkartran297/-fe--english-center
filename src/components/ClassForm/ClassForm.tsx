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

interface ClassFormProps {
    classData?: Class; // Optional for new class creation
    courseID: string;
    onSubmit: (classData: Class) => void;
    onCancel: () => void;
}

export default function ClassForm({
    classData,
    courseID,
    onSubmit,
    onCancel,
}: ClassFormProps) {
    const [formData, setFormData] = useState<Class>(
        classData || {
            classID: "",
            schedule: [],
            name: "",
            description: [[]],
            teachers: [[]],
            lessonList: [],
            progress: 1,
            documents: [],
            isActive: true,
            meeting: "",
            coverIMG: "",
            startDate: "",
            endDate: "",
        }
    );

    const [newSchedule, setNewSchedule] = useState("");
    const [newLesson, setNewLesson] = useState("");
    const [newDocument, setNewDocument] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [currentTopicIndex, setCurrentTopicIndex] = useState(0);

    const handleChange = (field: keyof Class, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const addSchedule = () => {
        if (newSchedule.trim()) {
            setFormData((prev) => ({
                ...prev,
                schedule: [...prev.schedule, newSchedule.trim()],
            }));
            setNewSchedule("");
        }
    };

    const addLesson = () => {
        if (newLesson.trim()) {
            setFormData((prev) => ({
                ...prev,
                lessonList: [...prev.lessonList, newLesson.trim()],
            }));
            setNewLesson("");
        }
    };

    const addDocument = () => {
        if (newDocument.trim()) {
            setFormData((prev) => ({
                ...prev,
                documents: [...prev.documents, newDocument.trim()],
            }));
            setNewDocument("");
        }
    };

    const addDescription = () => {
        if (newDescription.trim()) {
            const updatedDescription = [...formData.description];
            if (!updatedDescription[currentTopicIndex]) {
                updatedDescription[currentTopicIndex] = [];
            }
            updatedDescription[currentTopicIndex].push(newDescription.trim());

            setFormData((prev) => ({
                ...prev,
                description: updatedDescription,
            }));
            setNewDescription("");
        }
    };

    const addNewTopic = () => {
        setFormData((prev) => ({
            ...prev,
            description: [...prev.description, []],
        }));
        setCurrentTopicIndex(formData.description.length);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if (classData) {
                const response = await fetch(
                    `http://localhost:5000/api/courses/${courseID}/classes/${classData.classID}`,
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
                    `http://localhost:5000/api/courses/${courseID}/classes`,
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
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg p-6 space-y-6"
        >
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">
                    {classData ? "Edit Class" : "Create New Class"}
                </h2>
                <button
                    type="button"
                    onClick={onCancel}
                    className="text-gray-500 hover:text-gray-700"
                >
                    ×
                </button>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Class Name
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Schedule
                    </label>
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={newSchedule}
                            onChange={(e) => setNewSchedule(e.target.value)}
                            className="flex-1 rounded-lg border border-gray-300 p-2"
                            placeholder="e.g., Mon 09:00"
                        />
                        <button
                            type="button"
                            onClick={addSchedule}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.schedule.map((time, index) => (
                            <span
                                key={index}
                                className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                            >
                                {time}
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleChange(
                                            "schedule",
                                            formData.schedule.filter(
                                                (_, i) => i !== index
                                            )
                                        )
                                    }
                                    className="text-gray-500 hover:text-red-500 ml-1"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Course Content
                    </label>
                    <div className="space-y-4">
                        {formData.description.map((topic, topicIndex) => (
                            <div
                                key={topicIndex}
                                className="bg-gray-50 p-4 rounded-lg"
                            >
                                <h3 className="font-medium mb-2">
                                    Topic {topicIndex + 1}
                                </h3>
                                <ul className="list-disc list-inside space-y-1 mb-2">
                                    {topic.map((point, pointIndex) => (
                                        <li
                                            key={pointIndex}
                                            className="flex items-center justify-between"
                                        >
                                            <span>{point}</span>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newDescription = [
                                                        ...formData.description,
                                                    ];
                                                    newDescription[topicIndex] =
                                                        topic.filter(
                                                            (_, i) =>
                                                                i !== pointIndex
                                                        );
                                                    handleChange(
                                                        "description",
                                                        newDescription
                                                    );
                                                }}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                ×
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newDescription}
                                onChange={(e) =>
                                    setNewDescription(e.target.value)
                                }
                                className="flex-1 rounded-lg border border-gray-300 p-2"
                                placeholder="Add content point"
                            />
                            <button
                                type="button"
                                onClick={addDescription}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                            >
                                Add Point
                            </button>
                            <button
                                type="button"
                                onClick={addNewTopic}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                                New Topic
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Documents
                    </label>
                    <div className="flex gap-2 mb-2">
                        <input
                            type="url"
                            value={newDocument}
                            onChange={(e) => setNewDocument(e.target.value)}
                            className="flex-1 rounded-lg border border-gray-300 p-2"
                            placeholder="Document URL"
                        />
                        <button
                            type="button"
                            onClick={addDocument}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            Add
                        </button>
                    </div>
                    <ul className="space-y-2">
                        {formData.documents.map((doc, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-between bg-gray-50 p-2 rounded-lg"
                            >
                                <a
                                    href={doc}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    Document {index + 1}
                                </a>
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleChange(
                                            "documents",
                                            formData.documents.filter(
                                                (_, i) => i !== index
                                            )
                                        )
                                    }
                                    className="text-red-500 hover:text-red-700"
                                >
                                    ×
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                            className="w-full rounded-lg border border-gray-300 p-2"
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
                            className="w-full rounded-lg border border-gray-300 p-2"
                            placeholder="dd mm yyyy"
                            required
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) =>
                            handleChange("isActive", e.target.checked)
                        }
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label className="text-sm text-gray-700">
                        Active Class
                    </label>
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
                        {classData ? "Save Changes" : "Create Class"}
                    </button>
                </div>
            </div>
        </form>
    );
}
