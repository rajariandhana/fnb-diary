import { Input, Label, TextField } from "@heroui/react";

export function HomemadeForm({ consumable_type, dish, set_dish }) {
  return (
    <>
      <TextField
        className="flex flex-col gap-2"
        name="input-dish"
        isRequired
        value={dish}
        onChange={set_dish}
      >
        <Label>What did you make?</Label>
        <Input
          placeholder={
            consumable_type === "food" ? "e.g. Egg fried rice" : "e.g. Hot Tea"
          }
        ></Input>
      </TextField>
    </>
  );
}
