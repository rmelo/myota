"use client"

import Header from "@/components/Header";
import Search from "@/components/Search";
import { Container, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Page() {

  const { t, i18n, ready } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!ready || !isClient) {
    return (
      <Container>
        <Text>Loading...</Text>
      </Container>
    )
  }

  return (
    <Container>
      <Header />
      <Search color="red" />
    </Container >
  )
}
