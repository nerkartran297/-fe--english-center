"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Giảng viên",
        href: "/docs/primitives/alert-dialog",
        description:
            "Quy trình, tiêu chuẩn tuyển dụng giáo viên của English Center",
    },
    {
        title: "Kế toán",
        href: "/docs/primitives/hover-card",
        description:
            "Quy trình, tiêu chuẩn tuyển dụng kế toán cho English Center",
    },
    {
        title: "Nhân viên hỗ trợ học vụ",
        href: "/docs/primitives/progress",
        description:
            "Quy trình, tiêu chuẩn tuyển dụng nhân viên hỗ trợ học vụ cho English Center",
    },
    {
        title: "Quản lý",
        href: "/docs/primitives/scroll-area",
        description:
            "Quy trình, tiêu chuẩn tuyển dụng quản lý cho English Center",
    },
    {
        title: "Lập trình viên web",
        href: "/docs/primitives/tabs",
        description:
            "Quy trình, tiêu chuẩn tuyển dụng lập trình viên web cho English Center",
    },
    {
        title: "Các chính sách tại English Center",
        href: "/docs/primitives/tabs",
        description:
            "Các chính sách và ưu đãi dành cho nhân viên tại English Center",
    },
];

const myControllers: { title: string; href: string; description: string }[] = [
    {
        title: "Hướng dẫn",
        href: "/",
        description: "Quay về trang hướng dẫn sử dụng trang web trung tâm",
    },
    {
        title: "Các khóa học của trung tâm",
        href: "/all-courses",
        description: "Vào kho để xem tất cả các khóa học của trung tâm",
    },
    {
        title: "Các khóa học của bạn",
        href: "/your-courses",
        description: "Các khóa học bạn đã đăng ký, vào đây để xem chi tiết",
    },
    {
        title: "Các lớp học của bạn",
        href: "/your-classes",
        description: "Các lớp học được có từ khóa học bạn đã đăng ký",
    },
    {
        title: "Thời gian biểu",
        href: "/schedule",
        description: "Lịch của bạn: thời gian, địa điểm, lớp học, khóa học",
    },
    {
        title: "Lương",
        href: "/salary",
        description: "Lương và các khoản tiền bạn nhận được từ việc dạy",
    },
    {
        title: "Tài chính",
        href: "/staff/finance",
        description:
            "Tài chính và các thông tin liên quan tiền bạc của công ty",
    },
    {
        title: "Xác nhận học phí",
        href: "/staff/payments",
        description: "Xem các bill chuyển khoản của học sinh và xác nhận",
    },
    {
        title: "Quản lý khóa học",
        href: "/staff/courses",
        description: "Quản lý các khóa học của học sinh mà trung tâm cung cấp",
    },
    {
        title: "Danh sách học sinh",
        href: "/staff/all-students",
        description: "Quản lý tất cả các học sinh của trung tâm tiếng Anh",
    },
    {
        title: "Liên hệ hỗ trợ",
        href: "/help",
        description:
            "Liên hệ nhân viên học vụ để được hỗ trợ ngay lập tức trong giờ hành chính",
    },
];

export function Navbar() {
    return (
        <div className="py-3 px-8 w-full shadow-md bg-white border border-gray-200">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuLink
                                className={`${navigationMenuTriggerStyle()} font-bold text-[16px]`}
                            >
                                ENGLISH CENTER
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <div className="flex flex-row gap-4">
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="text-[15px] font-medium">
                                Về chúng tôi
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                    <li className="row-span-3">
                                        <NavigationMenuLink asChild>
                                            <Link
                                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                href="/"
                                            >
                                                {/* <Icons.logo className="h-6 w-6" /> */}
                                                <Image
                                                    src="/logo.jpg"
                                                    alt=""
                                                    height={120}
                                                    width={160}
                                                    className="rounded-md"
                                                />
                                                <div className="mb-2 mt-4 text-lg font-medium">
                                                    English Center
                                                </div>
                                                <p className="text-sm leading-tight text-muted-foreground">
                                                    Giúp bạn giao tiếp tiếng Anh
                                                    như người bản sứ
                                                </p>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <ListItem href="/docs" title="Giới thiệu">
                                        Thông tin về trung tâm
                                    </ListItem>
                                    <ListItem
                                        href="/docs/installation"
                                        title="Các giảng viên"
                                    >
                                        Các giảng viên hàng đầu trong việc giảng
                                        dạy tiếng Anh
                                    </ListItem>
                                    <ListItem
                                        href="/docs/primitives/typography"
                                        title="Đánh giá của học viên"
                                    >
                                        Các phản hồi của học viên sau khi tham
                                        gia học ở trung tâm
                                    </ListItem>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="text-[15px] font-medium">
                                Tuyển dụng
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                    {components.map((component) => (
                                        <ListItem
                                            key={component.title}
                                            title={component.title}
                                            href={component.href}
                                        >
                                            {component.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/all-courses" legacyBehavior passHref>
                                <NavigationMenuLink
                                    className={`${navigationMenuTriggerStyle()} text-[15px] font-medium`}
                                >
                                    Các khóa học
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <SignedIn>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="text-[15px] mr-4 font-medium">
                                    Cá nhân
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                        {myControllers.map((component) => (
                                            <ListItem
                                                key={component.title}
                                                title={component.title}
                                                href={component.href}
                                            >
                                                {component.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </SignedIn>
                        <div className={`m-0 p-0`}>
                            <SignedOut>
                                <SignInButton>
                                    <div className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-[15px] font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                                        Đăng nhập
                                    </div>
                                </SignInButton>
                            </SignedOut>
                        </div>
                        <div className={`m-0 p-0`}>
                            <SignedIn>
                                <div className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-[15px] font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                                    <UserButton />
                                </div>
                            </SignedIn>
                        </div>
                    </div>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-[15px] font-medium leading-none">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-[14px] leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";
