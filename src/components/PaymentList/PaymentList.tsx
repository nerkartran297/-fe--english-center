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
interface PaymentListProps {
    payments: Payment[];
    onSelectPayment: (payment: Payment) => void;
    selectedPaymentId?: string;
}

export default function PaymentList({
    payments,
    onSelectPayment,
    selectedPaymentId,
}: PaymentListProps) {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">
                    Payment Submissions ({payments.length})
                </h2>
            </div>

            <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
                {payments.map((payment) => (
                    <div
                        key={`${payment.studentId}-${payment.courseId}`}
                        className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors
                ${selectedPaymentId === payment.studentId ? "bg-indigo-50" : ""}
              `}
                        onClick={() => onSelectPayment(payment)}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-medium">
                                    {payment.studentName}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {payment.courseName}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium">${payment.amount}</p>
                                <span
                                    className={`
                    inline-block px-2 py-1 rounded-full text-xs
                    ${
                        payment.status === "pending" &&
                        "bg-yellow-100 text-yellow-800"
                    }
                    ${
                        payment.status === "approved" &&
                        "bg-green-100 text-green-800"
                    }
                    ${
                        payment.status === "rejected" &&
                        "bg-red-100 text-red-800"
                    }
                  `}
                                >
                                    {payment.status.charAt(0).toUpperCase() +
                                        payment.status.slice(1)}
                                </span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                            Submitted:{" "}
                            {new Date(
                                payment.submittedDate
                            ).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
