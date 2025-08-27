"use client";

import Search from "@/components/Search";
import useCompanySettings from "@/hooks/useCompanySettings";
import {
    Box,
    Container,
    Stack,
    Text,
    VStack
} from "@chakra-ui/react";


export default function SearchBarPage() {
    const companySettings = useCompanySettings();

    return (
        <Container mt={4}>
            <VStack gap={4} align="stretch">
                {/* Company Info Display */}
                <Box p={4} bg="gray.50" rounded="xl">
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        Company Settings Test
                    </Text>
                    <Text><strong>Company:</strong> {companySettings.displayName}</Text>
                    <Text><strong>ID:</strong> {companySettings.companyId}</Text>
                    <Text><strong>Theme:</strong> {companySettings.theme}</Text>
                    <Text><strong>Color:</strong> {companySettings.color}</Text>
                    <Text><strong>Small Logo:</strong> {companySettings.logos.sm.url}</Text>
                    <Text><strong>Large Logo:</strong> {companySettings.logos.lg.url}</Text>
                </Box>

                {/* Search Components with Company Color */}
                <Stack gap={4}>
                    <Box rounded="xl" minW="300px" p={4} bg={`${companySettings.color}.50`}>
                        <Search color={companySettings.color} />
                    </Box>
                    <Box rounded="xl" minW="300px" maxW="600px" p={4} bg={`${companySettings.color}.50`}>
                        <Search color={companySettings.color} />
                    </Box>
                    <Box rounded="xl" minW="300px" maxW="400px" p={4} bg={`${companySettings.color}.50`}>
                        <Search color={companySettings.color} />
                    </Box>
                </Stack>
            </VStack>
        </Container>
    );
}