import { Input, Label } from "@heroui/react";

export function HomemadeForm({ dish, set_dish }) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label htmlFor="input-dish" isRequired>
          What did you cooked?
        </Label>
        <Input
          id="input-dish"
          value={dish}
          onChange={(event) => set_dish(event.target.value)}
          placeholder="e.g. Egg Fried Rice"
        ></Input>
      </div>
    </>
  );
}
