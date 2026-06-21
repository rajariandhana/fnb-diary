import { Input, Label, TextField } from "@heroui/react";
import { Optional } from "../Optional";

export function PackagedForm({
  consumable_type,
  brand,
  set_brand,
  product,
  set_product,
  variant,
  set_variant,
}) {
  return (
    <>
      <TextField
        className="flex flex-col gap-2"
        name="input-brand"
        value={brand}
        onChange={set_brand}
      >
        <Label>
          Brand
          <Optional />
        </Label>
        <Input
          placeholder={consumable_type === "food" ? "e.g. Arnott's" : "..."}
        ></Input>
      </TextField>
      <TextField
        className="flex flex-col gap-2"
        name="input-product"
        isRequired
        value={product}
        onChange={set_product}
      >
        <Label>Product</Label>
        <Input
          placeholder={
            consumable_type === "food" ? "e.g. Tim Tam" : "e.g. Red Bull"
          }
        ></Input>
      </TextField>
      <TextField
        className="flex flex-col gap-2"
        name="input-variant"
        value={variant}
        onChange={set_variant}
      >
        <Label>
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
