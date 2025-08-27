"use client"

import {
    Box,
    Button,
    Dialog,
    Flex,
    HStack,
    IconButton,
    Input,
    Popover,
    Switch,
    Text,
    VStack,
    useBreakpointValue
} from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiMinus, FiPlus } from 'react-icons/fi'

// ============================================================================
// TYPES
// ============================================================================

export interface PassengerCounts {
    adults: number
    youth: number
    seniors: number
    students: boolean
    wheelchair: boolean
}

interface PassengersProps {
    value?: PassengerCounts
    onChange?: (passengers: PassengerCounts) => void
    placeholder?: string
    disabled?: boolean
    colorPallet?: string
    popoverProps?: PopoverProps
    children?: React.ReactNode
}

interface PopoverProps {
    offset?: {
        mainAxis?: number | undefined;
        crossAxis?: number | undefined;
    }
}

// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULT_COUNTS: PassengerCounts = {
    adults: 1,
    youth: 0,
    seniors: 0,
    students: false,
    wheelchair: false
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

interface CounterProps {
    title: string
    subtitle: string
    count: number
    onIncrement: () => void
    onDecrement: () => void
    canDecrement?: boolean
    disabled?: boolean
}

const Counter: React.FC<CounterProps> = ({
    title,
    subtitle,
    count,
    onIncrement,
    onDecrement,
    canDecrement = true,
    disabled = false
}) => (
    <Flex justify="space-between" align="center" py="3">
        <Box>
            <Text fontSize="md" fontWeight="medium" color="gray.900">
                {title}
            </Text>
            <Text fontSize="sm" color="gray.500">
                {subtitle}
            </Text>
        </Box>
        <HStack>
            <IconButton
                aria-label={`Decrease ${title.toLowerCase()}`}
                size="sm"
                variant="outline"
                onClick={(e) => {
                    e.stopPropagation()
                    onDecrement()
                }}
                disabled={disabled || !canDecrement}
                rounded="lg"
                bg="gray.50"
                _hover={{ bg: "gray.100" }}
            >
                <FiMinus />
            </IconButton>
            <Box minW="8" textAlign="center">
                <Text fontSize="md" fontWeight="medium">
                    {count}
                </Text>
            </Box>
            <IconButton
                aria-label={`Increase ${title.toLowerCase()}`}
                size="sm"
                variant="outline"
                onClick={(e) => {
                    e.stopPropagation()
                    onIncrement()
                }}
                disabled={disabled}
                rounded="lg"
                bg="gray.50"
                _hover={{ bg: "gray.100" }}
            >
                <FiPlus />
            </IconButton>
        </HStack>
    </Flex>
)

interface ToggleProps {
    title: string
    subtitle: string
    checked: boolean
    onChange: (checked: boolean) => void
    disabled?: boolean
    colorPallet?: string
}

const Toggle: React.FC<ToggleProps> = ({
    title,
    subtitle,
    checked,
    onChange,
    disabled = false,
    colorPallet = "blue"
}) => (
    <Flex justify="space-between" align="center" py="3">
        <Box flex="1">
            <Text fontSize="md" fontWeight="medium" color="gray.900">
                {title}
            </Text>
            <Text fontSize="sm" color="gray.500">
                {subtitle}
            </Text>
        </Box>
        <Switch.Root
            checked={checked}
            onCheckedChange={(e: { checked: boolean }) => onChange(e.checked)}
            disabled={disabled}
            colorPalette={colorPallet}
            onClick={(e) => e.stopPropagation()}
        >
            <Switch.HiddenInput />
            <Switch.Control />
        </Switch.Root>
    </Flex>
)

// ============================================================================
// UTILITIES
// ============================================================================

