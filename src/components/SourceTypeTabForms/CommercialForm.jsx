import { Input, Label, TextField } from "@heroui/react";

export function CommercialForm({
  consumable_type,
  business,
  set_business,
  dish,
  set_dish,
}) {
  return (
    <>
      <TextField
        className="flex flex-col gap-2"
        name="input-business"
        isRequired
        value={business}
        onChange={set_business}
      >
        <Label>What place did you visit?</Label>
        <Input
          placeholder={
            consumable_type === "food" ? "e.g. McDonald's" : "e.g. Chatime"
          }
        ></Input>
      </TextField>
      <TextField
        className="flex flex-col gap-2"
        name="input-commercial-dish"
        isRequired
        value={dish}
        onChange={set_dish}
      >
        <Label>What did you order?</Label>
        <Input
          placeholder={
            consumable_type === "food" ? "e.g. Big Mac" : "e.g. Pearl Milk Tea"
          }
        ></Input>
      </TextField>
    </>
  );
}
