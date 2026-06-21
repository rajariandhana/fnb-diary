import { Input, Label, TextField } from "@heroui/react";
import { Optional } from "../Optional";

export function CommercialForm({
  consumable_type,
  business,
  set_business,
  dish,
  set_dish,
  variant,
  set_variant,
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
        <Label className="h-6">What place did you visit?</Label>
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
        <Label className="h-6">What did you order?</Label>
        <Input
          placeholder={
            consumable_type === "food" ? "e.g. Big Mac" : "e.g. Pearl Milk Tea"
          }
        ></Input>
      </TextField>
      <TextField
        className="flex flex-col gap-2"
        name="input-variant"
        value={variant}
        onChange={set_variant}
      >
        <Label className="h-6">
          Variant
          <Optional />
        </Label>
        <Input
          placeholder={
            consumable_type === "food" ? "e.g. Caramel" : "e.g. Zero"
          }
        ></Input>
      </TextField>
    </>
  );
}
