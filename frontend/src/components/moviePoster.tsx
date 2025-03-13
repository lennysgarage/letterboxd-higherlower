import { Flex, Box, Text, Image, Link } from '@chakra-ui/react';

interface MoviePoster {
    movie_name: string;
    poster_url: string;
    movie_url: string;
    rating: number;
    onClick: () => void;
}

const MoviePoster: React.FC<MoviePoster> = ({ movie_name, poster_url, movie_url, rating, onClick }) => {
    // creates a movie poster container.
    return (
        <Box
            gap={40}
        >
            <Box
                height="370px"
                width="250px"
                bg="#14181c"
                color={"#f4fcf0"}
                borderRadius="8px"
                boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
                overflow="hidden"
                border="2px"
                borderColor={"blue.400"}
                _hover={{
                    borderColor: 'orange.400',
                    transform: 'scale(1.20)',
                    transition: 'transform 0.3s ease-in-out, border 0.2s ease-in-out'
                }}
                transition="transform 0.3s ease-in-out, border 0.2s ease-in-out"
                onClick={onClick} // can actually
            >
                <Flex
                    direction="column"
                    align="center"
                    height="100%"
                >
                    {/* Display the movie poster */}
                    <Image
                        src={poster_url}
                        alt="Movie Poster"
                        height="center"
                        width="100%"
                        objectFit="cover"
                    />


                </Flex>
            </Box>
            {/* Display movie name */}
            {/* need to update link */}
            <Link href={movie_url} isExternal _hover={{ color: '#00b020' }}>
                <Text mt="4" fontStyle={"bold"} fontSize={"3xl"}>
                    {movie_name}
                </Text>
            </Link>
        </Box>
    );
};

export default MoviePoster;