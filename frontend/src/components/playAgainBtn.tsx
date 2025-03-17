import React from 'react';
import { Flex, Button } from '@chakra-ui/react';


interface PlayAgainBtn {
    score: number;
}

const PlayAgainBtn: React.FC<PlayAgainBtn> = ({ }) => {
    return (
        <Flex direction="column" align="center" justify="center" gap={4} >
            {/* Play Again Button */}
            <Button
                colorScheme="green"
                size={{ base: 'md', lg: 'lg' }}
                height={{ base: '72px', md: '120px' }}
                width={{ base: '180px', md: '450px' }}
                border="2px"
                borderColor="#2f9e44"
                fontSize={{base: "6xl", md: '6xl'}}
                fontWeight={"bold"}
            >
                {'PLAY AGAIN'}
                {/* {'You scored: '} {score} */}
            </Button>
        </Flex>
    );
};

export default PlayAgainBtn;
