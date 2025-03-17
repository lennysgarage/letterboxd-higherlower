import React, { useState, useEffect } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import GenreMenu from './genreMenu';


interface Headers {
    selectedGenres: string[];
    setSelectedGenres: any;
    score: number;
    highScore: number;
    onGenreChange: (value: string) => void; // i have no idea rn
}

const Header: React.FC<Headers> = ({ score, highScore, selectedGenres, setSelectedGenres }) => {
    const [prevScore, setPrevScore] = useState(score);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isAnimatingHighScore, setIsAnimatingHighScore] = useState(false);

    useEffect(() => {
        if (score !== prevScore) {
            setIsAnimating(true);
            setPrevScore(score);
            setTimeout(() => {
                setIsAnimating(false)
            }, 400);
        }

        if (score === highScore) {
            setIsAnimatingHighScore(true);
            setTimeout(() => {
                setIsAnimatingHighScore(false)
            }, 400);
        }
    }, [score, prevScore, highScore]);


    return (
        <Box
            height="80px"
            bg="#14181c"
            color={"#f4fcf0"}
            alignContent={"center"}
            justifyContent={"center"}
        >
            <Flex
                justify={"center"}
                align={"center"}
                gap={8}
                height={"100%"}
                position={"relative"}
                px={4}
            >

                {/* Score */}
                <Box
                    width={{base: "80px", md: "110px"}}
                >
                    <motion.div
                        initial={{ scale: 1.4 }}
                        animate={{
                            scale: isAnimating ? 1.7 : 1.4
                        }}
                        transition={{ duration: 0.4 }}
                    >
                        <Text
                            fontSize={{ base: "sm", md: "lg" }}
                            fontWeight="bold"
                            color="orange.400"
                        >
                            Score: <Text as="span" color="orange.400">{score}</Text>
                        </Text>
                    </motion.div>

                </Box>

                {/* Genre Menu */}
                <Box>
                    <GenreMenu
                        selectedGenres={selectedGenres}
                        setSelectedGenres={setSelectedGenres}
                    />
                </Box>

                {/* High Score */}
                <Box ml={2} alignContent={"center"} width={{base: "80px", md: "130px"}}>
                    <motion.div
                        initial={{ scale: 1.4 }}
                        animate={{
                            scale: isAnimatingHighScore ? 1.7 : 1.4
                        }}
                        transition={{ duration: 0.4 }}
                    >
                        <Text
                            fontSize={{ base: "sm", md: "lg" }}
                            fontWeight="bold"
                            color="blue.400">
                            High Score: <Text as="span" color="blue.400">{highScore}</Text>
                        </Text>
                    </motion.div>
                </Box>
            </Flex>

        </Box>
    );
};

export default Header;