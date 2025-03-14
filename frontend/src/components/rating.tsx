import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Star = ({ filled, half }: { filled: boolean; half?: boolean }) => {

  return (
    <Text fontSize="3xl">
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
}

const Rating: React.FC<Rating> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const totalStars = 5;

  return (
    <Flex align="center" zIndex={2}>
      {[...Array(totalStars)].map((_, index) => {
        if (index < fullStars) {
          return <Star key={index} filled />;
        }
        if (index === fullStars && hasHalfStar) {
          return <Star key={index} filled={false} half />;
        }
        return <Star key={index} filled={false} />;
      })}
      <Text ml={2} fontSize="3xl">
        {rating}/5
      </Text>
    </Flex>
  );
};

export default Rating;
