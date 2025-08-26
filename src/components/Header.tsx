import { Box, ClientOnly, createListCollection, Flex, HStack, Portal, Select, Skeleton } from "@chakra-ui/react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Header() {
    const { t, i18n } = useTranslation();

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
        <Flex justify="space-between" align="center" py="8" minH="76px">
            <Box width="160px" height="40px" position="relative">
                <Image
                    src="https://www.plataforma10.com.ar/publicAssets/images/Plataforma-10-Logo.svg"
                    alt="logo"
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
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