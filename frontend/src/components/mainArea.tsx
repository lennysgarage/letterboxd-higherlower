import React, { useState, useEffect, useCallback } from 'react';
import { Flex, Box, Text, Spacer } from '@chakra-ui/react';
import PlayBtn from './playBtn'

interface MainArea { 
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
}

const MainArea: React.FC<MainArea> = ({ score, setScore }) => {
    // needs to hold two movie poster containers.

    return (
        <Flex
            justify="center"
            align="center"
            height="80vh"
            direction="column"
        >
            <PlayBtn score={score} setScore={setScore}/>
        </Flex>

    );
};

export default MainArea;