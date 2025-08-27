"use client";

import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    HStack,
    IconButton,
    Input,
    Stack,
    Text
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import { CgArrowsExchange, CgArrowsExchangeV, CgSearch } from "react-icons/cg";
import { Calendar } from "./Calendar";
import { Passengers } from "./Passengers/Passengers";

type SearchProps = {
    color?: string;
}

// Custom hook to measure container width and determine layout
function useContainerBreakpoint() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [layout, setLayout] = useState<'sm' | 'md' | 'lg'>('lg');

    useEffect(() => {
        const updateLayout = () => {
            if (!containerRef.current) return;

            const width = containerRef.current.offsetWidth;

            if (width <= 640) {
                setLayout('sm');
            } else if (width <= 1024) {
                setLayout('md');
            } else {
                setLayout('lg');
            }
        };

        // Initial measurement
        updateLayout();

        // Create ResizeObserver to watch container size changes
        const resizeObserver = new ResizeObserver(updateLayout);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => resizeObserver.disconnect();
    }, []);

    return { containerRef, layout };
}

// Field configuration for reusability
const searchFields = {
    origin: {
        labelKey: 'search.labels.origin',
        placeholderKey: 'search.placeholders.leavingFrom'
    },
    destination: {
        labelKey: 'search.labels.destination',
        placeholderKey: 'search.placeholders.goingTo'
    },
    date: {
        labelKey: 'search.labels.date',
        placeholderKey: 'search.placeholders.dateExample'
    },
    returnDate: {
        labelKey: 'search.labels.returnDate',
        placeholderKey: 'search.placeholders.optional'
    },
    passengers: {
        labelKey: 'search.labels.passengers',
        placeholderKey: 'search.placeholders.passengersCount',
        type: 'number' as const,
        min: 1
    }
} as const;

// Move PassengerField OUTSIDE Search component to prevent recreation on re-renders
const PassengerField = ({
    passengers,
    setPassengers,
    color,
    t
}: {
    passengers: {
        adults: number;
        youth: number;
        seniors: number;
        students: boolean;
        wheelchair: boolean;
    },
    setPassengers: (passengers: any) => void,
    color?: string,
    t: any
}) => {
    const fieldConfig = searchFields.passengers;
    const total = passengers.adults + passengers.youth + passengers.seniors;
    const displayText = total === 1
        ? t('passengers.singular', '1 passenger')
        : t('passengers.plural', `${total} passengers`, { count: total });

    return (
        <Field label={t(fieldConfig.labelKey)}>
            <Passengers
                value={passengers}
                onChange={setPassengers}
                placeholder={t(fieldConfig.placeholderKey)}
                colorPallet={color}
            >
                <FlatInput
                    value={displayText}
                    placeholder={t(fieldConfig.placeholderKey)}
                    readOnly
                    cursor="pointer"
                />
            </Passengers>
        </Field>
    );
};

