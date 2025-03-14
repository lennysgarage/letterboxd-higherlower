import React from 'react';
import { Flex } from '@chakra-ui/react';
import PlayBtn from './playBtn'

interface MainArea {
    genres: string[]; 
    score: number;
    highScore: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    setHighScoreScore: React.Dispatch<React.SetStateAction<number>>;
}

const MainArea: React.FC<MainArea> = ({ genres, score, setScore, highScore, setHighScoreScore }) => {
    // needs to hold two movie poster containers.

    return (
        <Flex
            justify="center"
            align="center"
            height="80vh"
            direction="column"
        >
            <PlayBtn genres={genres} score={score} setScore={setScore} highScore={highScore} setHighScore={setHighScoreScore}/>
        </Flex>

    );
};

export default MainArea;