import { Input, Label, TextField } from "@heroui/react";

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
      <TextField className="flex flex-col gap-2" name="input-brand" isRequired>
        <Label>
          Brand
        </Label>
        <Input
          id="input-brand"
          value={brand}
          onChange={(event) => set_brand(event.target.value)}
          placeholder="e.g. Arnott's"
        ></Input>
      </TextField>
      <TextField
        className="flex flex-col gap-2"
        name="input-product"
        isRequired
      >
        <Label>
          Product
        </Label>
        <Input
          id="input-product"
          value={product}
          onChange={(event) => set_product(event.target.value)}
          placeholder="e.g. Tim Tam"
        ></Input>
      </TextField>
      <TextField
        className="flex flex-col gap-2"
        name="input-variant"
      >
        <Label>
          Variant
        </Label>
        <Input
          id="input-variant"
          value={variant}
          onChange={(event) => set_variant(event.target.value)}
          placeholder="e.g. Caramel"
        ></Input>
      </TextField>
    </>
  );
}
