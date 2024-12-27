"use client";

import { useState, useEffect } from "react";
import PaymentList from "@/components/PaymentList/PaymentList";
import PaymentDetails from "@/components/PaymentDetails/PaymentDetails";

interface Payment {
    studentId: string;
    studentName: string;
    courseId: string;
    courseName: string;
    paycheckIMG: string;
    isPaid: boolean;
    amount: number;
    submittedDate: string;
    status: "pending" | "approved" | "rejected";
    verificationDate?: string;
    verifiedBy?: string;
    rejectionReason?: string;
}
export const mockPayments: Payment[] = [
    {
        studentId: "STD001",
        studentName: "John Doe",
        courseId: "CRS001",
        courseName: "React Development",
        paycheckIMG:
            "https://inkythuatso.com/uploads/thumbnails/800/2023/03/hinh-anh-chuyen-tien-thanh-cong-vi-momo-1-07-12-32-36.jpg",
        isPaid: false,
        amount: 499.99,
        submittedDate: "2024-01-25",
        status: "pending",
    },
    {
        studentId: "STD002",
        studentName: "Jane Smith",
        courseId: "CRS002",
        courseName: "Node.js Advanced",
        paycheckIMG:
            "https://inkythuatso.com/uploads/thumbnails/800/2023/03/hinh-anh-chuyen-tien-thanh-cong-vi-momo-2-07-12-32-54.jpg",
        isPaid: true,
        amount: 699.99,
        submittedDate: "2024-01-24",
        status: "approved",
        verificationDate: "2024-01-25",
        verifiedBy: "ACC001",
    },
    {
        studentId: "STD003",
        studentName: "Bob Wilson",
        courseId: "CRS001",
        courseName: "React Development",
        paycheckIMG:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVEisLQBe32Tr1xtHh44vx7qV5ErQOIRHw0g&s",
        isPaid: false,
        amount: 499.99,
        submittedDate: "2024-01-23",
        status: "rejected",
        verificationDate: "2024-01-24",
        verifiedBy: "ACC001",
        rejectionReason: "Invalid payment proof - amount doesn't match",
    },
    {
        studentId: "STD004",
        studentName: "Alice Brown",
        courseId: "CRS003",
        courseName: "Python Basics",
        paycheckIMG:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvaA53u52i59XOsOOR7BFFVrOvvuR0xOsnXWBIkN6b1XW0XnIzXRhdKRkbLj47zICaMeg&usqp=CAU",
        isPaid: false,
        amount: 299.99,
        submittedDate: "2024-01-26",
        status: "pending",
    },
    {
        studentId: "STD005",
        studentName: "Charlie Davis",
        courseId: "CRS002",
        courseName: "Node.js Advanced",
        paycheckIMG:
            "https://images2.thanhnien.vn/528068263637045248/2023/3/19/chuyen-tien1-1679245570560559478699.jpg",
        isPaid: true,
        amount: 699.99,
        submittedDate: "2024-01-22",
        status: "approved",
        verificationDate: "2024-01-23",
        verifiedBy: "ACC002",
    },
];

export default function PaymentManagement() {
    const [payments, setPayments] = useState<Payment[]>(mockPayments);
    const [selectedPayment, setSelectedPayment] = useState<Payment | null>(
        null
    );

    const handleVerifyPayment = (
        paymentId: string,
        status: "approved" | "rejected",
        rejectionReason?: string
    ) => {
        setPayments((prevPayments) =>
            prevPayments.map((payment) => {
                if (payment.studentId === paymentId) {
                    return {
                        ...payment,
                        status,
                        isPaid: status === "approved",
                        verificationDate: new Date().toISOString(),
                        verifiedBy: "ACC001", // Mock accountant ID
                        rejectionReason,
                    };
                }
                return payment;
            })
        );
        setSelectedPayment(null);
    };
    // const [payments, setPayments] = useState<Payment[]>([]);
    // const [selectedPayment, setSelectedPayment] = useState<Payment | null>(
    //     null
    // );
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);

    // useEffect(() => {
    //     fetchPayments();
    // }, []);

    // const fetchPayments = async () => {
    //     try {
    //         const response = await fetch(
    //             "http://localhost:5000/api/staff/payments"
    //         );
    //         if (!response.ok) throw new Error("Failed to fetch payments");
    //         const data = await response.json();
    //         setPayments(data);
    //     } catch (err) {
    //         setError(
    //             err instanceof Error ? err.message : "Error fetching payments"
    //         );
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // const handleVerifyPayment = async (
    //     paymentId: string,
    //     status: "approved" | "rejected",
    //     rejectionReason?: string
    // ) => {
    //     try {
    //         const response = await fetch(
    //             `http://localhost:5000/api/staff/payments/${paymentId}/verify`,
    //             {
    //                 method: "PUT",
    //                 headers: { "Content-Type": "application/json" },
    //                 body: JSON.stringify({ status, rejectionReason }),
    //             }
    //         );

    //         if (!response.ok) throw new Error("Failed to verify payment");

    //         // Refresh payments list
    //         await fetchPayments();
    //         setSelectedPayment(null);
    //     } catch (err) {
    //         setError(
    //             err instanceof Error ? err.message : "Error verifying payment"
    //         );
    //     }
    // };

    // if (isLoading)
    //     return <div className="flex justify-center p-8">Loading...</div>;
    // if (error) return <div className="text-red-500 p-8">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">
                Payment Verification Dashboard
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PaymentList
                    payments={payments}
                    onSelectPayment={setSelectedPayment}
                    selectedPaymentId={selectedPayment?.studentId}
                />

                {selectedPayment && (
                    <PaymentDetails
                        payment={selectedPayment}
                        onVerify={handleVerifyPayment}
                        onClose={() => setSelectedPayment(null)}
                    />
                )}
            </div>
        </div>
    );
}
