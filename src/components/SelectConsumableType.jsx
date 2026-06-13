import { Label, Radio, RadioGroup } from "@heroui/react";
import clsx from "clsx";
import { PiBowlFoodLight } from "react-icons/pi";
import { RiDrinks2Line } from "react-icons/ri";

export function SelectConsumableType({ consumableType, setConsumableType }) {
  const options = [
    {
      key: "food",
      label: "Food",
      icon: <PiBowlFoodLight size={24} />,
    },
    {
      key: "beverage",
      label: "Beverage",
      icon: <RiDrinks2Line size={24} />,
    },
  ];

  return (
    <RadioGroup
      value={consumableType}
      onChange={setConsumableType}
      variant="secondary"
    >
      <div className="flex w-full gap-2 justify-between">
        {options.map((option) => (
          <Radio
            key={option.key}
            value={option.key}
            className={clsx(
              "group relative flex-col w-full gap-4 rounded-xl border border-transparent bg-surface px-5 py-4 transition-all data-[selected=true]:border-accent data-[selected=true]:bg-accent/10",
              "data-[focus-visible=true]:border-accent data-[focus-visible=true]:bg-accent/10",
            )}
          >
            <Radio.Control className="absolute top-3 right-4 size-5">
              <Radio.Indicator />
            </Radio.Control>
            <Radio.Content className="flex flex-col gap-6">
              <div className="flex gap-2 items-center">
                {option.icon}
                <Label>{option.label}</Label>
              </div>
            </Radio.Content>
          </Radio>
        ))}
      </div>
    </RadioGroup>
  );
}
