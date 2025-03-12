import { Flex, Box, Text, Select } from '@chakra-ui/react';

interface MoviePoster {
}

const MoviePoster: React.FC<MoviePoster> = () => {
    // creeate a movie poster container.

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

                
            </Flex>

        </Box>
    );
};

export default MoviePoster;