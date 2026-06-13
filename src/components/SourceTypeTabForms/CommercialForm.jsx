import { Input, Label, TextField } from "@heroui/react";

export function CommercialForm({ set_business, set_dish }) {
  return (
    <>
      <TextField
        className="flex flex-col gap-2"
        name="input-business"
        isRequired
        onChange={set_business}
      >
        <Label>What place did you visit?</Label>
        <Input placeholder="e.g. McDonald's"></Input>
      </TextField>
      <TextField
        className="flex flex-col gap-2"
        name="input-dish"
        isRequired
        onChange={set_dish}
      >
        <Label>What did you ordered?</Label>
        <Input placeholder="e.g. BigMac"></Input>
      </TextField>
    </>
  );
}
