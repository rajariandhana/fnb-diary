import { Input, Label, TextField } from "@heroui/react";

export function HomemadeForm({ dish, set_dish }) {
  return (
    <>
      <TextField
        className="flex flex-col gap-2"
        name="input-dish"
        isRequired
        value={dish}
        onChange={set_dish}
      >
        <Label>What did you cooked?</Label>
        <Input placeholder="e.g. Egg Fried Rice"></Input>
      </TextField>
    </>
  );
}
