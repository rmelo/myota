"use client"

import { Box, Container, createListCollection, Flex, Grid, Heading, HStack, Input, Portal, Select, Stack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DatePicker } from "../components/DatePicker";

export default function Home() {
  const { t, i18n, ready } = useTranslation();
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const languages = createListCollection({
    items: [
      { label: t('language.english'), value: "en" },
      { label: t('language.spanish'), value: "es" },
      { label: t('language.french'), value: "fr" },
      { label: t('language.german'), value: "de" },
      { label: t('language.portuguese'), value: "pt" },
    ],
  });

  const handleLanguageChange = (details: { value: string[] }) => {
    if (details.value.length > 0) {
      i18n.changeLanguage(details.value[0]);
    }
  };

  // Prevent hydration mismatch by not rendering until translations are ready
  if (!ready || !isClient) {
    return (
      <Container maxW="4xl" py="8">
        <VStack gap="8" align="stretch">
          <HStack justify="space-between" align="center">
            <Heading size="xl">Loading...</Heading>
          </HStack>
        </VStack>
      </Container>
    );
  }

  return (
    <Container>
      {/* Header */}
      <Flex justify="space-between" align="center" py="8">
        <Box>
          <Image src="https://www.plataforma10.com.ar/publicAssets/images/Plataforma-10-Logo.svg" alt="logo" width={160} height={160} />
        </Box>
        <HStack justify="space-between" align="center">
          <Box>
            <HStack gap="2" align="center">
              <Text fontSize="sm" fontWeight="medium">{t('language.selector')}</Text>
              <Select.Root
                collection={languages}
                value={[i18n.language]}
                onValueChange={handleLanguageChange}
                size="sm"
                width="140px"
              >
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {languages.items.map((language) => (
                        <Select.Item item={language} key={language.value}>
                          {language.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            </HStack>
          </Box>
        </HStack>
      </Flex>
      {/* Responsive Search Bar */}
      <Box
        borderRadius="lg"
        bg="white"
        shadow="sm"
        overflow="hidden"
      >
        <Grid
          templateColumns={{
            base: "1fr",                     // Small: 1 column (stacked)
            md: "1fr 1fr 1fr auto",          // Medium: 3 columns + search button
            lg: "1fr 1fr 1fr 1fr 1fr auto"   // Large: 5 columns + search button
          }}
          templateRows={{
            base: "auto auto auto auto auto", // Small: 5 rows (including search)
            md: "auto auto",                  // Medium: 2 rows
            lg: "auto"                        // Large: 1 row
          }}
          gap={{
            base: "4",                 // Small: gap between groups
            md: "0",                   // Medium: no gap (borders handle separation)
            lg: "0"                    // Large: no gap (borders handle separation)
          }}
        >
          {/* Origin - Row 1 on small, Group 1 */}
          <Box
            gridColumn={{ base: "1", md: "1", lg: "1" }}
            gridRow={{ base: "1", md: "1", lg: "1" }}
            borderRight={{ lg: "1px solid" }}
            borderRightColor={{ lg: "gray.200" }}
            borderBottom={{ md: "1px solid", lg: "none" }}
            borderBottomColor={{ md: "gray.200", lg: "transparent" }}
            border={{ base: "1px solid" }}
            borderColor={{ base: "gray.200" }}
            borderRadius={{ base: "lg", md: "none", lg: "none" }}
          >
            <Box p="4">
              <Stack gap="1">
                <Text fontSize="sm" color="gray.600" fontWeight="medium">Origin</Text>
                <Input
                  placeholder="São Paulo, BR"
                  fontSize="md"
                  variant="flushed"
                  borderBottomWidth={0}
                  fontWeight="medium"
                />
              </Stack>
            </Box>
          </Box>

          {/* Destination - Row 2 on small, Group 1 */}
          <Box
            gridColumn={{ base: "1", md: "2", lg: "2" }}
            gridRow={{ base: "2", md: "1", lg: "1" }}
            borderRight={{ lg: "1px solid" }}
            borderRightColor={{ lg: "gray.200" }}
            borderBottom={{ md: "1px solid", lg: "none" }}
            borderBottomColor={{ md: "gray.200", lg: "transparent" }}
            border={{ base: "1px solid" }}
            borderColor={{ base: "gray.200" }}
            borderRadius={{ base: "lg", md: "none", lg: "none" }}
          >
            <Box p="4">
              <Stack gap="1">
                <Text fontSize="sm" color="gray.600" fontWeight="medium">Destination</Text>
                <Input
                  placeholder="Rio de Janeiro, BR"
                  fontSize="md"
                  variant="flushed"
                  borderBottomWidth={0}
                  fontWeight="medium"
                />
              </Stack>
            </Box>
          </Box>

          {/* Dates Section - Row 3 on small (combined), Group 2 */}
          <Box
            gridColumn={{ base: "1", md: "1 / 3", lg: "3 / 5" }}
            gridRow={{ base: "3", md: "2", lg: "1" }}
            border={{ base: "1px solid" }}
            borderColor={{ base: "gray.200" }}
            borderRadius={{ base: "lg", md: "none", lg: "none" }}
            borderRight={{ md: "1px solid", lg: "none" }}
            borderRightColor={{ md: "gray.200", lg: "transparent" }}
            display={{ base: "block", md: "grid", lg: "contents" }}
            gridTemplateColumns={{ md: "1fr 1fr" }}
          >
            {/* Date Picker */}
            <Box
              gridColumn={{ md: "1", lg: "3" }}
              gridRow={{ md: "1", lg: "1" }}
              borderRight={{ md: "1px solid", lg: "1px solid" }}
              borderRightColor={{ md: "gray.200", lg: "gray.200" }}
              borderBottom={{ base: "1px solid", md: "none", lg: "none" }}
              borderBottomColor={{ base: "gray.200", md: "transparent", lg: "transparent" }}
            >
              <DatePicker
                value={checkInDate}
                onChange={setCheckInDate}
                minDate={new Date(new Date().setDate(new Date().getDate() - 1))}
                colorPallet="red"
                showToday={false}
                showPrevBeforeMinDate={false}
                children={
                  <Box p="4" cursor="pointer">
                    <Stack gap="1">
                      <Text fontSize="sm" color="gray.600" fontWeight="medium">{t('demo.checkInDate')}</Text>
                      <Text fontSize="md" fontWeight="medium" color={checkInDate ? "black" : "gray.400"}>
                        {checkInDate?.toLocaleDateString(i18n.language) ?? 'Select date'}
                      </Text>
                    </Stack>
                  </Box>
                }
              />
            </Box>

            {/* Return Date Picker */}
            <Box
              gridColumn={{ md: "2", lg: "4" }}
              gridRow={{ md: "1", lg: "1" }}
              borderRight={{ lg: "1px solid" }}
              borderRightColor={{ lg: "gray.200" }}
            >
              <DatePicker
                value={checkOutDate}
                onChange={setCheckOutDate}
                minDate={checkInDate || new Date()}
                rangeStart={checkInDate}
                rangeEnd={checkOutDate}
                colorPallet="red"
                closeOnSelect={false}
                showToday={false}
                showPrevBeforeMinDate={false}
                children={
                  <Box p="4" cursor="pointer">
                    <Stack gap="1">
                      <Text fontSize="sm" color="gray.600" fontWeight="medium">{t('demo.checkOutDate')}</Text>
                      <Text fontSize="md" fontWeight="medium" color={checkOutDate ? "black" : "gray.400"}>
                        {checkOutDate?.toLocaleDateString(i18n.language) ?? 'Optional'}
                      </Text>
                    </Stack>
                  </Box>
                }
              />
            </Box>
          </Box>

          {/* Passengers - Row 4 on small, Group 3 */}
          <Box
            gridColumn={{ base: "1", md: "3", lg: "5" }}
            gridRow={{ base: "4", md: "2", lg: "1" }}
            border={{ base: "1px solid" }}
            borderColor={{ base: "gray.200" }}
            borderRadius={{ base: "lg", md: "none", lg: "none" }}
            borderRight={{ lg: "1px solid" }}
            borderRightColor={{ lg: "gray.200" }}
          >
            <Box p="4">
              <Stack gap="1">
                <Text fontSize="sm" color="gray.600" fontWeight="medium">Passengers</Text>
                <Input
                  placeholder="1 passenger"
                  fontSize="md"
                  variant="flushed"
                  borderBottomWidth={0}
                  fontWeight="medium"
                />
              </Stack>
            </Box>
          </Box>

          {/* Search Button */}
          <Box
            gridColumn={{ base: "1", md: "4", lg: "6" }}
            gridRow={{ base: "5", md: "1 / -1", lg: "1" }}
            display="flex"
            alignItems="center"
            p={{ base: "0", md: "2", lg: "2" }}
          >
            <Box
              as="button"
              bg="blue.500"
              color="white"
              borderRadius="md"
              px="6"
              py="3"
              fontWeight="semibold"
              fontSize={{ base: "md", md: "sm", lg: "md" }}
              w="full"
              h={{ base: "12", md: "full", lg: "full" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="2"
              _hover={{ bg: "blue.600" }}
              _active={{ bg: "blue.700" }}
              cursor="pointer"
              transition="all 0.2s"
            >
              <Box as="span" fontSize="lg">
                🔍
              </Box>
              Search
            </Box>
          </Box>
        </Grid>
      </Box>
      {/* Footer */}
      {
        checkInDate && checkOutDate && (
          <Box mt="4" p="3" bg="gray.50" rounded="lg">
            <Text fontSize="sm" fontWeight="medium">{t('demo.bookingSummary')}</Text>
            <Text fontSize="sm">
              {t('demo.checkIn')} {checkInDate.toLocaleDateString(i18n.language)}
            </Text>
            <Text fontSize="sm">
              {t('demo.checkOut')} {checkOutDate.toLocaleDateString(i18n.language)}
            </Text>
            <Text fontSize="sm">
              {t('demo.duration')} {Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))} {t('demo.nights')}
            </Text>
          </Box>
        )
      }
    </Container >
  );
}
