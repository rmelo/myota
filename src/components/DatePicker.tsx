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
}



export const DatePicker: React.FC<DatePickerProps> = ({
    value,
    onChange,
    placeholder,
    disabled = false,
    minDate,
    maxDate,
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

    const getFirstSundayOfMonth = (month: number, year: number): Date => {
        const firstDay = new Date(year, month, 1)
        const dayOfWeek = firstDay.getDay()
        const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek
        return new Date(year, month, 1 + daysUntilSunday)
    }

    const getLastSundayOfMonth = (month: number, year: number): Date => {
        const lastDay = new Date(year, month + 1, 0)
        const dayOfWeek = lastDay.getDay()
        const daysBackToSunday = dayOfWeek === 0 ? 0 : dayOfWeek
        return new Date(year, month + 1, 0 - daysBackToSunday)
    }

    const getFirstSaturdayOfMonth = (month: number, year: number): Date => {
        const firstDay = new Date(year, month, 1)
        const dayOfWeek = firstDay.getDay()
        const daysUntilSaturday = dayOfWeek === 6 ? 0 : 6 - dayOfWeek
        return new Date(year, month, 1 + daysUntilSaturday)
    }

    const getLastSaturdayOfMonth = (month: number, year: number): Date => {
        const lastDay = new Date(year, month + 1, 0)
        const dayOfWeek = lastDay.getDay()
        const daysBackToSaturday = dayOfWeek === 6 ? 0 : dayOfWeek
        return new Date(year, month + 1, 0 - daysBackToSaturday)
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
            days.push(<Box key={`empty-${i}`} />)
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

            days.push(
                <Button
                    key={day}
                    size="sm"
                    variant={selected ? "solid" : "ghost"}
                    colorPalette={selected ? "blue" : undefined}
                    bg={weekend && !selected ? "gray.200" : undefined}
                    _hover={!disabled ? { bg: selected ? "blue.600" : "gray.100" } : {}}
                    disabled={disabled}
                    onClick={() => handleDateSelect(day)}
                    fontSize="sm"
                    h="8"
                    minW="8"
                >
                    {day}
                </Button>
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
                <Popover.Content w="300px" p="4">
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
                            <Grid templateColumns="repeat(7, 1fr)" gap="0" w="full">
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
