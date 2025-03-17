import React, { useEffect, useState } from "react";
import { Flex, Text, ScaleFade } from "@chakra-ui/react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Star = ({ filled, half }: { filled: boolean; half?: boolean }) => {

    return (
        <Text fontSize={{base: "xl", md: '3xl'}} >
            {half ? (
                <FaStarHalfAlt color={"#2f9e44"} />
            ) : filled ? (
                <FaStar color={"#2f9e44"} />
            ) : (
                <FaRegStar color={"gray.400"} />
            )}
        </Text>
    );
};

interface Rating {
    rating: number;
    duration?: number; // default 1sec
}

const Rating: React.FC<Rating> = ({ rating, duration = 1000 }) => {
    const [displayRating, setDisplayRating] = useState(0);

    const fullStars = Math.floor(displayRating);
    const hasHalfStar = displayRating % 1 >= 0.5;
    const totalStars = 5;

    useEffect(() => {
        let startTime: number;
        const animate = (time: number) => {
            if (!startTime) startTime = time;
            const progress = (time - startTime) / duration;
            const newRating = Math.min(rating, progress * rating);

            setDisplayRating(newRating);
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [rating, duration]);


    return (
        <ScaleFade initialScale={0.3} in={displayRating > -1}>
            <Flex 
            align="center"
            zIndex={2}
            width={{base: '125px', md: '250px'}}
            overflow={"hidden"}
            wrap="wrap"
            >
                {[...Array(totalStars)].map((_, index) => {
                    if (index < fullStars) {
                        return <Star key={index} filled />;
                    }
                    if (index === fullStars && hasHalfStar) {
                        return <Star key={index} filled={false} half />;
                    }
                    return <Star key={index} filled={false} />;
                })}
                <Text ml={2} fontSize={{base: "xl", md: '3xl'}} overflow={"auto"} whiteSpace="normal">
                    {displayRating.toFixed(2)}/5
                </Text>
            </Flex>
        </ScaleFade>
    );
};

export default Rating;
