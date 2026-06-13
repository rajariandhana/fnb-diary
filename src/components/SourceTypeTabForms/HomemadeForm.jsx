import { Input, Label, TextField } from "@heroui/react";

export function HomemadeForm({ dish, set_dish }) {
  return (
    <>
      <TextField className="flex flex-col gap-2" name="input-dish" isRequired>
        <Label>
          What did you cooked?
        </Label>
        <Input
          value={dish}
          onChange={(event) => set_dish(event.target.value)}
          placeholder="e.g. Egg Fried Rice"
        ></Input>
      </TextField>
    </>
  );
}
