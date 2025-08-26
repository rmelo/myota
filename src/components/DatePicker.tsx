"use client"

import i18n from '@/i18n/config'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import {
    Box,
    Button,
    Center,
    Grid,
    HStack,
    IconButton,
    Input,
    Popover,
    Text,
    VStack,
} from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface DatePickerProps {
    value?: Date
    onChange?: (date: Date) => void
    placeholder?: string
    disabled?: boolean
    minDate?: Date
    maxDate?: Date
    // Range selection props
    rangeStart?: Date
    rangeEnd?: Date
    colorPallet?: string
}



export const DatePicker: React.FC<DatePickerProps> = ({
    value,
    onChange,
    placeholder,
    disabled = false,
    minDate,
    maxDate,
    rangeStart,
    rangeEnd,
    colorPallet = "blue"
}) => {
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const [currentMonth, setCurrentMonth] = useState(value ? value.getMonth() : new Date().getMonth())
    const [currentYear, setCurrentYear] = useState(value ? value.getFullYear() : new Date().getFullYear())
    const inputRef = useRef<HTMLInputElement>(null)

    const MONTHS = [
        t('datePicker.months.january'),
        t('datePicker.months.february'),
        t('datePicker.months.march'),
        t('datePicker.months.april'),
        t('datePicker.months.may'),
        t('datePicker.months.june'),
        t('datePicker.months.july'),
        t('datePicker.months.august'),
        t('datePicker.months.september'),
        t('datePicker.months.october'),
        t('datePicker.months.november'),
        t('datePicker.months.december')
    ]

    const WEEKDAYS = [
        t('datePicker.weekdays.short.sunday'),
        t('datePicker.weekdays.short.monday'),
        t('datePicker.weekdays.short.tuesday'),
        t('datePicker.weekdays.short.wednesday'),
        t('datePicker.weekdays.short.thursday'),
        t('datePicker.weekdays.short.friday'),
        t('datePicker.weekdays.short.saturday')
    ]

    const formatDate = (date: Date): string => {
        return date.toLocaleDateString(i18n.language || 'en', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })
    }



    const getDaysInMonth = (month: number, year: number): number => {
        return new Date(year, month + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (month: number, year: number): number => {
        return new Date(year, month, 1).getDay()
    }

    const isDateDisabled = (date: Date): boolean => {
        if (disabled) return true
        if (minDate && date < minDate) return true
        if (maxDate && date > maxDate) return true
        return false
    }

    const isDateSelected = (date: Date): boolean => {
        if (!value) return false
        return (
            date.getDate() === value.getDate() &&
            date.getMonth() === value.getMonth() &&
            date.getFullYear() === value.getFullYear()
        )
    }

    const isToday = (date: Date): boolean => {
        const today = new Date()
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        )
    }

    const isSunday = (date: Date): boolean => {
        return date.getDay() === 0
    }

    const isSaturday = (date: Date): boolean => {
        return date.getDay() === 6
    }

    const isInRange = (date: Date): boolean => {
        if (!rangeStart || !rangeEnd) return false
        const dateTime = date.getTime()
        const startTime = rangeStart.getTime()
        const endTime = rangeEnd.getTime()
        return dateTime >= startTime && dateTime <= endTime
    }

    const isRangeStart = (date: Date): boolean => {
        if (!rangeStart) return false
        return (
            date.getDate() === rangeStart.getDate() &&
            date.getMonth() === rangeStart.getMonth() &&
            date.getFullYear() === rangeStart.getFullYear()
        )
    }

    const isRangeEnd = (date: Date): boolean => {
        if (!rangeEnd) return false
        return (
            date.getDate() === rangeEnd.getDate() &&
            date.getMonth() === rangeEnd.getMonth() &&
            date.getFullYear() === rangeEnd.getFullYear()
        )
    }

    const getFirstSundayOfMonth = (month: number, year: number): Date => {
        const firstDay = new Date(year, month, 1)
        const dayOfWeek = firstDay.getDay()
        const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek
        return new Date(year, month, 1 + daysUntilSunday)
    }

    const getLastSundayOfMonth = (month: number, year: number): Date => {
        const lastDay = new Date(year, month + 1, 0)
        const daysInMonth = lastDay.getDate()

        // Start from the last day and work backwards to find the last Sunday
        for (let day = daysInMonth; day >= 1; day--) {
            const date = new Date(year, month, day)
            if (date.getDay() === 0) { // Sunday
                return date
            }
        }

        // Fallback (shouldn't happen)
        return new Date(year, month, 1)
    }

    const getFirstSaturdayOfMonth = (month: number, year: number): Date => {
        const firstDay = new Date(year, month, 1)
        const dayOfWeek = firstDay.getDay()
        const daysUntilSaturday = dayOfWeek === 6 ? 0 : 6 - dayOfWeek
        return new Date(year, month, 1 + daysUntilSaturday)
    }

    const getLastSaturdayOfMonth = (month: number, year: number): Date => {
        const lastDay = new Date(year, month + 1, 0)
        const daysInMonth = lastDay.getDate()

        // Start from the last day and work backwards to find the last Saturday
        for (let day = daysInMonth; day >= 1; day--) {
            const date = new Date(year, month, day)
            if (date.getDay() === 6) { // Saturday
                return date
            }
        }

        // Fallback (shouldn't happen)
        return new Date(year, month, 1)
    }

    const handleDateSelect = (day: number) => {
        const selectedDate = new Date(currentYear, currentMonth, day)
        if (!isDateDisabled(selectedDate)) {
            onChange?.(selectedDate)
            setIsOpen(false)
        }
    }

    const navigateMonth = (direction: 'prev' | 'next') => {
        if (direction === 'prev') {
            if (currentMonth === 0) {
                setCurrentMonth(11)
                setCurrentYear(currentYear - 1)
            } else {
                setCurrentMonth(currentMonth - 1)
            }
        } else {
            if (currentMonth === 11) {
                setCurrentMonth(0)
                setCurrentYear(currentYear + 1)
            } else {
                setCurrentMonth(currentMonth + 1)
            }
        }
    }

    const renderCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentMonth, currentYear)
        const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
        const days: React.ReactNode[] = []

        // Empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            days.push(
                <Box key={`empty-${i}`}>
                    <Box h="12" minW="12" />
                </Box>
            )
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentYear, currentMonth, day)
            const disabled = isDateDisabled(date)
            const selected = isDateSelected(date)
            const today = isToday(date)
            const weekend = isSunday(date) || isSaturday(date)
            const isFirstSundayOfMonth = date.getDate() === getFirstSundayOfMonth(currentMonth, currentYear).getDate()
            const isLastSundayOfMonth = date.getDate() === getLastSundayOfMonth(currentMonth, currentYear).getDate()
            const isFirstSaturdayOfMonth = date.getDate() === getFirstSaturdayOfMonth(currentMonth, currentYear).getDate()
            const isLastSaturdayOfMonth = date.getDate() === getLastSaturdayOfMonth(currentMonth, currentYear).getDate()

            // Range selection checks
            const inRange = isInRange(date)
            const rangeStart = isRangeStart(date)
            const rangeEnd = isRangeEnd(date)

            // Determine styling priority: Range > Weekend > Default
            let boxBg = undefined
            let boxRangeBg = undefined
            let borderTopRadius = undefined
            let borderBottomRadius = undefined
            let borderLeftRadius = undefined
            let borderRightRadius = undefined

            let buttonVariant: "solid" | "ghost" | "outline" | "subtle" | "surface" | "plain" = selected ? "solid" : "ghost"
            let buttonColorPalette = selected ? colorPallet : undefined
            let buttonBg = undefined



            if (weekend) {
                // Weekend styling (only if not in range)
                boxBg = "gray.100"
                if ((isSunday(date) && isFirstSundayOfMonth) || (isSaturday(date) && isFirstSaturdayOfMonth)) {
                    borderTopRadius = "full"
                }
                if ((isSunday(date) && isLastSundayOfMonth) || (isSaturday(date) && isLastSaturdayOfMonth)) {
                    borderBottomRadius = "full"
                }
            }

            if (inRange)
                boxRangeBg = `${colorPallet}.100/40`

            if (rangeStart || rangeEnd)
                buttonBg = `${colorPallet}.500`

            if (rangeStart)
                borderLeftRadius = "full"

            if (rangeEnd)
                borderRightRadius = "full"

            const size = "12"

            days.push(
                <Box key={day}
                    p="4"
                    w={size}
                    h={size}
                    borderTopRadius={borderTopRadius}
                    borderBottomRadius={borderBottomRadius}
                    bg={boxBg}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Box
                        bg={boxRangeBg}
                        borderLeftRadius={borderLeftRadius}
                        borderRightRadius={borderRightRadius}
                    >
                        <Button
                            size="sm"
                            variant={buttonVariant}
                            colorPalette={buttonColorPalette}
                            bg={buttonBg}
                            _hover={!disabled ? {
                                bg: rangeStart || rangeEnd ? `${colorPallet}.600` :
                                    inRange ? `${colorPallet}.200` :
                                        selected ? `${colorPallet}.600` : "gray.200"
                            } : {}}
                            disabled={disabled}
                            onClick={() => handleDateSelect(day)}
                            fontSize="sm"
                            rounded="full"
                            w={size}
                            h={size}
                            color={rangeStart || rangeEnd || selected ? "white" : undefined}
                        >
                            {day}
                        </Button>
                    </Box>
                </Box>
            )
        }

        return days
    }

    return (
        <Popover.Root
            open={isOpen}
            onOpenChange={(e) => setIsOpen(e.open)}
            positioning={{ placement: "bottom-start" }}
        >
            <Popover.Trigger asChild>
                <Box position="relative" display="inline-block">
                    <Input
                        ref={inputRef}
                        value={value ? formatDate(value) : ''}
                        placeholder={placeholder || t('datePicker.placeholder')}
                        readOnly
                        disabled={disabled}
                        onClick={() => !disabled && setIsOpen(!isOpen)}
                        cursor={disabled ? 'not-allowed' : 'pointer'}
                        pr="10"
                    />
                </Box>
            </Popover.Trigger>
            <Popover.Positioner>
                <Popover.Content w="fit-content" minW="280px" p="4">
                    <Popover.Body>
                        <VStack gap="4">
                            {/* Month/Year Navigation */}
                            <HStack justify="space-between" w="full">
                                <IconButton
                                    aria-label="Previous month"
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => navigateMonth('prev')}
                                >
                                    <ChevronLeftIcon />
                                </IconButton>
                                <Text fontSize="sm" fontWeight="semibold">
                                    {MONTHS[currentMonth]} {currentYear}
                                </Text>
                                <IconButton
                                    aria-label="Next month"
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => navigateMonth('next')}
                                >
                                    <ChevronRightIcon />
                                </IconButton>
                            </HStack>

                            {/* Weekday Headers */}
                            <Grid templateColumns="repeat(7, 1fr)" gap="1" w="full">
                                {WEEKDAYS.map((day) => (
                                    <Center key={day} h="8">
                                        <Text fontSize="xs" fontWeight="medium" color="gray.500">
                                            {day}
                                        </Text>
                                    </Center>
                                ))}
                            </Grid>

                            {/* Calendar Days */}
                            <Grid templateColumns="repeat(7, 1fr)" gap="0" w="full" minW="252px">
                                {renderCalendarDays()}
                            </Grid>

                            {/* Today Button */}
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                    const today = new Date()
                                    setCurrentMonth(today.getMonth())
                                    setCurrentYear(today.getFullYear())
                                    if (!isDateDisabled(today)) {
                                        onChange?.(today)
                                        setIsOpen(false)
                                    }
                                }}
                                w="full"
                            >
                                {t('datePicker.today')}
                            </Button>
                        </VStack>
                    </Popover.Body>
                </Popover.Content>
            </Popover.Positioner>
        </Popover.Root>
    )
}

export default DatePicker
