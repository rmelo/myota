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
                    500: { value: "#028760" }, // base
                    600: { value: "#017956" },
                    700: { value: "#015e43" },
                    800: { value: "#014330" },
                    900: { value: "#00281c" },
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
            }
        }
    }
}

const customSystem = createSystem(defaultConfig, customConfig)

export default customSystem
