import { Box, Flex, HStack, Portal, Select, createListCollection } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Header() {
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

    return (
        <Flex justify="space-between" align="center" py="8">
            <Box>
                <Image src="https://www.plataforma10.com.ar/publicAssets/images/Plataforma-10-Logo.svg" alt="logo" width={160} height={160} />
            </Box>
            <HStack justify="space-between" align="center">
                <Box>
                    <HStack gap="2" align="center">
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
    )
}