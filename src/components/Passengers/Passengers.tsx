"use client"

import {
    Box,
    Button,
    Flex,
    HStack,
    IconButton,
    Input,
    Popover,
    Switch,
    Text,
    VStack
} from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiMinus, FiPlus } from 'react-icons/fi'

interface PassengersProps {
    value?: PassengerCounts
    onChange?: (passengers: PassengerCounts) => void
    placeholder?: string
    disabled?: boolean
    colorPallet?: string
    children?: React.ReactNode
}

interface PassengerCounts {
    adults: number
    youth: number
    seniors: number
    students: boolean
    wheelchair: boolean
}

export const Passengers: React.FC<PassengersProps> = ({
    value,
    onChange,
    placeholder,
    disabled = false,
    colorPallet = "blue",
    children
}) => {
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const defaultCounts: PassengerCounts = {
        adults: 1,
        youth: 0,
        seniors: 0,
        students: false,
        wheelchair: false
    }

    // Internal state for passenger counts
    const [internalCounts, setInternalCounts] = useState<PassengerCounts>(value || defaultCounts)

    // Sync internal state when value prop changes
    useEffect(() => {
        if (value) {
            setInternalCounts(value)
        }
    }, [value])

    // Use internal counts for all operations
    const currentCounts = internalCounts

    const formatPassengerText = (counts: PassengerCounts): string => {
        const total = counts.adults + counts.youth + counts.seniors
        if (total === 1) {
            return t('passengers.singular', '1 passenger')
        }
        return t('passengers.plural', `${total} passengers`, { count: total })
    }

    const updateCount = (category: keyof Pick<PassengerCounts, 'adults' | 'youth' | 'seniors'>, increment: boolean) => {
        const newCounts = { ...currentCounts }
        const currentValue = newCounts[category]

        if (increment) {
            newCounts[category] = currentValue + 1
        } else {
            // Prevent adults from going below 1, others can go to 0
            const minValue = category === 'adults' ? 1 : 0
            newCounts[category] = Math.max(minValue, currentValue - 1)
        }

        // Update internal state only, don't call onChange yet
        setInternalCounts(newCounts)
    }

    const updateToggle = (category: keyof Pick<PassengerCounts, 'students' | 'wheelchair'>, enabled: boolean) => {
        const newCounts = { ...currentCounts }
        newCounts[category] = enabled

        // Update internal state only, don't call onChange yet
        setInternalCounts(newCounts)
    }

    const CounterRow = ({
        title,
        subtitle,
        count,
        onIncrement,
        onDecrement,
        canDecrement = true
    }: {
        title: string
        subtitle: string
        count: number
        onIncrement: () => void
        onDecrement: () => void
        canDecrement?: boolean
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

    const ToggleRow = ({
        title,
        subtitle,
        checked,
        onChange: onToggleChange
    }: {
        title: string
        subtitle: string
        checked: boolean
        onChange: (checked: boolean) => void
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
                onCheckedChange={(e: { checked: boolean }) => onToggleChange(e.checked)}
                disabled={disabled}
                colorPalette={colorPallet}
                onClick={(e) => e.stopPropagation()}
            >
                <Switch.HiddenInput />
                <Switch.Control />
            </Switch.Root>
        </Flex>
    )

    return (
        <Popover.Root
            open={isOpen}
            onOpenChange={(e) => setIsOpen(e.open)}
            positioning={{ placement: "bottom-start" }}
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
                            value={formatPassengerText(currentCounts)}
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
                        <VStack gap="1" align="stretch">
                            <CounterRow
                                title={t('passengers.adults', 'Adults')}
                                subtitle={t('passengers.adultsAge', '19-59 years')}
                                count={currentCounts.adults}
                                onIncrement={() => updateCount('adults', true)}
                                onDecrement={() => updateCount('adults', false)}
                                canDecrement={currentCounts.adults > 1}
                            />

                            <CounterRow
                                title={t('passengers.youth', 'Youth')}
                                subtitle={t('passengers.youthAge', '0-18 years')}
                                count={currentCounts.youth}
                                onIncrement={() => updateCount('youth', true)}
                                onDecrement={() => updateCount('youth', false)}
                                canDecrement={currentCounts.youth > 0}
                            />

                            <CounterRow
                                title={t('passengers.seniors', 'Seniors')}
                                subtitle={t('passengers.seniorsAge', '60+ years')}
                                count={currentCounts.seniors}
                                onIncrement={() => updateCount('seniors', true)}
                                onDecrement={() => updateCount('seniors', false)}
                                canDecrement={currentCounts.seniors > 0}
                            />

                            <Box borderTopWidth="1px" borderColor="gray.200" mt="4" pt="4">
                                <ToggleRow
                                    title={t('passengers.students', 'Students')}
                                    subtitle={t('passengers.studentsDesc', 'Discounts may apply for passengers with a valid student ID.')}
                                    checked={currentCounts.students}
                                    onChange={(checked) => updateToggle('students', checked)}
                                />

                                <ToggleRow
                                    title={t('passengers.wheelchair', 'Wheelchair')}
                                    subtitle={t('passengers.wheelchairDesc', 'Passengers traveling with a wheelchair')}
                                    checked={currentCounts.wheelchair}
                                    onChange={(checked) => updateToggle('wheelchair', checked)}
                                />
                            </Box>

                            {/* Done Button */}
                            <Button
                                colorPalette={colorPallet}
                                onClick={() => {
                                    // Send final values to parent
                                    onChange?.(internalCounts)
                                    setIsOpen(false)
                                }}
                                w="full"
                                mt="4"
                            >
                                {t('passengers.done', 'Done')}
                            </Button>
                        </VStack>
                    </Popover.Body>
                </Popover.Content>
            </Popover.Positioner>
        </Popover.Root>
    )
}

export default Passengers