const formatPassengerText = (counts: PassengerCounts, t: any): string => {
    const total = counts.adults + counts.youth + counts.seniors
    if (total === 1) {
        return t('passengers.singular', '1 passenger')
    }
    return t('passengers.plural', `${total} passengers`, { count: total })
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const Passengers: React.FC<PassengersProps> = ({
    value,
    onChange,
    placeholder,
    disabled = false,
    colorPallet = "blue",
    popoverProps,
    children
}) => {
    const { t } = useTranslation()
    const inputRef = useRef<HTMLInputElement>(null)

    // Responsive breakpoint - use Dialog on sm and below, Popover on md and above
    const useDialog = useBreakpointValue({ base: true, md: false })

    // State
    const [isOpen, setIsOpen] = useState(false)
    const [counts, setCounts] = useState<PassengerCounts>(value || DEFAULT_COUNTS)

    // Sync with external value changes
    useEffect(() => {
        if (value) {
            setCounts(value)
        }
    }, [value])

    // ========================================================================
    // HANDLERS
    // ========================================================================

    const handleCountChange = (
        category: 'adults' | 'youth' | 'seniors',
        increment: boolean
    ) => {
        setCounts(prev => {
            const newCounts = { ...prev }
            const currentValue = newCounts[category]

            if (increment) {
                newCounts[category] = currentValue + 1
            } else {
                const minValue = category === 'adults' ? 1 : 0
                newCounts[category] = Math.max(minValue, currentValue - 1)
            }

            return newCounts
        })
    }

    const handleToggleChange = (
        category: 'students' | 'wheelchair',
        enabled: boolean
    ) => {
        setCounts(prev => ({
            ...prev,
            [category]: enabled
        }))
    }

    const handleDone = () => {
        onChange?.(counts)
        setIsOpen(false)
    }

    const handleOpenChange = (open: boolean) => {
        onChange?.(counts)
        setIsOpen(open)
    }

    // ========================================================================
    // RENDER
    // ========================================================================

    const PassengersContent = ({ inDialog = false }: { inDialog?: boolean }) => (
        <VStack gap="0" align="stretch" p={inDialog ? "6" : "6"}>
            {/* Age-based Counters */}
            <Counter
                title={t('passengers.adults', 'Adults')}
                subtitle={t('passengers.adultsAge', '19-59 years')}
                count={counts.adults}
                onIncrement={() => handleCountChange('adults', true)}
                onDecrement={() => handleCountChange('adults', false)}
                canDecrement={counts.adults > 1}
                disabled={disabled}
            />

            <Counter
                title={t('passengers.youth', 'Youth')}
                subtitle={t('passengers.youthAge', '0-18 years')}
                count={counts.youth}
                onIncrement={() => handleCountChange('youth', true)}
                onDecrement={() => handleCountChange('youth', false)}
                canDecrement={counts.youth > 0}
                disabled={disabled}
            />

            <Counter
                title={t('passengers.seniors', 'Seniors')}
                subtitle={t('passengers.seniorsAge', '60+ years')}
                count={counts.seniors}
                onIncrement={() => handleCountChange('seniors', true)}
                onDecrement={() => handleCountChange('seniors', false)}
                canDecrement={counts.seniors > 0}
                disabled={disabled}
            />

            {/* Special Requirements */}
            <Box borderTopWidth="1px" borderColor="gray.200" mt="4" pt="4">
                <Toggle
                    title={t('passengers.students', 'Students')}
                    subtitle={t('passengers.studentsDesc', 'Discounts may apply for passengers with a valid student ID.')}
                    checked={counts.students}
                    onChange={(checked) => handleToggleChange('students', checked)}
                    disabled={disabled}
                    colorPallet={colorPallet}
                />

                <Toggle
                    title={t('passengers.wheelchair', 'Wheelchair')}
                    subtitle={t('passengers.wheelchairDesc', 'Passengers traveling with a wheelchair')}
                    checked={counts.wheelchair}
                    onChange={(checked) => handleToggleChange('wheelchair', checked)}
                    disabled={disabled}
                    colorPallet={colorPallet}
                />
            </Box>

            {/* Done Button */}
            <Button
                colorPalette="gray"
                onClick={handleDone}
                w="full"
                mt="6"
                variant="outline"
                rounded="full"
            >
                {t('passengers.done', 'Done')}
            </Button>
        </VStack>
    )

    // Small screens (base to sm): Use Dialog
    if (useDialog) {
        return (
            <>
                {children ? (
                    <Box
                        cursor={disabled ? 'not-allowed' : 'pointer'}
                        onClick={() => !disabled && setIsOpen(true)}
                    >
                        {children}
                    </Box>
                ) : (
                    <Box position="relative" display="inline-block">
                        <Input
                            ref={inputRef}
                            value={formatPassengerText(counts, t)}
                            placeholder={placeholder || t('passengers.placeholder', 'Select passengers')}
                            readOnly
                            disabled={disabled}
                            cursor={disabled ? 'not-allowed' : 'pointer'}
                            onClick={() => !disabled && setIsOpen(true)}
                            pr="10"
                        />
                    </Box>
                )}
                <Dialog.Root
                    open={isOpen}
                    onOpenChange={(e) => handleOpenChange(e.open)}
                >
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content maxW="sm" w="full" mx="4" rounded="2xl">
                            <Dialog.Header>
                                <Dialog.Title fontSize="lg" fontWeight="semibold">
                                    {t('passengers.title', 'Passengers')}
                                </Dialog.Title>
                                <Dialog.CloseTrigger />
                            </Dialog.Header>
                            <Dialog.Body p="0">
                                <PassengersContent inDialog={true} />
                            </Dialog.Body>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Dialog.Root>
            </>
        )
    }

    // Medium screens and above (md+): Use Popover
    return (
        <Popover.Root
            open={isOpen}
            onOpenChange={(e) => handleOpenChange(e.open)}
            positioning={{ placement: "bottom-start", offset: popoverProps?.offset }}
        >
            <Popover.Trigger asChild>
                {children ? (
                    <Box cursor={disabled ? 'not-allowed' : 'pointer'}>
                        {children}
                    </Box>
                ) : (
                    <Box position="relative" display="inline-block">
                        <Input
                            ref={inputRef}
                            value={formatPassengerText(counts, t)}
                            placeholder={placeholder || t('passengers.placeholder', 'Select passengers')}
                            readOnly
                            disabled={disabled}
                            cursor={disabled ? 'not-allowed' : 'pointer'}
                            pr="10"
                        />
                    </Box>
                )}
            </Popover.Trigger>

            <Popover.Positioner>
                <Popover.Content w="350px" p="0" rounded="2xl">
                    <Popover.Body>
                        <PassengersContent inDialog={false} />
                    </Popover.Body>
                </Popover.Content>
            </Popover.Positioner>
        </Popover.Root>
    )
}

export default Passengers