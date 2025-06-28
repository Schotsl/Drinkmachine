"use client";

import styles from "../page.module.css";
import PartyModal from "./_components/Model";
import { Container, Paper, Title, Text } from "@mantine/core";
import { Suspense, useEffect } from "react";
import { useCurrentParty } from "@/hooks/party";
import { useSearchParams } from "next/navigation";
import { useMyEntries } from "@/hooks/entry";
import { Doc } from "@/convex/_generated/dataModel";

function ResultsContent() {
  const { data: currentParty } = useCurrentParty();

  if (!currentParty) {
    return <PartyModal />;
  }

  return <CurrentPartyOverview currentParty={currentParty} />;
}

function CurrentPartyOverview({
  currentParty,
}: {
  currentParty: Doc<"parties">;
}) {
  const params = useSearchParams();
  const shotglassUuid = params.get("shotglass")!;
  const { data: shotglassData } = useMyEntries({
    partyId: currentParty._id,
    shotglassId: shotglassUuid,
  });

  useEffect(() => {
    localStorage.setItem("shotglass-uuid", shotglassUuid);
  }, [params, shotglassUuid]);

  return (
    <div className={styles.page}>
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

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
