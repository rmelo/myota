"use client"

import Header from "@/components/Header";
import Search from "@/components/Search";
import { Box, Container, Flex, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Page() {

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const AppSkeleton = () => (
    <Box>
      {/* Header Skeleton */}
      <Box py="8" minH="76px">
        <Flex justify="space-between" align="center">
          <Skeleton height="40px" width="160px" rounded="md" />
          <Skeleton height="32px" width="140px" rounded="md" />
        </Flex>
      </Box>
      {/* Search Skeleton */}
      <Skeleton height="60px" width="100%" rounded="xl" />
    </Box>
  );

  if (!isMounted) {
    return (
      <Container>
        <AppSkeleton />
      </Container>
    )
  }

  return (
    <Container>
      <Box
        data-state="open"
        _open={{
          animation: "fade-in 500ms ease-out",
        }}>
        <Header />
        <Search color="red" />
      </Box>
    </Container>
  )
}
