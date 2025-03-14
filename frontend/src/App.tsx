import { useState } from 'react'
import './App.css'
import { ChakraProvider, Flex, Box } from '@chakra-ui/react'
import Header from './components/header'
import Footer from './components/footer'
import MainArea from './components/mainArea'


function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(['action', 'adventure', 'animation', 'crime', 'documentary', 'drama', 'family', 'fantasy', 'history', 'horror', 'music', 'mystery', 'romance', 'science-fiction', 'thriller', 'war', 'western']);


  return (
    <ChakraProvider>
      <Flex direction="column" height="100vh">

        {/* Header */}
        <Box height="80px">
          <Header
            score={score}
            highScore={highScore}
            onGenreChange={() => (null)}
            selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres}
          >
          </Header>
        </Box>

        {/* Main Area */}
        <Box flex="1" overflow={"auto"} bg="#456">
          <MainArea genres={selectedGenres} score={score} setScore={setScore} highScore={highScore} setHighScoreScore={setHighScore}></MainArea>
        </Box>

        {/* Footer */}
        <Box height="40px">
          <Footer></Footer>
        </Box>

      </Flex>
    </ChakraProvider>
  )
}

export default App
