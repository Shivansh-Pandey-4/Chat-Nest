"use client"

import React from "react"
import clsx from "clsx";

interface IButton extends React.ComponentProps<"button"> {
    children: React.ReactNode;
    className?: string;
    size?: "sm" | "lg" | "md";
    variant?: "primary" | "secondary" | "tertiary" | "danger";
}


export default function Button({ children, className, size = "sm", variant = "primary", disabled, ...props }: IButton) {

    const baseStyle = "ui:rounded-md ui:border";

    const sizes = {
        sm: "ui:px-1",
        md: "ui:px-2 ui:py-1 ui:text-md",
        lg: "ui:px-3 ui:py-2 ui:text-lg"
    }

    const variants = {
        primary: "ui:bg-gray-600 text-white ui:hover:bg-black hover:text-white",
        secondary: "ui:bg-blue-600 text-white ui:hover:bg-green-600",
        tertiary: "ui:bg-amber-400 text-black ui:hover:bg-amber-600",
        danger: "ui:bg-red-500 ui:hover:bg-red-600"
    }

    return (
        <button {...props} disabled={disabled} className={clsx(baseStyle, className, sizes[size], variants[variant], disabled ? "ui:opacity-50 ui:cursor-no-drop" : "ui:cursor-pointer")}>
            {children}
        </button>
    )
}