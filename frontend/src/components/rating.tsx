import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

const Star = ({ filled }: { filled: boolean }) => (
    <Text
        fontSize={"6xl"}
        color={filled ? "#2f9e44" : "gray.400"}
    >
        *
    </Text>
)

interface Rating {
    rating: number;
}

const Rating: React.FC<Rating> = ({ rating }) => {
    const roundedRating = Math.round(rating);

    return (
        <Flex align="center">
            {
                [...Array(5)].map((_, index) => (
                    <Star key={index} filled={index < roundedRating} />
                ))
            }
                <Text ml={2} fontSize={"3xl"}>{rating}/5</Text>
        </Flex>
    );
};

export default Rating;