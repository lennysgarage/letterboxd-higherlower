import { Flex, Box, Text, Spacer } from '@chakra-ui/react';
import PlayBtn from './playBtn'

interface MainArea { }

const MainArea: React.FC<MainArea> = () => {
    // needs to hold two movie poster containers.
    return (
        <Flex
            justify="center"
            align="center"
            height="100vh"
            direction="column"
        >
            <PlayBtn />
        </Flex>

    );
};

export default MainArea;