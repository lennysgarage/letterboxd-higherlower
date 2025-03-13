import React, { useState, useEffect } from 'react';
import { Flex, Box, Button, Spinner, Text, ScaleFade } from '@chakra-ui/react';
import MoviePoster from './moviePoster';
import Rating from './rating';


interface PlayAgainBtn {
    score: number;
}

const PlayAgainBtn: React.FC<PlayAgainBtn> = ({ score }) => {
    return (
        <Flex direction="column" align="center" gap={4}>
            {/* Play Again Button */}
            <Button
                colorScheme="blackAlpha"
                size="lg"
                height={"72px"}
                width={"300px"}
                border="2px"
                borderColor="#2f9e44"
                fontSize={"4xl"}
                fontWeight={"bold"}
            >
                {'PLAY AGAIN'}
                {/* {'You scored: '} {score} */}
            </Button>
        </Flex>
    );
};

export default PlayAgainBtn;
