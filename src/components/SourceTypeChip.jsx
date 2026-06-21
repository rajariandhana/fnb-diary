import { Chip } from "@heroui/react";

const config = {
  homemade: {
    label: "HMD",
    className: "text-homemade",
  },
  commercial: {
    label: "CMR",
    className: "text-commercial",
  },
  packaged: {
    label: "PKG",
    className: "text-packaged",
  },
};

export function SourceTypeChip({ type }) {
  const chip = config[type];

  return (
    <Chip className={chip.className} variant="flat" size="sm">
      {chip.label}
    </Chip>
  );
}
