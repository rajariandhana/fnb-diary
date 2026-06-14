import { Chip, Input, Label, TextField } from "@heroui/react";

export function PackagedForm({
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
        isRequired
        value={brand}
        onChange={set_brand}
      >
        <Label>Brand</Label>
        <Input placeholder="e.g. Arnott's"></Input>
      </TextField>
      <TextField
        className="flex flex-col gap-2"
        name="input-product"
        isRequired
        value={product}
        onChange={set_product}
      >
        <Label>Product</Label>
        <Input placeholder="e.g. Tim Tam"></Input>
      </TextField>
      <TextField
        className="flex flex-col gap-2"
        name="input-variant"
        value={variant}
        onChange={set_variant}
      >
        <Label>
          Variant
          <Chip color="accent" className="ml-2">
            (optional)
          </Chip>
        </Label>
        <Input placeholder="e.g. Caramel"></Input>
      </TextField>
    </>
  );
}