export default function Search({ color }: SearchProps) {
    const { t } = useTranslation();
    const { containerRef, layout } = useContainerBreakpoint();

    // Date state management
    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        return tomorrow;
    };

    const [departureDate, setDepartureDate] = useState<Date | undefined>(getTomorrowDate());
    const [returnDate, setReturnDate] = useState<Date | undefined>();

    // Passengers state management
    const [passengers, setPassengers] = useState({
        adults: 1,
        youth: 0,
        seniors: 0,
        students: false,
        wheelchair: false
    });





    // Date field component using Calendar
    const DateField = ({ field }: { field: 'date' | 'returnDate' }) => {
        const fieldConfig = searchFields[field];
        const value = field === 'date' ? departureDate : returnDate;
        const onChange = field === 'date' ? setDepartureDate : setReturnDate;

        // Set minimum dates
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of day
        const minDate = field === 'date' ? today : (departureDate || today);

        // For return date calendar, show range selection with departure date as range start
        const rangeStart = field === 'returnDate' ? departureDate : undefined;
        const rangeEnd = field === 'returnDate' ? returnDate : undefined;

        return (
            <Field label={t(fieldConfig.labelKey)}>
                <Calendar
                    value={value}
                    onChange={onChange}
                    placeholder={t(fieldConfig.placeholderKey)}
                    colorPallet={color}
                    minDate={minDate}
                    rangeStart={rangeStart}
                    rangeEnd={rangeEnd}
                    showToday={false}
                >
                    <FlatInput
                        value={value ? value.toLocaleDateString() : ''}
                        placeholder={t(fieldConfig.placeholderKey)}
                        readOnly
                        cursor="pointer"
                    />
                </Calendar>
            </Field>
        );
    };



    // Reusable search field component
    const SearchField = ({ field, ...inputProps }: { field: keyof typeof searchFields } & React.ComponentProps<typeof FlatInput>) => {
        const fieldConfig = searchFields[field];

        // Use DateField for date and returnDate fields
        if (field === 'date' || field === 'returnDate') {
            return <DateField field={field} />;
        }

        // Use PassengerField for passengers field
        if (field === 'passengers') {
            return <PassengerField
                passengers={passengers}
                setPassengers={setPassengers}
                color={color}
                t={t}
            />
        }

        return (
            <Field label={t(fieldConfig.labelKey)}>
                <FlatInput
                    placeholder={t(fieldConfig.placeholderKey)}
                    type={'type' in fieldConfig ? fieldConfig.type : undefined}
                    min={'min' in fieldConfig ? fieldConfig.min : undefined}
                    {...inputProps}
                />
            </Field>
        );
    };

    // Reusable search button component
    const SearchButton = ({ isFullHeight = false, rounded = "xl" }: { isFullHeight?: boolean; rounded?: string }) => (
        <Button
            w="100%"
            h={isFullHeight ? "100%" : 12}
            rounded={rounded}
            variant="solid"
            colorPalette={color}
        >
            <Flex gap={2} alignItems="center">
                <CgSearch />{t('search.buttons.search')}
            </Flex>
        </Button>
    );

    // Swap button container component
    const SwapButtonContainer = ({ layout: buttonLayout }: { layout: 'absolute' | 'block' }) => (
        <GridItem
            p={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            {...(buttonLayout === 'absolute' ? {} : { px: 2 })}
        >
            {buttonLayout === 'absolute' ? <SwapBtnAbsolute /> : <SwapBtnBlock />}
        </GridItem>
    );

    return (
        <Box ref={containerRef}>
            {/* ======== SMALL: 4 CARDS ======== */}
            {layout === 'sm' && (
                <Grid
                    gap={3}
                    templateAreas={`
                        "odCard"
                        "datesCard"
                        "paxCard"
                        "button"
                    `}
                >
                    <GroupCard gridArea="odCard">
                        <Grid templateColumns="1fr" position="relative" rowGap={2}>
                            <Cell><SearchField field="origin" /></Cell>
                            <Cell><SearchField field="destination" /></Cell>
                            <SwapBtnAbsolute />
                        </Grid>
                    </GroupCard>

                    <GroupCard gridArea="datesCard">
                        <Grid templateColumns="1fr 1fr">
                            <Cell><SearchField field="date" /></Cell>
                            <Cell><SearchField field="returnDate" /></Cell>
                        </Grid>
                    </GroupCard>

                    <GroupCard gridArea="paxCard">
                        <Cell><SearchField field="passengers" /></Cell>
                    </GroupCard>

                    <GridItem gridArea="button">
                        <SearchButton />
                    </GridItem>
                </Grid>
            )}

            {/* ======== MEDIUM: 2 ROUNDED ROWS WITH GAP ======== */}
            {layout === 'md' && (
                <Box display="grid" rowGap={3}>
                    <RowGroup>
                        <Grid templateColumns="1fr 40px 1fr" alignItems="stretch" columnGap={2}>
                            <Cell pr={2}><SearchField field="origin" /></Cell>
                            <SwapButtonContainer layout="block" />
                            <Cell pl={2}><SearchField field="destination" /></Cell>
                        </Grid>
                    </RowGroup>

                    <RowGroup>
                        <Grid templateColumns="1fr 1fr 1fr auto" alignItems="stretch">
                            <Cell><SearchField field="date" /></Cell>
                            <Cell><SearchField field="returnDate" /></Cell>
                            <Cell><SearchField field="passengers" /></Cell>
                            <GridItem
                                p={0}
                                alignSelf="stretch"
                                borderLeftWidth="1px"
                                borderColor="blackAlpha.200"
                            >
                                <SearchButton isFullHeight rounded="none" />
                            </GridItem>
                        </Grid>
                    </RowGroup>
                </Box>
            )}

            {/* ======== LARGE: 1 CONTINUOUS BAR ======== */}
            {layout === 'lg' && (
                <Box
                    bg="white"
                    rounded="xl"
                    overflow="hidden"
                    boxShadow="sm"
                >
                    <Grid
                        gap={0}
                        templateColumns="1fr auto 1fr 1fr 1fr 1fr auto"
                        alignItems="stretch"
                    >
                        <Cell><SearchField field="origin" /></Cell>
                        <SwapButtonContainer layout="block" />
                        <Cell><SearchField field="destination" /></Cell>
                        <Cell><SearchField field="date" /></Cell>
                        <Cell><SearchField field="returnDate" /></Cell>
                        <Cell><SearchField field="passengers" /></Cell>
                        <GridItem p={0} alignSelf="stretch">
                            <SearchButton isFullHeight rounded="none" />
                        </GridItem>
                    </Grid>
                </Box>
            )}
        </Box>
    );
}

