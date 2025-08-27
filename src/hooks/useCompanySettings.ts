"use client"

import { getCompanyIdByDomain, getCompanySettings } from '@/core/companies'
import { getLogoProps } from '@/theme/logos'
import type { ColorPalette } from '@chakra-ui/react'
import { useMemo } from 'react'

// Company color mappings
const companyColors: Record<string, ColorPalette> = {
    p10: 'p10' as ColorPalette,
    deonibus: 'deonibus' as ColorPalette,
}

export interface CompanySettings {
    companyId: string
    displayName: string
    theme: string
    color: ColorPalette
    logos: {
        sm: {
            url: string
            width: string
            height: string
            rounded?: string
        }
        lg: {
            url: string
            width: string
            height: string
            rounded?: string
        }
    }
}

/**
 * Custom hook that provides company-specific settings based on the current domain.
 * 
 * @returns {CompanySettings} Company settings including ID, display name, theme, color palette, and logos
 * 
 * @example
 * ```tsx
 * import useCompanySettings from '@/hooks/useCompanySettings'
 * 
 * function MyComponent() {
 *   const companySettings = useCompanySettings()
 *   
 *   return (
 *     <div>
 *       <h1>{companySettings.displayName}</h1>
 *       <Button colorPalette={companySettings.color}>Click me</Button>
 *       <img src={companySettings.logos.lg.url} alt="Company Logo" />
 *     </div>
 *   )
 * }
 * ```
 */
export function useCompanySettings(): CompanySettings {
    const settings = useMemo(() => {
        // Get current domain
        const domain = typeof window !== 'undefined' ? window.location.host : 'localhost:3000'

        // Get company ID from domain
        const companyId = getCompanyIdByDomain(domain)

        // Get company basic settings
        const companyInfo = getCompanySettings(companyId)

        // Get company color
        const color = companyColors[companyId] || 'p10'

        // Get company logos
        const logoSm = getLogoProps(companyId, 'sm')
        const logoLg = getLogoProps(companyId, 'lg')

        return {
            companyId,
            displayName: companyInfo.displayName,
            theme: companyInfo.theme,
            color,
            logos: {
                sm: logoSm,
                lg: logoLg,
            },
        }
    }, [])

    return settings
}

export default useCompanySettings
