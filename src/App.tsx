import { useState } from 'react'
import './App.css'
import Header from './components/header'
import { ChakraProvider } from '@chakra-ui/react'


function App() {
  const [count, setCount] = useState(0)

  return (
    <ChakraProvider>
      <Header
        score={0}
        highScore={0}
        onGenreChange={() => (null)}
      />
    </ChakraProvider>
  )
}

export default App
