"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
    Upload,
    CheckCircle,
    AlertCircle,
    Info,
    Copy,
    ArrowRight,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

interface Course {
    courseID: string;
    name: string;
    description: string;
    price: number;
    compareAtPrice: number;
    coverIMG: string;
}

export default function PurchaseCourse() {
    const params = useParams();
    const { isLoaded, user } = useUser();
    const [course, setCourse] = useState<Course | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Mock bank account information
    const bankInfo = {
        bankName: "Vietcombank",
        accountNumber: "1234567890",
        accountName: "CONG TY ABC",
        amount: course?.price || 0,
        content: `PAYMENT_${params.courseID}`,
    };

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                setIsLoading(true);

                const response = await fetch(
                    `http://localhost:5000/api/course-detail/${params.idCourse}`
                );
                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(
                        responseData.message || "Failed to fetch course."
                    );
                }

                const courseData = responseData.course;
                const formattedCourse = {
                    courseID: courseData.courseID,
                    name: courseData.name,
                    description: courseData.description,
                    price: courseData.price,
                    compareAtPrice: courseData.compareAtPrice,
                    coverIMG: courseData.coverIMG,
                };

                setCourse(formattedCourse);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching course:", error);
                setIsLoading(false);
                setError("Failed to load course details");
            }
        };

        fetchCourseDetails();
    }, [params.idCourse]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const fileUrl = URL.createObjectURL(file);
            setPreviewUrl(fileUrl);
            setError(null);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    // PurchaseCourse.js
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!selectedFile) {
            setError("Please upload payment proof");
            return;
        }

        try {
            if (isLoaded && user) {
                console.log("log");
                setIsSubmitting(true);
                setError(null);

                const formData = new FormData();
                formData.append("payProof", selectedFile);
                formData.append("clerkUserID", user.id);

                const response = await fetch(
                    `http://localhost:5000/api/purchase-course/${params.idCourse}`,
                    {
                        method: "PUT",
                        body: formData,
                        credentials: "include",
                    }
                );

                const data = await response.json();

                if (data.error) {
                    setError(data.error);
                } else {
                    setSuccessMessage("Purchase course successfully");
                }
            } else {
                console.log("log in");
            }
        } catch (error) {
            setError("Failed to submit payment proof. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
        );
    }

    if (!course) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        Could not find the requested course.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {course.name}
            </h1>
            <p className="text-gray-600 mb-8">
                Complete your course enrollment
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Payment Instructions */}
                <div className="space-y-6">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Payment Information
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-500">
                                    Amount
                                </label>
                                <div className="text-2xl font-bold text-blue-600">
                                    {formatPrice(course.price)}
                                </div>
                                {course.compareAtPrice > course.price && (
                                    <div className="text-sm text-gray-500 line-through">
                                        {formatPrice(course.compareAtPrice)}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="text-sm text-gray-500">
                                    Bank Details
                                </label>
                                <div className="space-y-2">
                                    {Object.entries(bankInfo).map(
                                        ([key, value]) => (
                                            <div
                                                key={key}
                                                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                                            >
                                                <span className="text-sm text-gray-600 capitalize">
                                                    {key
                                                        .replace(
                                                            /([A-Z])/g,
                                                            " $1"
                                                        )
                                                        .trim()}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">
                                                        {value}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            copyToClipboard(
                                                                String(value)
                                                            )
                                                        }
                                                        className="text-blue-600 hover:text-blue-700"
                                                    >
                                                        <Copy className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>Payment Instructions</AlertTitle>
                        <AlertDescription>
                            <ol className="list-decimal list-inside space-y-2 mt-2">
                                <li>
                                    Transfer the exact amount using the
                                    information above
                                </li>
                                <li>
                                    Use the provided payment content for
                                    reference
                                </li>
                                <li>
                                    Take a screenshot or photo of your payment
                                    proof
                                </li>
                                <li>Upload the proof below and submit</li>
                            </ol>
                        </AlertDescription>
                    </Alert>
                </div>

                {/* Upload Payment Proof */}
                <div className="space-y-6">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white rounded-lg border border-gray-200 p-6"
                    >
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Upload Payment Proof
                        </h2>

                        <div className="space-y-4">
                            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
                                <input
                                    type="file"
                                    id="paymentProof"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="paymentProof"
                                    className="flex flex-col items-center justify-center cursor-pointer"
                                >
                                    {previewUrl ? (
                                        <Image
                                            src={previewUrl}
                                            alt="Payment proof preview"
                                            className="max-h-48 rounded-lg"
                                            height={48}
                                            width={48}
                                        />
                                    ) : (
                                        <>
                                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                            <span className="text-sm text-gray-500">
                                                Click to upload payment proof
                                            </span>
                                        </>
                                    )}
                                </label>
                            </div>

                            {error && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            {successMessage && (
                                <Alert className="bg-green-50 text-green-800 border-green-200">
                                    <CheckCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        {successMessage}
                                    </AlertDescription>
                                </Alert>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting || !selectedFile}
                                className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-medium ${
                                    isSubmitting || !selectedFile
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700"
                                }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        Submit Payment Proof
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
