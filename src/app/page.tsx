"use client";
import GuideCard from "@/components/GuideCard/GuideCard";
import Link from "next/link";

export default function Home() {
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
            linkTo: "/center/all-courses",
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
            linkTo: "/center/your-courses",
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
            linkTo: "/center/your-classes",
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
            linkTo: "/center/schedule",
        },
    ];
    return (
        <div className="m-8 px-8 py-4 bg-gray-100 rounded-2xl min-h-[87vh]">
            <div className="text-lg font-semibold mt-8 text-center">
                Chào mừng bạn đến với English Center!
            </div>
            <div className="mt-8 text-center flex flex-col justify-center items-center">
                Hãy để tôi làm hướng dẫn viên cho bạn đến với English Center
                nhé!
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
        </div>
    );
}
