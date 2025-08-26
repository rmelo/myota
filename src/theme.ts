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
            }
        }
    }
}

const customSystem = createSystem(defaultConfig, customConfig)

export default customSystem
