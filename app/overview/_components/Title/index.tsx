"use client";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import {
  ActionIcon,
  Group,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useMutation } from "convex/react";
import { useEffect, useState } from "react";

type Props = {
  shotglass: Doc<"shotglasses">;
};

export function Title({ shotglass }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(shotglass.title);
  const theme = useMantineTheme();
  const updateShotglass = useMutation(api.shotglass.updateShotglass);

  useEffect(() => {
    setTitle(shotglass.title);
  }, [shotglass.title]);

  const handleSave = () => {
    setIsEditing(false);

    if (title.trim() === shotglass.title) {
      return;
    }

    if (title.trim().length === 0) {
      setTitle(shotglass.title);
      return;
    }

    updateShotglass({
      id: shotglass._id,
      title,
    });
  };

  const handleIconClick = () => {
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <TextInput
        w="100%"
        mt={-5}
        ml={-13}
        value={title}
        onChange={(event) => setTitle(event.currentTarget.value)}
        onBlur={handleSave}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSave();
          }
        }}
        autoFocus
        styles={{
          input: {
            ...(theme.headings.sizes.h1 as React.CSSProperties),
            fontWeight: 700,
            height: "auto",
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
      <Title order={1}>{shotglass.title}</Title>
      <ActionIcon onClick={handleIconClick} variant="subtle">
        ✏️
      </ActionIcon>
    </Group>
  );
}
