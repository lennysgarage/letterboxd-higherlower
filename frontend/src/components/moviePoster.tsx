import { Flex, Box, Text, Image } from '@chakra-ui/react';

interface MoviePoster {
    movie_name: string;
    poster_url: string;
    rating: number;
}

const MoviePoster: React.FC<MoviePoster> = ({ movie_name, poster_url, rating }) => {
    // creates a movie poster container.
    return (
        <Box
            height="400px"
            width="250px"
            bg="#14181c"
            color={"#f4fcf0"}
            borderRadius="8px"
            boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
            overflow="hidden"
        >
            <Flex
                direction="column"
                justify="center"
                align="center"
                height="100%"
                gap={2}
            >
                {/* Display the movie poster */}

                <Image
                    src={poster_url}
                    alt="Movie Poster"
                    height="center"
                    width="100%"
                    objectFit="cover"
                />

                {/* Display movie name */}

                <Text>
                    {movie_name}
                </Text>
            </Flex>
        </Box>
    );
};

export default MoviePoster;