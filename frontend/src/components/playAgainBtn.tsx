import React from 'react';
import { Flex, Button } from '@chakra-ui/react';


interface PlayAgainBtn {
    score: number;
}

const PlayAgainBtn: React.FC<PlayAgainBtn> = ({ }) => {
    return (
        <Flex direction="column" align="center" gap={4}>
            {/* Play Again Button */}
            <Button
                colorScheme="green"
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
