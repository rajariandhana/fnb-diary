import { Chip } from "@heroui/react";

const config = {
  food: {
    label: "FOOD",
    className: "text-food",
  },
  beverage: {
    label: "BVRG",
    className: "text-beverage",
  },
};

export function ConsumableTypeChip({ type }) {
  const chip = config[type];

  return (
    <Chip className={chip.className} variant="flat" size="sm">
      {chip.label}
    </Chip>
  );
}
