"use client";
import GuideCard from "@/components/GuideCard/GuideCard";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react"; // Remove useEffect since we'll use button click

export default function Home() {
    const { user, isLoaded } = useUser(); // Add isLoaded to check if Clerk is ready
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const Guide = [
        {
            name: `Bước 1: Ghé thăm "Tất cả các khóa học"`,
            color: "rgb(138,198,243)",
            steps: [
                `Vào "Tất cả các khóa học"`,
                `Chọn khóa học bạn mong muốn và xem chi tiêt`,
                `Nhấn "Đăng ký"`,
                `Điền các thông tin và minh chứng chuyển khoản`,
                `Đợi kế toán xác nhận (trong vòng 15 phút)`,
            ],
            step: 1,
            linkTo: "/all-courses",
        },
        {
            name: `Bước 2: Ghé thăm "Các khóa học của bạn"`,
            color: "rgb(138,170,243)",
            steps: [
                `Bạn có thể xem chi tiết các khóa học`,
                `Bạn có thể xem bảng điểm`,
                `Đi đến các lớp học của khóa`,
                `Xem các thông tin về giảng viên`,
                `Xem các đánh giá của cựu học sinh`,
            ],
            step: 2,
            linkTo: "/your-courses",
        },
        {
            name: `Bước 3: Xem "Các lớp học của bạn"`,
            color: "rgb(243,138,138)",
            steps: [
                `Nhấn vào "Các lớp học của tôi"`,
                `Bạn có thể tải tài liệu học tập của lớp`,
                `Bạn có thể xem thông tin chi tiết lớp học`,
                `Bạn có thể xem lịch học và tiến độ học`,
                `Thông tin chi tiết của khóa học`,
            ],
            step: 3,
            linkTo: "/your-classes",
        },
        {
            name: `Bước 4: Xem "Thời gian biểu" của bạn`,
            color: "rgb(138,198,243)",
            steps: [
                `Nhấn vào "Thời gian biểu"`,
                `Chọn ngày bạn muốn xem "Thời gian biểu"`,
                `Bạn có thể xem được giờ học của mình`,
                `Bạn có thể xem phòng học của mình`,
                `Bạn có thể ấn vào để xem thông tin lớp học`,
            ],
            step: 4,
            linkTo: "/schedule",
        },
    ];
    return (
        <div className="m-4 px-4 py-4 bg-white rounded-xl min-h-[87vh] shadow-sm border border-gray-200">
            <SignedIn>
                {!isLoaded ? (
                    <div>Loading user...</div>
                ) : (
                    <>
                        <div className="text-lg font-semibold mt-8 text-center">
                            Chào mừng bạn đến với English Center!
                        </div>

                        <div className="mt-8 text-center flex flex-col justify-center items-center">
                            Hãy để tôi làm hướng dẫn viên cho bạn đến với
                            English Center nhé!
                            <div className="grid grid-cols-2 gap-16 mt-16 items-start w-max">
                                {Guide.map((guide) => (
                                    <GuideCard
                                        key={guide.step}
                                        name={guide.name}
                                        steps={guide.steps}
                                        step={guide.step}
                                        color={guide.color}
                                        linkTo={guide.linkTo}
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </SignedIn>
            <SignedOut>
                <Image
                    src="/banner.jpg"
                    alt="banner"
                    width={1200}
                    height={500}
                    className="w-full rounded-xl"
                />
            </SignedOut>
        </div>
    );
}
