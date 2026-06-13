import { useEffect, useState } from "react";
import { Button, Calendar, DateField, DatePicker, Tabs } from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import instance from "../libs/axios/instance";
import { SelectConsumableType } from "./SelectConsumableType";
import {
  DEFAULT_CONSUMABLE_TYPE,
  DEFAULT_SOURCE_TYPE,
} from "../hooks/useConsumableEntry";
import { HomemadeForm } from "./SourceTypeTabForms/HomemadeForm";
import { CommercialForm } from "./SourceTypeTabForms/CommercialForm";
import { PackagedForm } from "./SourceTypeTabForms/PackagedForm";

export function ConsumeEntry() {
  const [value, setValue] = useState(today(getLocalTimeZone()));
  const ping = async () => {
    const response = await instance.get("/ping");
    console.log(response);
  };

  const [entryForm, setEntryForm] = useState({});

  const [consumableType, setConsumableType] = useState(DEFAULT_CONSUMABLE_TYPE);

  const [source_type, set_source_type] = useState(DEFAULT_SOURCE_TYPE);

  // useEffect(() => {
  //   console.log(consumableType);
  // }, [consumableType]);

  const [dish, set_dish] = useState("");
  const [business, set_business] = useState("");
  const [brand, set_brand] = useState("");
  const [product, set_product] = useState("");
  const [variant, set_variant] = useState("");

  const resetSourceFormField = (key) => {
    set_source_type(key);
    set_dish("");
    set_business("");
    set_brand("");
    set_product("");
    set_variant("");
  };

  const sourceTypeOptions = [
    {
      key: "homemade",
      label: "Homemade",
      tab: <HomemadeForm dish={dish} set_dish={set_dish} />,
    },
    {
      key: "commercial",
      label: "Commercial",
      tab: (
        <CommercialForm
          business={business}
          set_business={set_business}
          dish={dish}
          set_dish={set_dish}
        />
      ),
    },
    {
      key: "packaged",
      label: "Packaged",
      tab: (
        <PackagedForm
          brand={brand}
          set_brand={set_brand}
          product={product}
          set_product={set_product}
          variant={variant}
          set_variant={set_variant}
        />
      ),
    },
  ];

  const next = () => {
    // validate
  };

  const [disable_next, set_disable_next] = useState(true);
  useEffect(() => {
    if (
      (source_type == "homemade" && dish.length > 0) ||
      (source_type == "commercial" && business.length > 0 && dish.length > 0) ||
      (source_type == "packaged" && brand.length > 0 && product.length > 0)
    ) {
      set_disable_next(false);
    } else {
      set_disable_next(true);
    }
  }, [source_type, dish, business, brand, product, variant]);

  return (
    <div className="flex flex-col gap-4 w-96">
      <DatePicker value={value} onChange={setValue} aria-label="Date">
        {/* <Label>Date</Label> */}
        <DateField.Group fullWidth>
          <DateField.Input>
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
          <DateField.Suffix>
            <DatePicker.Trigger>
              <DatePicker.TriggerIndicator />
            </DatePicker.Trigger>
          </DateField.Suffix>
        </DateField.Group>
        <DatePicker.Popover>
          <Calendar aria-label="Event date">
            <Calendar.Header>
              <Calendar.YearPickerTrigger>
                <Calendar.YearPickerTriggerHeading />
                <Calendar.YearPickerTriggerIndicator />
              </Calendar.YearPickerTrigger>
              <Calendar.NavButton slot="previous" />
              <Calendar.NavButton slot="next" />
            </Calendar.Header>
            <Calendar.Grid>
              <Calendar.GridHeader>
                {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
              </Calendar.GridHeader>
              <Calendar.GridBody>
                {(date) => <Calendar.Cell date={date} />}
              </Calendar.GridBody>
            </Calendar.Grid>
            <Calendar.YearPickerGrid>
              <Calendar.YearPickerGridBody>
                {({ year }) => <Calendar.YearPickerCell year={year} />}
              </Calendar.YearPickerGridBody>
            </Calendar.YearPickerGrid>
          </Calendar>
        </DatePicker.Popover>
      </DatePicker>
      <SelectConsumableType
        consumableType={consumableType}
        setConsumableType={setConsumableType}
      />
      <Tabs
        className="w-full max-w-md"
        onSelectionChange={(key) => resetSourceFormField(key)}
      >
        <Tabs.ListContainer>
          <Tabs.List aria-label="Options">
            {sourceTypeOptions.map((option) => (
              <Tabs.Tab id={option.key} key={option.key}>
                {option.label}
                <Tabs.Indicator />
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs.ListContainer>
        {sourceTypeOptions.map((option) => (
          <Tabs.Panel
            className="pt-4 flex flex-col gap-4 h-64"
            id={option.key}
            key={option.key}
          >
            {option.tab}
          </Tabs.Panel>
        ))}
      </Tabs>
      <div className="flex justify-end">
        <Button onPress={next} isDisabled={disable_next}>
          Next
        </Button>
      </div>
    </div>
  );
}
