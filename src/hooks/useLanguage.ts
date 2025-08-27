"use client"

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useCompanySettings from './useCompanySettings'

/**
 * Custom hook that manages language settings with company defaults and localStorage persistence.
 * 
 * This hook:
 * 1. Checks if there's a language saved in localStorage
 * 2. If no language in localStorage, uses the company's default language
 * 3. If user changes language, saves it to localStorage and keeps using it
 * 
 * @returns {Object} Object containing current language, change function, and i18n instance
 * 
 * @example
 * ```tsx
 * import { useLanguage } from '@/hooks/useLanguage'
 * 
 * function MyComponent() {
 *   const { currentLanguage, changeLanguage, i18n } = useLanguage()
 *   
 *   return (
 *     <div>
 *       <p>Current language: {currentLanguage}</p>
 *       <button onClick={() => changeLanguage('es')}>
 *         Change to Spanish
 *       </button>
 *     </div>
 *   )
 * }
 * ```
 */
export function useLanguage() {
    const { i18n } = useTranslation()
    const companySettings = useCompanySettings()
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language)
    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
        // Add some debugging
        console.log('useLanguage effect running:', {
            isInitialized,
            i18nLanguage: i18n.language,
            currentLanguage,
            companyDefaultLanguage: companySettings.defaultLanguage,
            localStorage: localStorage.getItem('i18nextLng')
        })

                // Wait for both i18n and company settings to be ready
        if (!isInitialized && companySettings.defaultLanguage && i18n.isInitialized) {
            const savedLanguage = localStorage.getItem('i18nextLng')
            const userLanguageChoice = localStorage.getItem('userLanguageChoice') // Our custom flag
            
            console.log('Checking language state:', { 
                savedLanguage, 
                userLanguageChoice,
                companyDefault: companySettings.defaultLanguage,
                i18nLanguage: i18n.language 
            })
            
            // If no user choice flag exists, it means language was set automatically (not by user)
            if (!userLanguageChoice) {
                console.log('No user language choice found, setting company default:', companySettings.defaultLanguage)
                i18n.changeLanguage(companySettings.defaultLanguage).then(() => {
                    setCurrentLanguage(companySettings.defaultLanguage)
                    // Mark that this is now the user's "default" choice (company default)
                    localStorage.setItem('userLanguageChoice', 'true')
                })
            } else {
                // User has made a choice, respect it
                console.log('Using user language preference:', savedLanguage)
                setCurrentLanguage(savedLanguage || i18n.language)
                if (savedLanguage && i18n.language !== savedLanguage) {
                    i18n.changeLanguage(savedLanguage)
                }
            }
            setIsInitialized(true)
        }
    }, [companySettings.defaultLanguage, i18n, isInitialized, i18n.isInitialized])

    // Listen to i18n language changes
    useEffect(() => {
        const handleLanguageChange = (lng: string) => {
            console.log('i18n language changed to:', lng)
            setCurrentLanguage(lng)
        }

        i18n.on('languageChanged', handleLanguageChange)
        return () => {
            i18n.off('languageChanged', handleLanguageChange)
        }
    }, [i18n])

    const changeLanguage = (language: string) => {
        console.log('User changing language to:', language)
        i18n.changeLanguage(language)
        setCurrentLanguage(language)
        // Mark that user has made a language choice
        localStorage.setItem('userLanguageChoice', 'true')
    }

    return {
        currentLanguage,
        changeLanguage,
        i18n,
        isInitialized
    }
}

export default useLanguage
