import { Input, Label, TextField } from "@heroui/react";

export function CommercialForm({ business, set_business, dish, set_dish }) {
  return (
    <>
      <TextField className="flex flex-col gap-2" name="input-business" isRequired>
        <Label>
          What place did you visit?
        </Label>
        <Input
          id="input-business"
          value={business}
          onChange={(event) => set_business(event.target.value)}
          placeholder="e.g. McDonald's"
        ></Input>
      </TextField>
      <TextField className="flex flex-col gap-2" name="input-dish" isRequired>
        <Label>
          What did you ordered?
        </Label>
        <Input
          id="input-dish"
          value={dish}
          onChange={(event) => set_dish(event.target.value)}
          placeholder="e.g. BigMac"
        ></Input>
      </TextField>
    </>
  );
}
