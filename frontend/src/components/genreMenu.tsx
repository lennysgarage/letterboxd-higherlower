import { Menu, MenuButton, MenuList, Button, MenuItemOption, MenuOptionGroup } from '@chakra-ui/react';
import React, { useState, useEffect } from "react";

interface GenreMenu {
    selectedGenres: string[];
    setSelectedGenres: any;
}

const GenreMenu: React.FC<GenreMenu> = ({ selectedGenres, setSelectedGenres }) => {
    const availableGenres = ['action', 'adventure', 'animation', 'comedy', 'crime', 'documentary', 'drama', 'family', 'fantasy', 'history', 'horror', 'music', 'mystery', 'romance', 'science-fiction', 'thriller', 'war', 'western'];

    const [selection, setSelection] = useState("All Genres");

    useEffect(() => {
        if (selectedGenres.length === availableGenres.length) {
            setSelection('All Genres');
        } else if (selectedGenres.length === 0) {
            setSelection('All Genres');
        } else {
            setSelection(selectedGenres.join(', '));
        }
    }, [selectedGenres]);

    return (
        <Menu closeOnSelect={false}>
            <MenuButton
                as={Button}
                bg="gray.700"
                border="2px solid"
                borderColor="#2f9e44"
                fontWeight={"bold"}
                color="#f4fcf0"
                _hover={{ bg: '#00bdfa' }}
                width={{base: "100px", md: "150px"}}
                textAlign={"center"}
                fontSize={{base: "sm", md: "lg"}}
                overflow={"hidden"}
                position={"relative"}
                textOverflow={"ellipsis"}
            >
                {selection}
            </MenuButton>
            <MenuList bg="gray.700" minWidth={{base: '120px', md: '240px'}}>
                <MenuOptionGroup
                    title='Genres'
                    type='checkbox'
                    value={selectedGenres}
                    onChange={(newGenres: string[] | string) => {
                        setSelectedGenres(newGenres);
                        if (newGenres.length === availableGenres.length) {
                            setSelection('All Genres');
                        } else {
                            setSelection((newGenres as string[]).join(', '));
                        }
                    }}
                >
                    {availableGenres.map((genre) => (
                        <MenuItemOption
                            key={genre}
                            bg="gray.400"
                            value={genre}
                            isChecked={selectedGenres.includes(genre)}
                        >
                            {genre.charAt(0).toUpperCase() + genre.slice(1)}
                        </MenuItemOption>
                    ))}
                </MenuOptionGroup>
            </MenuList>
        </Menu>
    );
};

export default GenreMenu;
