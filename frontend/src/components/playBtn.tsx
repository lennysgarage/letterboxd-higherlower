import React, { useState, useEffect } from 'react';
import { Flex, Box, Button, Spinner, Text, ScaleFade } from '@chakra-ui/react';
import MoviePoster from './moviePoster';
import Rating from './rating';
import PlayAgainBtn from './playAgainBtn';


interface PlayBtn {
    score: number;
    highScore: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    setHighScore: React.Dispatch<React.SetStateAction<number>>;

}

const PlayBtn: React.FC<PlayBtn> = ({ score, setScore, highScore, setHighScore }) => {
    const [showPosters, setShowPosters] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showRating, setShowRating] = useState(false);
    const [showPlayAgain, setShowPlayAgain] = useState(false);
    const [posterData1, setPosterData1] = useState<{ movie_name: string; poster_url: string; movie_url: string; rating: number } | null>(null);
    const [posterData2, setPosterData2] = useState<{ movie_name: string; poster_url: string; movie_url: string; rating: number } | null>(null);
    const [borderColour1, setBorderColour1] = useState('blue.400');
    const [borderColour2, setBorderColour2] = useState('blue.400');
    const [isClickDisabled, setIsClickDisabled] = useState(false);
    const [lastWinner, setLastWinner] = useState(0); // after 2 consecutive wins switch poster.
    // new game

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
        const storedHighScore = sessionStorage.getItem("highScore");
        if (storedHighScore) {
            setHighScore(Number(storedHighScore));
        }

        fetchInitialPosters();
    }, [setHighScore]);


    const handlePlayBtnClick = () => {
        setShowPosters(true);
    };


    const handlePlayAgain = () => {
        setShowPlayAgain(false);
        setShowRating(false);
        setScore(0);
        setLastWinner(0);
        fetchInitialPosters();
        setShowPosters(true);
        setBorderColour1('blue.400');
        setBorderColour2('blue.400');
        setIsClickDisabled(false);
    };



    const handlePosterClick = async (poster: number) => {
        if (isClickDisabled) return;  // prevent clicking

        setIsClickDisabled(true);

        const selectedMovie = poster === 1 ? posterData1 : posterData2;
        const otherMovie = poster === 1 ? posterData2 : posterData1;
        if (!selectedMovie || !otherMovie) {
            return
        }
        // the workflow

        // turn white when we first select.
        setBorderColour1('white.400');
        setBorderColour2('white.400');

        // load rating
        setShowRating(true);

        // load new poster
        const newPoster = await fetchMoviePoster();
        const lastWinnerNewPoster = await fetchMoviePoster();

        const updateBorderAndData = (isWinner: boolean, winnerPoster: number) => {
            const winnerColor = isWinner ? 'green.400' : 'red.400';
            const loserColor = isWinner ? 'red.400' : 'green.400';

            // update poster colours
            setTimeout(() => {
                if (winnerPoster === 1) {
                    setBorderColour1(winnerColor);
                    setBorderColour2(loserColor);
                } else {
                    setBorderColour2(winnerColor);
                    setBorderColour1(loserColor);
                }
                
                // update score & poster.
                if (isWinner) {
                    setScore(score + 1);
                    
                    if (score + 1 > highScore) {
                        setHighScore(score + 1);
                        sessionStorage.setItem('highScore', (score + 1).toString());
                    }
                    
                } else {
                    setTimeout(() => {
                        setShowPlayAgain(true);
                        setShowRating(false);
                        setShowPosters(false);
                    }, 2000)
                }
            }, 1000)

            // hide rating
            setTimeout(() => setShowRating(false), 4000);

            // reset borders
            setTimeout(() => {
                setBorderColour1('blue.400');
                setBorderColour2('blue.400');

                // update to new posters
                if (isWinner) {
                    if (winnerPoster === 1) {
                        if (lastWinner === 1) {
                            setLastWinner(0); // reset who won last.
                            setPosterData1(lastWinnerNewPoster);
                        } else { // last winner wasn't poster 1
                            setLastWinner(1);
                        }
                        setPosterData2(newPoster); // Update poster 2 if poster 1 wins
                    } else {
                        if (lastWinner === 2) {
                            setLastWinner(0); // reset who won last.
                            setPosterData2(lastWinnerNewPoster);
                        } else { // last winner wasn't poster 2
                            setLastWinner(2);
                        }
                        setPosterData1(newPoster); // Update poster 1 if poster 2 wins
                    }
                }
                setIsClickDisabled(false);
            }, 4000);
        };

        if (selectedMovie.rating >= otherMovie.rating) {
            updateBorderAndData(true, poster);
        } else {
            updateBorderAndData(false, poster);
        }

    }

    return (
        <Flex direction="column" align="center" justify="center" gap={4}>
            {/* Play Button */}
            {!showPosters && !showPlayAgain && (<Button
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

            {showPosters &&
                (<Flex justify="center" gap={32} align="center">
                    {posterData1 &&
                        <ScaleFade initialScale={0.9} in={showPosters}>
                            <Box cursor={"pointer"}
                                position="relative"
                            >
                                <MoviePoster
                                    movie_name={posterData1.movie_name}
                                    poster_url={posterData1.poster_url}
                                    movie_url={posterData1.movie_url}
                                    rating={(showRating || lastWinner === 1) ? posterData1.rating : -1}
                                    onClick={() => handlePosterClick(1)}
                                    border={borderColour1}
                                />
                            </Box>
                        </ScaleFade>

                    }
                    <Text
                        fontStyle={"bold"}
                        fontSize={"8xl"}
                        color="#f4fcf0"
                    >
                        OR
                    </Text>
                    {posterData2 &&
                        <ScaleFade initialScale={0.9} in={showPosters}>
                            <Box cursor={"pointer"}>
                                <MoviePoster
                                    movie_name={posterData2.movie_name}
                                    poster_url={posterData2.poster_url}
                                    movie_url={posterData2.movie_url}
                                    rating={(showRating || lastWinner === 2) ? posterData2.rating : -1}
                                    onClick={() => handlePosterClick(2)}
                                    border={borderColour2}
                                />
                            </Box>
                        </ScaleFade>
                    }
                </Flex>
                )}

            {
                showPlayAgain &&
                <Box
                    onClick={handlePlayAgain}
                >
                    <PlayAgainBtn score={score}>
                    </PlayAgainBtn>
                </Box>
            }

            {/* Loading spinner */}
            {loading && !showPosters && (
                <Spinner size="xl" />
            )}
        </Flex>
    );
};

export default PlayBtn;