/* ---------------- helpers ---------------- */

function GroupCard(props: React.ComponentProps<typeof GridItem>) {
    return (
        <GridItem
            bg="white"
            rounded="xl"
            boxShadow="sm"
            overflow="hidden"
            {...props}
        />
    );
}

/** rounded row container for md */
function RowGroup(props: React.ComponentProps<typeof Box>) {
    return (
        <Box
            bg="white"
            rounded="xl"
            overflow="hidden"
            boxShadow="sm"
            {...props}
        />
    );
}

function Cell({
    children,
    showRightDivider,
    ...rest
}: React.ComponentProps<typeof GridItem> & { showRightDivider?: boolean }) {
    return (
        <GridItem
            p={{ base: 2.5, md: 3 }}
            borderRightWidth={{ md: showRightDivider ? "1px" : 0 }}
            borderColor="blackAlpha.200"
            {...rest}
        >
            {children}
        </GridItem>
    );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <Stack gap={0}>
            <Text fontSize="sm" color="gray.600" fontWeight="semibold" mb={0.5}>
                {label}
            </Text>
            <HStack>{children}</HStack>
        </Stack>
    );
}

/** Input with no borders even on focus */
function FlatInput(props: React.ComponentProps<typeof Input>) {
    return (
        <Input
            {...props}
            border="0"
            p={0}
            h="fit-content"
            variant="outline"
            _focus={{ boxShadow: "none", outline: "none", borderColor: "transparent" }}
            _focusVisible={{ boxShadow: "none", outline: "none", borderColor: "transparent" }}
        />
    );
}

/** Base swap button component */
function SwapButton({
    variant = 'block',
    ...props
}: {
    variant?: 'absolute' | 'block'
} & React.ComponentProps<typeof IconButton>) {
    const { t } = useTranslation();

    const baseProps = {
        'aria-label': t('search.buttons.swapOriginDestination'),
        rounded: 'full' as const,
        bg: 'white',
        boxShadow: 'sm',
        color: 'gray.500',
        ...props
    };

    if (variant === 'absolute') {
        return (
            <IconButton
                {...baseProps}
                size="xs"
                position="absolute"
                top="50%"
                right={3}
                transform="translateY(-50%)"
            >
                <CgArrowsExchangeV />
            </IconButton>
        );
    }

    return (
        <IconButton {...baseProps}>
            <CgArrowsExchange />
        </IconButton>
    );
}

/** Small-screen absolute swap */
const SwapBtnAbsolute = () => <SwapButton variant="absolute" />;

/** Block swap for medium/large layouts */
const SwapBtnBlock = () => <SwapButton variant="block" />;

