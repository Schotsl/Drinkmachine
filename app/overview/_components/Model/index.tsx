"use client";

import { useState } from "react";
import { useInsertParty } from "@/mutations/insertParty";
import { Modal, TextInput, Button, Title, Text } from "@mantine/core";

interface PartyModalProps {
  onCreated: () => void;
}

export default function PartyModal({ onCreated }: PartyModalProps) {
  const [party, setParty] = useState("");

  const insertParty = useInsertParty();

  const handleCreateParty = async () => {
    if (!party.trim()) return;

    await insertParty.mutateAsync({ title: party.trim() });

    onCreated();
  };

  return (
    <Modal
      opened={true}
      onClose={() => {}}
      title={
        <div>
          <Title size="h3" fw={600} mb="xs">
            🎉 Create a party
          </Title>

          <Text size="md" c="dimmed">
            Choose a name that you&apos;ll recognize in the future!
          </Text>
        </div>
      }
      centered
      size="lg"
      radius="lg"
      shadow="xl"
      padding="xl"
      closeOnClickOutside={false}
      withCloseButton={false}
    >
      <TextInput
        size="md"
        label="Party Name"
        value={party}
        radius="md"
        required={true}
        placeholder="e.g., Sarah's Birthday Bash, Game Night 2024..."
        onChange={(event) => setParty(event.currentTarget.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && party.trim() && !insertParty.isPending) {
            handleCreateParty();
          }
        }}
      />

      <Button
        onClick={handleCreateParty}
        mt="xl"
        size="md"
        radius="md"
        variant="gradient"
        disabled={!party.trim() || insertParty.isPending}
        loading={insertParty.isPending}
        gradient={{ from: "blue", to: "cyan", deg: 45 }}
        fullWidth={true}
      >
        {insertParty.isPending ? "Creating..." : "Create Party"}
      </Button>
    </Modal>
  );
}
