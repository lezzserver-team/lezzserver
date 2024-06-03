import { cn } from "@/lib/utils";
import React from "react";
import { IconProps } from "../ui/icon";
import { Input, InputProps } from "../ui/input";

export interface InputIconProps extends InputProps {
    icon?: React.ComponentType<IconProps>;
}

export function InputIcon({ className, icon: Icon, ...props }: InputIconProps) {
    return (
        <div className="relative flex items-center">
            {Icon && <Icon className="absolute left-3.5 top-1/2 transform -translate-y-1/2" />}
            <Input
                className={cn("w-full pl-10", className)}
                {...props}
            />
        </div>
    );
}
