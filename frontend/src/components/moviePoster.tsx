import { Flex, Box, Text, Image, Link } from '@chakra-ui/react';
import Rating from './rating';


interface MoviePoster {
    movie_name: string;
    poster_url: string;
    movie_url: string;
    rating: number;
    onClick: () => void;
    border: string;
}

const MoviePoster: React.FC<MoviePoster> = ({ movie_name, poster_url, movie_url, rating, onClick, border }) => {
    // creates a movie poster container.
    return (
        <Box
        >
            <Box
            _hover={{
                transform: 'scale(1.20)',
                transition: 'transform 0.3s ease-in-out, border 0.2s ease-in-out'
            }}
            transition="transform 0.3s ease-in-out, border 0.2s ease-in-out"
            >
                <Rating rating={rating} />
                <Box
                    height={{ base: '220px', md: '375px'}}
                    width={{base: '140px', md: '250px'}}
                    bg="#14181c"
                    color={"#f4fcf0"}
                    borderRadius="8px"
                    boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
                    overflow="hidden"
                    border="4px"
                    borderColor={border}
                    _hover={{
                        borderColor: border === 'blue.400' ? 'orange.400' : border,
                    }}
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
                            height="100%"
                            width="100%"
                            objectFit="cover"
                        />
                    </Flex>
                </Box>
            </Box>
            {/* Display movie name */}
            <Link href={movie_url} isExternal _hover={{ color: '#00b020' }}>
                <Text
                    mt="4"
                    fontStyle={"bold"}
                    fontSize={{base: "xl", md: "2xl"}}
                    wordBreak={"break-word"}
                    maxHeight={{ base: '187px', md: '375px'}}
                    maxWidth={{ base: '125px', md: '250px'}}
                    noOfLines={{base: 2, md: 1}}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                >
                    {movie_name}
                </Text>
            </Link>
        </Box>
    );
};

export default MoviePoster;