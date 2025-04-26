import React, { useEffect, useRef } from "react";
import "./SpiralAnimation.css";

export default function SpiralAnimation({ text = "SERVICEBOX / ЛЕНИНА / 6", radius = 90, duration = 7000 }) {
    const letters = text.split("");
    const ref = useRef();

    useEffect(() => {
        let mounted = true;
        let last = Date.now();
        let anim = 0;

        // вращение (manual requestAnimationFrame)
        function animate() {
            if (!mounted) return;
            const now = Date.now();
            const t = ((now % duration) / duration) * 2 * Math.PI; // 0..2pi
            if (ref.current) {
                [...ref.current.children].forEach((el, i) => {
                    // равномерно по кругу
                    const angle = t + (i * (2 * Math.PI)) / letters.length;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    el.style.transform = `translate(${x}px,${y}px) rotate(${angle + Math.PI / 2}rad)`;
                });
            }
            anim = requestAnimationFrame(animate);
        }
        anim = requestAnimationFrame(animate);
        return () => {
            mounted = false;
            cancelAnimationFrame(anim);
        };
    }, [letters.length, radius, duration]);

    return (
        <div className="spiral-anim-container">
            <div className="spiral-anim-ring" ref={ref}>
                {letters.map((char, idx) =>
                    <span className="spiral-anim-letter" key={idx}>{char}</span>
                )}
            </div>
        </div>
    );
}