
"use client";

import useCompanySettings from "@/hooks/useCompanySettings";
import { Box, ClientOnly, createListCollection, Flex, HStack, Image, Portal, Select, Skeleton } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function Header() {
    const { t, i18n } = useTranslation()
    const companySettings = useCompanySettings()

    const languages = createListCollection({
        items: [
            { label: t('language.english'), value: "en" },
            { label: t('language.spanish'), value: "es" },
            { label: t('language.french'), value: "fr" },
            { label: t('language.german'), value: "de" },
            { label: t('language.portuguese'), value: "pt" },
        ],
    })

    const handleLanguageChange = (details: { value: string[] }) => {
        if (details.value.length > 0) {
            i18n.changeLanguage(details.value[0]);
        }
    }

    const LanguageSelector = () => (
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
    );

    return (
        <Flex justify="space-between" align="center" py="4" minH="76px">
            <Box width={companySettings.logos.lg.width} height={companySettings.logos.lg.height} position="relative">
                <Image
                    src={companySettings.logos.lg.url}
                    alt={`${companySettings.displayName} logo`}
                    style={{ objectFit: 'contain' }}
                    rounded={companySettings.logos.lg.rounded}
                />
            </Box>
            <HStack justify="space-between" align="center">
                <Box>
                    <HStack gap="2" align="center">
                        <ClientOnly fallback={<Skeleton height="32px" width="140px" rounded="md" />}>
                            <LanguageSelector />
                        </ClientOnly>
                    </HStack>
                </Box>
            </HStack>
        </Flex>
    )
}