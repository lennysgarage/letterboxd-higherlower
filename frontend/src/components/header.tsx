import React, { useState } from 'react';
import { Flex, Box, Text, Select } from '@chakra-ui/react';

interface Headers {
    score: number;
    highScore: number;
    onGenreChange: (value: string) => void; // i have no idea rn
}

const Header: React.FC<Headers> = ({ score, highScore, onGenreChange }) => {
    return (
        <Box
            height="80px"
            bg="#14181c"
            color={"#f4fcf0"}
        >
            <Flex
                justify={"center"}
                align={"center"}
                gap={8}
                height={"100%"}
            >

                {/* Score */}
                <Box>
                    <Text 
                    fontSize="lg" 
                    fontWeight="bold"
                    color="orange.400"
                    >
                        Score: <Text as="span" color="orange.400">{score}</Text>
                    </Text>

                </Box>

                {/* Genre Menu */}
                <Box>
                    <Select
                        bg="gray.700"
                        border="2px solid"
                        borderColor="#2f9e44"
                        fontWeight={"bold"}
                        color="#f4fcf0"
                        _hover={{ bg: '#00bdfa' }}
                        onChange={(e) => onGenreChange(e.target.value)}
                        width="150px"
                        textAlign={"center"}
                    >
                        <option value="all">All Genres</option>
                        <option value="comedy">Comedy</option>
                        <option value="drama">Drama</option>
                    </Select>
                </Box>

                {/* High Score */}
                <Box>
                    <Text fontSize="lg" fontWeight="bold" color="blue.400">
                        High Score: <Text as="span" color="blue.400">{highScore}</Text>
                    </Text>
                </Box>
            </Flex>

        </Box>
    );
};

export default Header;