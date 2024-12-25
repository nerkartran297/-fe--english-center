import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <div className="min-h-[250px] border border-gray-200 p-8 flex flex-row justify-between w-full py-8 bg-white">
            <div className="px-16 w-[20vw] flex flex-col justify-center items-center">
                <Link href="/">
                    <Image
                        src="/logo.jpg"
                        alt="logo"
                        width={160}
                        height={160}
                        className="rounded-md"
                    />
                </Link>
                <div className="font-semibold mt-4 text-center">
                    English Center ®️
                </div>
                <div className="mt-4 px-4 text-center text-[15px]">
                    Đảm bảo chất lượng giảng dạy hàng đầu tại Việt Nam!
                </div>
            </div>
            <div className="flex flex-row justify-between w-[50vw]">
                <div className="px-8 flex flex-col justify-start items-start w-[20vw]">
                    <div className="font-semibold text-center">
                        Các cơ sở của chúng tôi
                    </div>
                    <div className="mt-4 text-justify text-[14px]">
                        - Cơ sở 1: 48 Lê Lợi, Tuy Hòa, Phú Yên
                    </div>
                    <div className="mt-1 text-justify text-[14px]">
                        - Cơ sở 2: 32 Nguyễn Trãi, Tây Sơn, Bình Định
                    </div>
                    <div className="mt-1 text-justify text-[14px]">
                        - Cơ sở 3: 01 Xa Lộ Hà Nội, Quận 25, TP. HCM
                    </div>
                    <div className="mt-1 text-justify text-[14px]">
                        - Cơ sở 4: 32 Quốc Lộ 1K, Dĩ An, Bình Dương
                    </div>
                </div>
                <div className="px-8 flex flex-col justify-start items-start w-[15vw]">
                    <div className="font-semibold text-center">
                        Thông tin liên hệ
                    </div>
                    <div className="mt-4 text-justify text-[14px]">
                        - Số ĐT: 0914484221
                    </div>
                    <div className="mt-1 text-justify text-[14px]">
                        - Email: ec@ec.edu.vn
                    </div>
                    <div className="mt-1 text-justify text-[14px]">
                        - Zalo: 0914484221
                    </div>
                </div>
                <div className="px-8 flex flex-col justify-start items-start w-[12vw]">
                    <div className="font-semibold text-center">Mạng xã hội</div>
                    <div className="mt-4 text-justify text-[14px]">
                        - Facebook
                    </div>
                    <div className="mt-1 text-justify text-[14px]">
                        - Instagram
                    </div>
                    <div className="mt-1 text-justify text-[14px]">
                        - Youtube
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
