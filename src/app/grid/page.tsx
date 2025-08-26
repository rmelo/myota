"use client";

import {
    Box,
    Button,
    ColorPalette,
    Container,
    Grid,
    GridItem,
    HStack,
    Icon,
    IconButton,
    Input,
    Stack,
    Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { CgArrowsExchange, CgArrowsExchangeV } from "react-icons/cg";

type SearchBarProps = {
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

/** Demo page wrapper */
export default function SearchBarPage() {
    const color: ColorPalette = "red";
    return (
        <Container mt={4}>
            <Stack gap={4} >
                <Box p={4} bg={`${color}.50`}>
                    <ResponsiveSearch color={color} />
                </Box>
                <Box p={4} bg={`${color}.50`} width="700px">
                    <ResponsiveSearch color={color} />
                </Box>
                <Box p={4} bg={`${color}.50`} width="400px">
                    <ResponsiveSearch color={color} />
                </Box>
            </Stack>
        </Container>
    );
}

function ResponsiveSearch({ color }: SearchBarProps) {
    const { containerRef, layout } = useContainerBreakpoint();

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
                    {/* Origin/Destination card (swap aligned right) */}
                    <GroupCard gridArea="odCard">
                        <Grid templateColumns="1fr" position="relative" rowGap={2}>
                            <Cell>
                                <Field label="Origin">
                                    <FlatInput placeholder="Leaving from..." />
                                </Field>
                            </Cell>

                            <Cell>
                                <Field label="Destination">
                                    <FlatInput placeholder="Going to..." />
                                </Field>
                            </Cell>

                            {/* keep the absolute swap on small, but it won't cover text due to row layout */}
                            <SwapBtnAbsolute />
                        </Grid>
                    </GroupCard>

                    {/* Dates card */}
                    <GroupCard gridArea="datesCard">
                        <Grid templateColumns="1fr 1fr">
                            <Cell>
                                <Field label="Date">
                                    <FlatInput placeholder="Wed, Aug 27" />
                                </Field>
                            </Cell>
                            <Cell>
                                <Field label="Return Date">
                                    <FlatInput placeholder="Optional" />
                                </Field>
                            </Cell>
                        </Grid>
                    </GroupCard>

                    {/* Passengers card — plain input, no steppers */}
                    <GroupCard gridArea="paxCard">
                        <Cell>
                            <Field label="Passengers">
                                <FlatInput type="number" min={1} placeholder="1" />
                            </Field>
                        </Cell>
                    </GroupCard>

                    {/* Search card */}
                    <GridItem gridArea="button">
                        <Button
                            w="100%"
                            h={12}
                            rounded="xl"
                            variant="solid"
                            colorPalette={color}
                        >
                            <Icon mr="2">
                                <svg viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z"
                                    />
                                </svg>
                            </Icon>
                            Search
                        </Button>
                    </GridItem>
                </Grid>
            )}

            {/* ======== MEDIUM: 2 ROUNDED ROWS WITH GAP ======== */}
            {layout === 'md' && (
                <Box display="grid" rowGap={3}>
                    {/* Row 1: Origin | (Swap) | Destination  — more space + safe text */}
                    <RowGroup>
                        <Grid
                            templateColumns="1fr 40px 1fr"  // center column reserved for swap
                            alignItems="stretch"
                            columnGap={2}                    // extra breathing room
                        >
                            <Cell pr={2}>
                                <Field label="Origin">
                                    <FlatInput placeholder="Leaving from..." />
                                </Field>
                            </Cell>

                            {/* Swap lives in its own column (no overlap with text) */}
                            <GridItem
                                p={0}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <SwapBtnBlock />
                            </GridItem>

                            <Cell pl={2}>
                                <Field label="Destination">
                                    <FlatInput placeholder="Going to..." />
                                </Field>
                            </Cell>
                        </Grid>
                    </RowGroup>

                    {/* Row 2: Date | Return | Pax | Search */}
                    <RowGroup>
                        <Grid templateColumns="1fr 1fr 1fr auto" alignItems="stretch">
                            <Cell>
                                <Field label="Date">
                                    <FlatInput placeholder="Wed, Aug 27" />
                                </Field>
                            </Cell>

                            <Cell>
                                <Field label="Return Date">
                                    <FlatInput placeholder="Optional" />
                                </Field>
                            </Cell>

                            {/* Passengers — plain input */}
                            <Cell>
                                <Field label="Passengers">
                                    <FlatInput type="number" min={1} placeholder="1" />
                                </Field>
                            </Cell>

                            {/* Button cell fills the whole row height */}
                            <GridItem
                                p={0}
                                alignSelf="stretch"
                                borderLeftWidth="1px"
                                borderColor="blackAlpha.200"
                            >
                                <Button
                                    w="100%"
                                    h="100%"
                                    rounded="none"
                                    variant="solid"
                                    colorPalette={color}
                                    display="block"
                                >
                                    <Icon mr="2">
                                        <svg viewBox="0 0 24 24">
                                            <path
                                                fill="currentColor"
                                                d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z"
                                            />
                                        </svg>
                                    </Icon>
                                    Search
                                </Button>
                            </GridItem>
                        </Grid>
                    </RowGroup>
                </Box>
            )}

            {/* ======== LARGE: 1 CONTINUOUS BAR ======== */}
            {layout === 'lg' && (
                <Box
                    bg="white"
                    borderWidth="1px"
                    borderColor="blackAlpha.200"
                    rounded="xl"
                    overflow="hidden"
                    boxShadow="md"
                >
                    <Grid
                        gap={0}
                        templateColumns="1fr auto 1fr 1fr 1fr 1fr auto"
                        alignItems="stretch"
                    >
                        <Cell>
                            <Field label="Origin">
                                <FlatInput placeholder="Leaving from..." />
                            </Field>
                        </Cell>

                        {/* Swap Button Column */}
                        <GridItem
                            p={0}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            px={2}
                        >
                            <SwapBtnBlock />
                        </GridItem>

                        <Cell>
                            <Field label="Destination">
                                <FlatInput placeholder="Going to..." />
                            </Field>
                        </Cell>
                        <Cell>
                            <Field label="Date">
                                <FlatInput placeholder="Wed, Aug 27" />
                            </Field>
                        </Cell>
                        <Cell >
                            <Field label="Return Date">
                                <FlatInput placeholder="Optional" />
                            </Field>
                        </Cell>
                        <Cell >
                            <Field label="Passengers">
                                <FlatInput type="number" min={1} placeholder="1" />
                            </Field>
                        </Cell>
                        <GridItem p={0} alignSelf="stretch">
                            <Button
                                w="100%"
                                h="100%"
                                rounded="none"
                                variant="solid"
                                colorPalette={color}
                                display="block"
                            >
                                <Icon mr="2">
                                    <svg viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z"
                                        />
                                    </svg>
                                </Icon>
                                Search
                            </Button>
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
            borderWidth="1px"
            borderColor="blackAlpha.200"
            rounded="xl"
            boxShadow="md"
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
            borderWidth="1px"
            borderColor="blackAlpha.200"
            rounded="xl"
            overflow="hidden"
            boxShadow="md"
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

/** Small-screen absolute swap (kept from your earlier UX) */
function SwapBtnAbsolute() {
    return (
        <IconButton
            aria-label="Swap origin and destination"
            size="xs"
            position="absolute"
            top="50%"
            right={3}
            transform="translateY(-50%)"
            rounded="full"
            bg="white"
            boxShadow="sm"
            color="gray.500"
        >
            <CgArrowsExchangeV />
        </IconButton>
    );
}

/** Block swap (lives in its own grid column on md row 1) */
function SwapBtnBlock() {
    return (
        <IconButton
            aria-label="Swap origin and destination"
            rounded="full"
            bg="white"
            boxShadow="sm"
            color="gray.500"
        >
            <CgArrowsExchange />
        </IconButton >
    );
}
