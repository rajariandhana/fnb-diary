import { Input, Label } from "@heroui/react";

export function CommercialForm({ business, set_business, dish, set_dish }) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label htmlFor="input-dish" isRequired>
          What place did you visit?
        </Label>
        <Input
          id="input-business"
          value={business}
          onChange={(event) => set_business(event.target.value)}
          placeholder="e.g. McDonald's"
        ></Input>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="input-dish" isRequired>
          What did you ordered?
        </Label>
        <Input
          id="input-dish"
          value={dish}
          onChange={(event) => set_dish(event.target.value)}
          placeholder="e.g. BigMac"
        ></Input>
      </div>
    </>
  );
}
