"use client"

import { Box, Container, createListCollection, Flex, Heading, HStack, Input, Portal, Select, Stack, Text, VStack } from "@chakra-ui/react";
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
    <Container border="1px solid" borderColor="red.200">
      {/* Header */}
      <Flex justify="space-between" align="center" py="8" border="1px solid" borderColor="blue.200">
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
      {/* Body */}
      <Flex justify="space-between" align="center" borderRadius="lg" border="1px solid" borderColor="green.200">
        <Stack gap="0" direction={[]}>
          <Box>
            <Box p="4">
              <Stack gap="0">
                <Text fontSize="sm" color="gray.600" fontWeight="medium">Origin</Text>
                <Input
                  placeholder="São Paulo, BR"
                  fontSize="md"
                  variant="flushed"
                  borderBottomWidth={0}
                />
              </Stack>
            </Box>
          </Box>
          <Box>
            <Box p="4" >
              <Stack gap="0">
                <Text fontSize="sm" color="gray.600" fontWeight="medium">Destination</Text>
                <Input
                  placeholder="Rio de Janeiro, BR"
                  fontSize="md"
                  variant="flushed"
                  borderBottomWidth={0}
                />
              </Stack>
            </Box>
          </Box>
        </Stack>
        <Box>
          <DatePicker
            value={checkInDate}
            onChange={setCheckInDate}
            minDate={new Date(new Date().setDate(new Date().getDate() - 1))}
            colorPallet="red"
            showToday={false}
            showPrevBeforeMinDate={false}
            children={<Box p="4">
              <Stack gap="0">
                <Text fontSize="sm" color="gray.600" fontWeight="medium">{t('demo.checkInDate')}</Text>
                <Input
                  placeholder={checkInDate?.toLocaleDateString(i18n.language) ?? '-'}
                  fontSize="md"
                  variant="flushed"
                  borderBottomWidth={0}
                  readOnly
                />
              </Stack>
            </Box>}
          />
        </Box>
        <Box>
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
            children={<Box p="4">
              <Stack gap="0">
                <Text fontSize="sm" color="gray.600" fontWeight="medium">{t('demo.checkOutDate')}</Text>
                <Input
                  placeholder={checkOutDate?.toLocaleDateString(i18n.language) ?? '-'}
                  fontSize="md"
                  variant="flushed"
                  borderBottomWidth={0}
                  readOnly
                />
              </Stack>
            </Box>}
          />
        </Box>
        <Box>
          <Box p="4" >
            <Stack gap="0">
              <Text fontSize="sm" color="gray.600" fontWeight="medium">Passengers</Text>
              <Input
                placeholder="1 Passenger"
                fontSize="md"
                variant="flushed"
                borderBottomWidth={0}
              />
            </Stack>
          </Box>
        </Box>
      </Flex>
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
