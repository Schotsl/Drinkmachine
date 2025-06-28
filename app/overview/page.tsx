"use client";

import styles from "../page.module.css";

import PartyModal from "./_components/Model";

import { Container, Paper, Title, Text } from "@mantine/core";

import { Suspense } from "react";
import { useParty } from "@/hooks/useParty";
import { useShotglass } from "@/hooks/useShotglass";
import { useSearchParams } from "next/navigation";

function ResultsContent() {
  const params = useSearchParams();
  const shotglass = params.get("shotglass")!;

  const { data: partyData } = useParty();
  const { data: shotglassData } = useShotglass({ uuid: shotglass });

  return (
    <div className={styles.page}>
      {partyData === null && <PartyModal onCreated={() => {}} />}

      <Container size="md" mt="xl">
        <Paper shadow="sm" p="xl" radius="lg">
          <Title order={2} mb="md">
            Party Data
          </Title>
          <Text size="sm" c="dimmed" mb="lg">
            Debug information - this will be styled better later
          </Text>
          <div style={{ fontSize: "14px", fontFamily: "monospace" }}>
            <div style={{ marginBottom: "10px" }}>
              <strong>Party Data:</strong>
              <br />
              {JSON.stringify(partyData, null, 2)}
            </div>
            <div>
              <strong>Shotglass Data:</strong>
              <br />
              {JSON.stringify(shotglassData, null, 2)}
            </div>
          </div>
        </Paper>
      </Container>
    </div>
  );
}

export default function Results() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
