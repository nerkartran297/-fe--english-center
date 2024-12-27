import { useState } from "react";
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
interface PaymentDetailsProps {
    payment: Payment;
    onVerify: (
        paymentId: string,
        status: "approved" | "rejected",
        rejectionReason?: string
    ) => void;
    onClose: () => void;
}

export default function PaymentDetails({
    payment,
    onVerify,
    onClose,
}: PaymentDetailsProps) {
    const [rejectionReason, setRejectionReason] = useState("");
    const [isRejecting, setIsRejecting] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-6">
                <h2 className="text-lg font-semibold">Payment Details</h2>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700"
                >
                    ×
                </button>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-sm font-medium text-gray-500">
                        Student Information
                    </h3>
                    <p className="mt-1">{payment.studentName}</p>
                    <p className="text-sm text-gray-600">
                        ID: {payment.studentId}
                    </p>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-gray-500">
                        Course Information
                    </h3>
                    <p className="mt-1">{payment.courseName}</p>
                    <p className="text-sm text-gray-600">
                        ID: {payment.courseId}
                    </p>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-gray-500">
                        Payment Details
                    </h3>
                    <p className="mt-1 text-lg font-semibold">
                        ${payment.amount}
                    </p>
                    <p className="text-sm text-gray-600">
                        Submitted on{" "}
                        {new Date(payment.submittedDate).toLocaleDateString()}
                    </p>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-gray-500">
                        Payment Proof
                    </h3>
                    <div className="mt-2">
                        <img
                            src={payment.paycheckIMG}
                            alt="Payment proof"
                            className="w-full rounded-lg border"
                        />
                    </div>
                </div>

                {payment.status === "pending" && (
                    <div className="space-y-4">
                        {isRejecting ? (
                            <div className="space-y-2">
                                <textarea
                                    value={rejectionReason}
                                    onChange={(e) =>
                                        setRejectionReason(e.target.value)
                                    }
                                    placeholder="Please provide a reason for rejection..."
                                    className="w-full p-2 border rounded-lg"
                                    rows={3}
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            if (rejectionReason.trim()) {
                                                onVerify(
                                                    payment.studentId,
                                                    "rejected",
                                                    rejectionReason
                                                );
                                            }
                                        }}
                                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                    >
                                        Confirm Rejection
                                    </button>
                                    <button
                                        onClick={() => setIsRejecting(false)}
                                        className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={() =>
                                        onVerify(payment.studentId, "approved")
                                    }
                                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                >
                                    Approve Payment
                                </button>
                                <button
                                    onClick={() => setIsRejecting(true)}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                >
                                    Reject Payment
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {payment.status !== "pending" && (
                    <div
                        className={`p-4 rounded-lg ${
                            payment.status === "approved"
                                ? "bg-green-50"
                                : "bg-red-50"
                        }`}
                    >
                        <p className="font-medium">
                            {payment.status === "approved"
                                ? "Payment Approved"
                                : "Payment Rejected"}
                        </p>
                        {payment.verificationDate && (
                            <p className="text-sm">
                                on{" "}
                                {new Date(
                                    payment.verificationDate
                                ).toLocaleDateString()}
                            </p>
                        )}
                        {payment.rejectionReason && (
                            <p className="mt-2 text-sm">
                                Reason: {payment.rejectionReason}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
