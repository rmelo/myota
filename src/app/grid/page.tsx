"use client";

import {
    Box,
    Button,
    Grid,
    GridItem,
    HStack,
    Icon,
    IconButton,
    Input,
    NumberInput,
    Text,
} from "@chakra-ui/react";

/** Demo page wrapper */
export default function SearchBarPage() {
    return (
        <Box p={{ base: 4, md: 6 }} bg="blue.50">
            <ResponsiveSearch />
        </Box>
    );
}

function ResponsiveSearch() {
    return (
        <>
            {/* ======== SMALL: 4 CARDS ======== */}
            <Grid
                display={{ base: "grid", md: "none" }}
                gap={3}
                templateAreas={`
          "odCard"
          "datesCard"
          "paxCard"
          "button"
        `}
            >
                {/* Origin/Destination card */}
                <GroupCard gridArea="odCard">
                    <Grid templateColumns="1fr" position="relative">
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
                        <SwapBtn pos="right" />
                    </Grid>
                </GroupCard>

                {/* Dates card */}
                <GroupCard gridArea="datesCard">
                    <Grid templateColumns="1fr 1fr">
                        <Cell showRightDivider>
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

                {/* Passengers card */}
                <GroupCard gridArea="paxCard">
                    <Cell>
                        <Field label="Passengers">
                            <NumberInput.Root min={1} defaultValue="1" width="100%">
                                <NumberInput.Control />
                                <NumberInput.Input
                                    _focus={{ boxShadow: "none", outline: "none", borderColor: "transparent" }}
                                    _focusVisible={{ boxShadow: "none", outline: "none", borderColor: "transparent" }}
                                />
                            </NumberInput.Root>
                        </Field>
                    </Cell>
                </GroupCard>

                {/* Search card */}
                <GridItem gridArea="button">
                    <Button
                        w="100%"
                        h={12}                 // ~20% smaller
                        rounded="xl"
                        variant="solid"
                        colorPalette="blue"
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

            {/* ======== MEDIUM: 2 ROUNDED ROWS WITH GAP ======== */}
            <Box display={{ base: "none", md: "grid", lg: "none" }} rowGap={3}>
                {/* Row 1: Origin | Destination */}
                <RowGroup>
                    <Grid templateColumns="1fr 1fr" position="relative" alignItems="stretch">
                        <Cell showRightDivider>
                            <Field label="Origin">
                                <FlatInput placeholder="Leaving from..." />
                            </Field>
                        </Cell>
                        <Cell>
                            <Field label="Destination">
                                <FlatInput placeholder="Going to..." />
                            </Field>
                        </Cell>
                        <SwapBtn pos="center" />
                    </Grid>
                </RowGroup>

                {/* Row 2: Date | Return | Pax | Search */}
                <RowGroup>
                    <Grid templateColumns="1fr 1fr 1fr auto" alignItems="stretch">
                        <Cell showRightDivider>
                            <Field label="Date">
                                <FlatInput placeholder="Wed, Aug 27" />
                            </Field>
                        </Cell>
                        <Cell showRightDivider>
                            <Field label="Return Date">
                                <FlatInput placeholder="Optional" />
                            </Field>
                        </Cell>
                        <Cell showRightDivider>
                            <Field label="Passengers">
                                <NumberInput.Root min={1} defaultValue="1" width="100%">
                                    <NumberInput.Control />
                                    <NumberInput.Input
                                        _focus={{ boxShadow: "none", outline: "none", borderColor: "transparent" }}
                                        _focusVisible={{ boxShadow: "none", outline: "none", borderColor: "transparent" }}
                                    />
                                </NumberInput.Root>
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
                                colorPalette="blue"
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

            {/* ======== LARGE: 1 CONTINUOUS BAR (slimmer) ======== */}
            <Box
                display={{ base: "none", lg: "block" }}
                bg="white"
                borderWidth="1px"
                borderColor="blackAlpha.200"
                rounded="xl"
                overflow="hidden"
                boxShadow="md"
            >
                <Grid
                    gap={0}
                    templateColumns="repeat(6, minmax(0,1fr))"
                    alignItems="stretch"
                >
                    <Cell showRightDivider>
                        <Field label="Origin">
                            <FlatInput placeholder="Leaving from..." />
                        </Field>
                    </Cell>
                    <Cell showRightDivider>
                        <Field label="Destination">
                            <FlatInput placeholder="Going to..." />
                        </Field>
                    </Cell>
                    <Cell showRightDivider>
                        <Field label="Date">
                            <FlatInput placeholder="Wed, Aug 27" />
                        </Field>
                    </Cell>
                    <Cell showRightDivider>
                        <Field label="Return Date">
                            <FlatInput placeholder="Optional" />
                        </Field>
                    </Cell>
                    <Cell showRightDivider>
                        <Field label="Passengers">
                            <NumberInput.Root min={1} defaultValue="1" width="100%">
                                <NumberInput.Control />
                                <NumberInput.Input
                                    _focus={{ boxShadow: "none", outline: "none", borderColor: "transparent" }}
                                    _focusVisible={{ boxShadow: "none", outline: "none", borderColor: "transparent" }}
                                />
                            </NumberInput.Root>
                        </Field>
                    </Cell>

                    {/* Button column fills the bar height */}
                    <GridItem p={0} alignSelf="stretch">
                        <Button
                            w="100%"
                            h="100%"
                            rounded="none"
                            variant="solid"
                            colorPalette="blue"
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
        </>
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

/** rounded row container for md; no inner bottom borders */
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
            p={{ base: 2.5, md: 3 }}   // ~20% tighter
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
        <Box>
            <Text fontSize="sm" color="gray.600" fontWeight="semibold" mb={0.5}>
                {label}
            </Text>
            <HStack>{children}</HStack>
            {/* no bottom separators to avoid extra lines */}
        </Box>
    );
}

/** Input with no borders even on focus */
function FlatInput(props: React.ComponentProps<typeof Input>) {
    return (
        <Input
            {...props}
            border="0"
            p={0}
            variant="outline"
            _focus={{ boxShadow: "none", outline: "none", borderColor: "transparent" }}
            _focusVisible={{ boxShadow: "none", outline: "none", borderColor: "transparent" }}
        />
    );
}

function SwapBtn({ pos }: { pos: "right" | "center" }) {
    return (
        <IconButton
            aria-label="Swap origin and destination"
            size="xs"
            position="absolute"
            top="50%"
            {...(pos === "right"
                ? { right: 3, transform: "translateY(-50%)" }
                : { left: "50%", transform: "translate(-50%, -50%)" })}
            rounded="full"
            bg="white"
            borderWidth="1px"
            borderColor="blackAlpha.200"
            boxShadow="sm"
        >
            <Icon boxSize="3.5">
                <svg viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M7 7h9l-2.5-2.5L15 3l5 5-5 5-1.5-1.5L16 9H7V7zm10 10H8l2.5 2.5L9 21l-5-5 5-5 1.5 1.5L8 15h9v2z"
                    />
                </svg>
            </Icon>
        </IconButton>
    );
}
