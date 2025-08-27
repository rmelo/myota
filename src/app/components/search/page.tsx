"use client";

import Search from "@/components/Search";
import {
    Box,
    ColorPalette,
    Container,
    Stack
} from "@chakra-ui/react";


export default function SearchBarPage() {

    const color: ColorPalette = "red";
    const color2: ColorPalette = "red";
    const color3: ColorPalette = "red";

    return (
        <Container mt={4}>
            <Stack gap={4} >
                <Box rounded="xl" minW="300px" p={4} bg={`${color}.50`}>
                    <Search color={color} />
                </Box>
                <Box rounded="xl" minW="300px" maxW="600px" p={4} bg={`${color2}.50`}>
                    <Search color={color2} />
                </Box>
                <Box rounded="xl" minW="300px" maxW="400px" p={4} bg={`${color3}.50`}>
                    <Search color={color3} />
                </Box>
            </Stack>
        </Container>
    );
}