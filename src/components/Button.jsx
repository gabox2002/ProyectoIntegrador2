import React from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";

export default function Button({
    label,
    icon = "",
    action = () => {},
    className,
    type = "button",
    disabled,
    title,
    to,
}) {
    if (to) {
        return (
            <Link to={to} className={className} title={title}>
                {icon ? <Icon icon={icon} /> : undefined}
                {label}
            </Link>
        );
    } else {
        return (
            <button
                type={type}
                className={className}
                onClick={action}
                title={title}
                disabled={disabled}
            >
                {icon ? <Icon icon={icon} /> : undefined}
                {label}
            </button>
        );
    }
}
