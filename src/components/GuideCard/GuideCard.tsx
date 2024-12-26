import Link from "next/link";
import React from "react";

const GuideCard = ({
    name,
    color,
    steps,
    step,
    linkTo,
}: {
    name: string;
    color: string;
    steps: string[];
    step: number;
    linkTo: string;
}) => {
    return (
        <div
            className={`flex flex-col relative w-[500px] items-start px-8 py-4 rounded-2xl shadow-md`}
            style={{ background: color }}
        >
            <Link href={`${linkTo}`} className="font-semibold">
                {name}
            </Link>
            <div className="mt-3 text-[15px]  text-gray-800"> Hướng dẫn:</div>
            <div className="text-[15px] ml-8 flex flex-col w-max items-start  text-gray-800">
                {steps.map((stepValue, index) => (
                    <p key={index}>{`- ${stepValue}`}</p>
                ))}
            </div>
            <div className="cursor-default flex items-center justify-center absolute top-3 right-3 text-white font-bold text-[30px] border-[2px] rounded-[50px] p-2 w-[50px] h-[50px]">
                {step}
            </div>
        </div>
    );
};

export default GuideCard;
