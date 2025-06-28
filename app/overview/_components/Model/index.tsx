"use client";

import { useState } from "react";
import { Modal, TextInput, Button, Title, Text } from "@mantine/core";
import { useCreateParty } from "@/hooks/party";

export default function PartyModal() {
  const [partyTitle, setPartyTitle] = useState("");
  const insertPartMutation = useCreateParty();

  const handleCreateParty = async () => {
    if (!partyTitle.trim()) return;

    await insertPartMutation.mutateAsync({ title: partyTitle });
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
        value={partyTitle}
        radius="md"
        required={true}
        placeholder="e.g., Sarah's Birthday Bash, Game Night 2024..."
        onChange={(event) => setPartyTitle(event.currentTarget.value)}
        onKeyDown={(event) => {
          if (
            event.key === "Enter" &&
            partyTitle.trim() &&
            !insertPartMutation.isPending
          ) {
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
        disabled={!partyTitle.trim() || insertPartMutation.isPending}
        loading={insertPartMutation.isPending}
        gradient={{ from: "blue", to: "cyan", deg: 45 }}
        fullWidth={true}
      >
        {insertPartMutation.isPending ? "Creating..." : "Create Party"}
      </Button>
    </Modal>
  );
}
