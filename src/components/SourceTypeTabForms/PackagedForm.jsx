import { Input, Label } from "@heroui/react";

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
      <div className="flex flex-col gap-2">
        <Label htmlFor="input-dish" isRequired>
          Brand
        </Label>
        <Input
          id="input-brand"
          value={brand}
          onChange={(event) => set_brand(event.target.value)}
          placeholder="e.g. Arnott's"
        ></Input>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="input-product" isRequired>
          Product
        </Label>
        <Input
          id="input-product"
          value={product}
          onChange={(event) => set_product(event.target.value)}
          placeholder="e.g. Tim Tam"
        ></Input>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="input-variant">Variant</Label>
        <Input
          id="input-variant"
          value={variant}
          onChange={(event) => set_variant(event.target.value)}
          placeholder="e.g. Caramel"
        ></Input>
      </div>
    </>
  );
}
