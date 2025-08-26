"use client"

import { Box, Container, createListCollection, Heading, HStack, Portal, Select, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ClientOnly } from "../components/ClientOnly";
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
    <Container maxW="4xl" py="8">
      <VStack gap="8">
        <HStack justify="space-between" align="center">
          <Heading size="xl">{t('demo.title')}</Heading>
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

        <Box bg="gray.50" p="6" borderRadius="lg">
          <VStack gap="6" >
            <Box>
              <ClientOnly>
                <HStack gap="4" align="start">
                  <Box flex="1">
                    <Text mb="2" fontSize="sm" fontWeight="medium">{t('demo.checkInDate')}</Text>
                    <DatePicker
                      value={checkInDate}
                      onChange={setCheckInDate}
                      minDate={new Date(new Date().setDate(new Date().getDate() - 1))}
                      colorPallet="pink"
                    />
                  </Box>
                  <Box flex="1">
                    <Text mb="2" fontSize="sm" fontWeight="medium">{t('demo.checkOutDate')}</Text>
                    <DatePicker
                      value={checkOutDate}
                      onChange={setCheckOutDate}
                      minDate={checkInDate || new Date()}
                      rangeStart={checkInDate}
                      rangeEnd={checkOutDate}
                      colorPallet="pink"
                    />
                  </Box>
                </HStack>
              </ClientOnly>
              {checkInDate && checkOutDate && (
                <Box mt="4" p="3" bg="blue.50" borderRadius="md">
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
              )}
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
