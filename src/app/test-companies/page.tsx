"use client";

import { Box, Button, Container, Flex, HStack, Text, VStack } from "@chakra-ui/react";

const testData = [
    { id: 'p10', name: 'Plataforma 10', color: 'p10' },
    { id: 'deonibus', name: 'DeÔnibus', color: 'deonibus' },
    { id: '12go', name: '12go', color: '12go' },
    { id: 'bookaway', name: 'Bookaway', color: 'bookaway' }
];

export default function TestCompaniesPage() {
    return (
        <Container mt={8}>
            <VStack gap={8} align="stretch">
                <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                    Company Color Palette Test
                </Text>

                {testData.map((company) => (
                    <Box key={company.id} p={6} bg="white" rounded="xl" boxShadow="md">
                        <VStack gap={4} align="stretch">
                            <Flex justify="space-between" align="center">
                                <Text fontSize="xl" fontWeight="semibold">
                                    {company.name} ({company.id})
                                </Text>
                                <Text fontSize="sm" color="gray.500">
                                    Color: {company.color}
                                </Text>
                            </Flex>

                            {/* Color Swatches */}
                            <Box>
                                <Text fontSize="sm" fontWeight="medium" mb={2}>Color Palette:</Text>
                                <HStack gap={1}>
                                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                                        <Box
                                            key={shade}
                                            w="8"
                                            h="8"
                                            bg={`${company.color}.${shade}`}
                                            rounded="md"
                                            border="1px solid"
                                            borderColor="gray.200"
                                            title={`${company.color}.${shade}`}
                                        />
                                    ))}
                                </HStack>
                            </Box>

                            {/* Buttons Test */}
                            <Box>
                                <Text fontSize="sm" fontWeight="medium" mb={2}>Button Variants:</Text>
                                <HStack gap={2} wrap="wrap">
                                    <Button colorPalette={company.color as any} variant="solid" size="sm">
                                        Solid
                                    </Button>
                                    <Button colorPalette={company.color as any} variant="outline" size="sm">
                                        Outline
                                    </Button>
                                    <Button colorPalette={company.color as any} variant="ghost" size="sm">
                                        Ghost
                                    </Button>
                                    <Button colorPalette={company.color as any} variant="subtle" size="sm">
                                        Subtle
                                    </Button>
                                </HStack>
                            </Box>

                            {/* Background Test */}
                            <Box>
                                <Text fontSize="sm" fontWeight="medium" mb={2}>Background Variations:</Text>
                                <HStack gap={2}>
                                    <Box p={3} bg={`${company.color}.50`} rounded="md" minW="16">
                                        <Text fontSize="xs" textAlign="center">50</Text>
                                    </Box>
                                    <Box p={3} bg={`${company.color}.100`} rounded="md" minW="16">
                                        <Text fontSize="xs" textAlign="center">100</Text>
                                    </Box>
                                    <Box p={3} bg={`${company.color}.200`} rounded="md" minW="16">
                                        <Text fontSize="xs" textAlign="center">200</Text>
                                    </Box>
                                    <Box p={3} bg={`${company.color}.500`} color="white" rounded="md" minW="16">
                                        <Text fontSize="xs" textAlign="center">500</Text>
                                    </Box>
                                </HStack>
                            </Box>
                        </VStack>
                    </Box>
                ))}
            </VStack>
        </Container>
    );
}
