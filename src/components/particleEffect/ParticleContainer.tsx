import { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

interface StartPosition {
    startX: number;
    startY: number;
}

const ParticleContainer = styled.div`
    background-color: black;
    position: fixed;
    height: 100vh;
    width: 100%;
    overflow: hidden;
`;

const generateMoveInRandomDirectionKeyframes = (startX: number, startY: number, endX: number, endY: number) => keyframes`
    from {
        transform: translate(${startX}vw, ${startY}vh);
    }
    to {
        transform: translate(${endX}vw, ${endY}vh);
    }
`;

const getRandomStartPosition = (): StartPosition => {
    const randomEdge = Math.floor(Math.random() * 4);

    switch (randomEdge) {
        case 0: // Top
            return { startX: Math.random() * 100, startY: -10 };
        case 1: // Right
            return { startX: 110, startY: Math.random() * 100 };
        case 2: // Bottom
            return { startX: Math.random() * 100, startY: 110 };
        case 3: // Left
            return { startX: -10, startY: Math.random() * 100 };
        default:
            return { startX: 0, startY: 0 }; // Default to top if something goes wrong
    }
};

const getAnimatedCircle = (key: number): JSX.Element => {
    const startPositions = getRandomStartPosition();
    const endPositions = getRandomStartPosition();

    const AnimatedCircle = styled.div`
        position: absolute;
        background-color: white;
        opacity: 0.3;
        width: ${(Math.random() * 500) + 50}px;
        aspect-ratio: 1;
        border-radius: 50%;
        transition: transform 0.3s ease-in-out;
        animation: ${() => css`${generateMoveInRandomDirectionKeyframes(
            startPositions.startX,
            startPositions.startY,
            endPositions.startX,
            endPositions.startY
        )}`} 120s infinite linear;
    `;

    return <AnimatedCircle key={key} className='circleClass'/>;
};

const ParticleApp = (): JSX.Element => {
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setAnimationKey((prevKey) => prevKey + 1);
        }, 120000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const circles = Array.from({ length: 20 }, (_, i) => getAnimatedCircle(animationKey + i));

    return <ParticleContainer>{circles}</ParticleContainer>;
};

export default ParticleApp;
