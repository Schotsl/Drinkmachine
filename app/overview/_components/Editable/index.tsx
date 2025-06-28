"use client";

import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { useMutation } from "convex/react";
import {
  ActionIcon,
  Group,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";

type EditableProps = {
  id: Id<"shotglasses">;
  title: string;
};

export default function Editable(props: EditableProps) {
  const [title, setTitle] = useState(props.title);
  const [editing, setEditing] = useState(false);

  const theme = useMantineTheme();
  const updateShotglass = useMutation(api.shotglass.updateShotglass);

  const handleSave = () => {
    setEditing(false);

    if (title.trim() === props.title) {
      return;
    }

    if (title.trim().length === 0) {
      setTitle(props.title);
      return;
    }

    updateShotglass({
      id: props.id,
      title,
    });
  };

  const handleEdit = () => {
    setEditing(true);
  };

  if (editing) {
    return (
      <TextInput
        w="100%"
        mt={-5}
        ml={-13}
        value={title}
        onBlur={handleSave}
        onChange={(event) => setTitle(event.currentTarget.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSave();
          }
        }}
        autoFocus
        styles={{
          input: {
            ...(theme.headings.sizes.h1 as React.CSSProperties),
            width: "calc(100% + 26px)",
            paddingTop: "4px",
            paddingBottom: "4px",
            marginBottom: "-5px",
          },
        }}
        rightSection={
          <ActionIcon onClick={handleSave} variant="subtle" mr={-26}>
            💾
          </ActionIcon>
        }
      />
    );
  }

  return (
    <Group align="center" gap="sm">
      <Title order={1}>{props.title}</Title>
      <ActionIcon onClick={handleEdit} variant="subtle">
        ✏️
      </ActionIcon>
    </Group>
  );
}
