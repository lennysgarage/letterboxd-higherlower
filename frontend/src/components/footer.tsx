import { Flex, Box, Link, Image } from '@chakra-ui/react';
import letterboxdLogo from "../assets/letterboxd.png"
import githubLogo from "../assets/github.png"

interface Footer { }

const Footer: React.FC<Footer> = () => {
    return (
        <Box
            height="40px"
            bg="#14181c"
            color={"#f4fcf0"}
        >
            <Flex
                justify="center"
                align={"center"}
                gap={{base: 4, md: 8 }}
                height={"100%"}
            >

                {/* Letterboxd */}
                <Link href="https://letterboxd.com/lennysgarage/" isExternal _hover={{
                    color: '#00b020',
                    transform: 'scale(1.10)',
                    transition: 'transform 0.3s ease-in-out'
                }}>
                    <Flex align="center" gap={2}>
                        <Image src={letterboxdLogo} alt="Letterboxd" boxSize="32px" />
                        My Letterboxd
                    </Flex>
                </Link>

                {/* Github */}
                <Link href="https://github.com/lennysgarage" isExternal _hover={{
                    color: '#00b020',
                    transform: 'scale(1.10)',
                    transition: 'transform 0.3s ease-in-out'
                }}>
                    <Flex align="center" gap={2}>
                        <Image src={githubLogo} alt="Github" boxSize="28px" />
                        My Github
                    </Flex>
                </Link>
            </Flex>

        </Box>
    );
};

export default Footer;