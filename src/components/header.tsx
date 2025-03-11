import { Flex, Box, Text, Select } from '@chakra-ui/react';

interface Headers {
    score: number;
    highScore: number;
    onGenreChange: (value: string) => void; // i have no idea rn
}

const Header: React.FC<Headers> = ({ score, highScore, onGenreChange }) => {
  return (
    <Flex
      as="header"
      justify="space-between"
      align="center"
      bg="#14181c"
      color="white"
      px={6}
      py={4}
    >
      {/* Score */}
      <Box>
        <Text fontSize="lg" color="orange.400">
          Score: <Text as="span" color="orange.400">{score}</Text>
        </Text>
      </Box>

      {/* Genre Menu */}
      <Box>
        <Select
          bg="gray.700"
          borderColor="#2f9e44"
          color="white"
          _hover={{ borderColor: 'orange.400' }}
          onChange={(e) => onGenreChange(e.target.value)}
          width="150px"
        >
          <option value="all">All Genres</option>
          <option value="comedy">Comedy</option>
          <option value="drama">Drama</option>
        </Select>
      </Box>

      {/* High Score */}
      <Box>
        <Text fontSize="lg" color="blue.400">
          High Score: <Text as="span" color="blue.400">{highScore}</Text>
        </Text>
      </Box>
    </Flex>
  );
};

export default Header;