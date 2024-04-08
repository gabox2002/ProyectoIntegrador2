import React, { useState, useEffect } from "react";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import "../scss/components/_scroll-to-top.scss";

function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY > 900) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <Button
            icon={faArrowUp}
            className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`}
            action={scrollToTop}
            title="Ir arriba"
        />
    );
}

export default ScrollToTopButton;
