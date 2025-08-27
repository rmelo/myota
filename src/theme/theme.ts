import { createSystem, defaultConfig } from '@chakra-ui/react'
import { Hanken_Grotesk } from 'next/font/google'

const font1 = Hanken_Grotesk({
    weight: ['400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
    display: 'swap'
})

const customConfig = {
    theme: {
        tokens: {
            fonts: {
                heading: { value: font1.style.fontFamily },
                body: { value: font1.style.fontFamily }
            },
            colors: {
                p10: {
                    50: { value: "#ffe8e3" },
                    100: { value: "#ffc7b8" },
                    200: { value: "#ffa18a" },
                    300: { value: "#ff7a5c" },
                    400: { value: "#ff5433" },
                    500: { value: "#fe2f0b" },
                    600: { value: "#d62809" },
                    700: { value: "#ad2007" },
                    800: { value: "#851805" },
                    900: { value: "#5c1003" },
                },
                deonibus: {
                    50: { value: "#e5f3ef" },
                    100: { value: "#cce7df" },
                    200: { value: "#b3dbcf" },
                    300: { value: "#99cfbf" },
                    400: { value: "#80c3af" },
                    500: { value: "#028760" },
                    600: { value: "#017956" },
                    700: { value: "#015e43" },
                    800: { value: "#014330" },
                    900: { value: "#00281c" },
                },
                '12go': {
                    50: { value: "#ecf5ec" },
                    100: { value: "#d9ebd9" },
                    200: { value: "#b3d7b3" },
                    300: { value: "#8dc38d" },
                    400: { value: "#67af67" },
                    500: { value: "#4CB748" },
                    600: { value: "#337933" },
                    700: { value: "#2b672b" },
                    800: { value: "#225422" },
                    900: { value: "#1a421a" },
                },
                bookaway: {
                    50: { value: "#fff0e6" },
                    100: { value: "#ffd6b3" },
                    200: { value: "#ffbb80" },
                    300: { value: "#ff9f4d" },
                    400: { value: "#ff8526" },
                    500: { value: "#FE5E00" },
                    600: { value: "#e65500" },
                    700: { value: "#cc4c00" },
                    800: { value: "#b34300" },
                    900: { value: "#802f00" },
                },
            }
        },
        semanticTokens: {
            colors: {
                p10: {
                    solid: { value: "{colors.p10.500}" },
                    contrast: { value: "white" },
                    fg: { value: "{colors.p10.700}" },
                    muted: { value: "{colors.p10.100}" },
                    subtle: { value: "{colors.p10.200}" },
                    emphasized: { value: "{colors.p10.300}" },
                    focusRing: { value: "{colors.p10.500}" },
                },
                deonibus: {
                    solid: { value: "{colors.deonibus.500}" },
                    contrast: { value: "white" },
                    fg: { value: "{colors.deonibus.700}" },
                    muted: { value: "{colors.deonibus.100}" },
                    subtle: { value: "{colors.deonibus.200}" },
                    emphasized: { value: "{colors.deonibus.300}" },
                    focusRing: { value: "{colors.deonibus.500}" },
                },
                '12go': {
                    solid: { value: "{colors.12go.500}" },
                    contrast: { value: "white" },
                    fg: { value: "{colors.12go.700}" },
                    muted: { value: "{colors.12go.100}" },
                    subtle: { value: "{colors.12go.200}" },
                    emphasized: { value: "{colors.12go.300}" },
                    focusRing: { value: "{colors.12go.500}" },
                },
                bookaway: {
                    solid: { value: "{colors.bookaway.500}" },
                    contrast: { value: "white" },
                    fg: { value: "{colors.bookaway.700}" },
                    muted: { value: "{colors.bookaway.100}" },
                    subtle: { value: "{colors.bookaway.200}" },
                    emphasized: { value: "{colors.bookaway.300}" },
                    focusRing: { value: "{colors.bookaway.500}" },
                },
            }
        }
    }
}

const customSystem = createSystem(defaultConfig, customConfig)

export default customSystem
