import React, { useState, useEffect } from 'react';
import { Flex, Box, Button, Spinner, Text } from '@chakra-ui/react';
import MoviePoster from './moviePoster';
import Rating from './rating';


interface PlayBtn { 
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
}

const PlayBtn: React.FC<PlayBtn> = ({ score, setScore }) => {
    const [showPosters, setShowPosters] = useState(false);
    const [loading, setLoading] = useState(false);
    const [posterData1, setPosterData1] = useState<{ movie_name: string; poster_url: string; movie_url: string; rating: number } | null>(null);
    const [posterData2, setPosterData2] = useState<{ movie_name: string; poster_url: string; movie_url: string; rating: number } | null>(null);
    // const [score, setScore] = useState(0);

    const fetchMoviePoster = async (): Promise<{ movie_name: string; poster_url: string; movie_url: string; rating: number }> => {
        const res = await fetch('http://localhost:8787/api/newmovie');
        const data = await res.json();
        return {
            movie_name: data[0].movie_name,
            poster_url: data[0].poster_url,
            movie_url: data[0].movie_url,
            rating: data[0].rating,
        };
    }

    const fetchInitialPosters = async () => {
        setLoading(true);

        try {
            const movie1 = await fetchMoviePoster();
            const movie2 = await fetchMoviePoster();

            setPosterData1(movie1);
            setPosterData2(movie2);
        } catch (err) {
            console.error("we failed to fetch the movies :(", err)
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchInitialPosters();
    }, []);


    const handlePlayBtnClick = () => {
        setShowPosters(true);
    };

    const handlePosterClick = async (poster: number) => {
        const selectedMovie = poster === 1 ? posterData1 : posterData2;
        const otherMovie = poster === 1 ? posterData2 : posterData1;
        if (!selectedMovie || !otherMovie) {
            return
        }

        const newPoster = await fetchMoviePoster();
        if (selectedMovie.rating >= otherMovie.rating) {
            // need a transition for rating.
            setScore(score + 1);

            // replace lower movie
            if (poster === 1) {
                setPosterData2(newPoster);
            } else {
                setPosterData1(newPoster);
            }
        } else {
            console.log("gameover")
            setScore(0);
            // need some sort of gameover component.
            // prob can use playagainbtn for that.

            // game over

            // if (poster === 1) {
            //     setPosterData1(newPoster);
            // } else {
            //     setPosterData2(newPoster);
            // }
        }


    }

    return (
        <Flex direction="column" align="center" gap={4}>
            {/* Play Button */}
            {!showPosters && (<Button
                colorScheme="blackAlpha"
                onClick={handlePlayBtnClick}
                isLoading={loading}
                size="lg"
                height={"72px"}
                width={"300px"}
                border="2px"
                borderColor="#2f9e44"
                fontSize={"6xl"}
                fontWeight={"bold"}
            >
                {loading ? 'Loading...' : 'PLAY'}
            </Button>
            )}

            {showPosters && (
                <Flex justify="center" gap={32} align="center">
                    {posterData1 &&
                        <Box
                            cursor={"pointer"}
                        >
                            <Rating rating={posterData1.rating} />
                            <MoviePoster
                                movie_name={posterData1.movie_name}
                                poster_url={posterData1.poster_url}
                                movie_url={posterData1.movie_url}
                                rating={posterData1.rating}
                                onClick={() => handlePosterClick(1)}
                            />
                        </Box>
                    }
                    <Text
                        fontStyle={"bold"}
                        fontSize={"8xl"}
                        color="#f4fcf0"

                    >
                        OR
                    </Text>
                    {posterData2 &&
                        <Box
                            cursor={"pointer"}
                        >
                            <Rating rating={posterData2.rating} />
                            <MoviePoster
                                movie_name={posterData2.movie_name}
                                poster_url={posterData2.poster_url}
                                movie_url={posterData2.movie_url}
                                rating={posterData2.rating}
                                onClick={() => handlePosterClick(2)}
                            />
                        </Box>
                    }
                </Flex>
            )}

            {/* Loading spinner */}
            {loading && !showPosters && (
                <Spinner size="xl" />
            )}
        </Flex>
    );
};

export default PlayBtn;