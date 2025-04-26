import React from "react";
import "./AnimatedTitle.css";

export default function AnimatedTitle({ children }) {
    return (
        <h1 className="animated-title">
            {Array.from(children).map((char, i) =>
                char === " " ?
                    <span key={i}>&nbsp;</span> :
                    <span key={i} style={{ animationDelay: `${i * 0.07}s` }}>
                        {char}
                    </span>
            )}
        </h1>
    );
}