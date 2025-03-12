import React, { useState, useEffect } from 'react';
import { Flex, Button, Spinner } from '@chakra-ui/react';
import MoviePoster from './moviePoster';


interface PlayBtn { }

const PlayBtn: React.FC<PlayBtn> = () => {
    const [showPosters, setShowPosters] = useState(false);
    const [posterData1, setPosterData1] = useState<{ movie_name: string, rating: number, poster_url: string; } | null>(null);
    const [posterData2, setPosterData2] = useState<{ movie_name: string, rating: number, poster_url: string; } | null>(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchMoviePosters = async () => {
            setLoading(true);
    
            try {
                const res1 = await fetch('http://localhost:8787/api/newmovie');
                const data1 = await res1.json();
                setPosterData1({
                    movie_name: data1[0].movie_name,
                    poster_url: data1[0].poster_url,
                    rating: data1[0].rating
                });
    
                const res2 = await fetch('http://localhost:8787/api/newmovie');
                const data2 = await res2.json();
                setPosterData2(data2);
                setPosterData2({
                    movie_name: data2[0].movie_name,
                    poster_url: data2[0].poster_url,
                    rating: data2[0].rating
                });
            } catch (err) {
                console.error("we failed to fetch the movies :(", err)
            } finally {
                setLoading(false);
            }
        };

        fetchMoviePosters();
    
    }, []);


    const handlePlayBtnClick = () => {
        setShowPosters(true);
    };

    return (
        <Flex direction="column" align="center" gap={4}>
            {/* Play Button */}
            {!showPosters && (<Button
                colorScheme="blackAlpha"
                onClick={handlePlayBtnClick}
                isLoading={loading}
            >
                {loading ? 'Loading...' : 'PLAY'}
            </Button>
            )}

            {showPosters && (
                <Flex justify="center" gap={8}>
                    {posterData1 && <MoviePoster movie_name={posterData1.movie_name} poster_url={posterData1.poster_url} rating={posterData1.rating} />}
                    {posterData2 && <MoviePoster movie_name={posterData2.movie_name} poster_url={posterData2.poster_url} rating={posterData2.rating} />}
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