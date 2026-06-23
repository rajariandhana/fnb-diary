import { useEffect, useState } from "react";
import {
  Button,
  Label,
  Spinner,
  Surface,
  Tabs,
  TextArea,
  TextField,
} from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import instance from "../libs/axios/instance";
import { SelectConsumableType } from "./SelectConsumableType";
import { SelectConsumedDate } from "./SelectConsumedDate";
import {
  DEFAULT_CONSUMABLE_TYPE,
  DEFAULT_SOURCE_TYPE,
  useCreateEntry,
} from "../hooks/useConsumableEntry";
import { HomemadeForm } from "./SourceTypeTabForms/HomemadeForm";
import { CommercialForm } from "./SourceTypeTabForms/CommercialForm";
import { PackagedForm } from "./SourceTypeTabForms/PackagedForm";
import { useNavigate } from "react-router";
import { Optional } from "./Optional";

export function ConsumeEntry() {
  const [consumable_type, set_consumable_type] = useState(
    DEFAULT_CONSUMABLE_TYPE,
  );

  const [source_type, set_source_type] = useState(DEFAULT_SOURCE_TYPE);

  const [dish, set_dish] = useState("");
  const [business, set_business] = useState("");
  const [commercial_dish, set_commercial_dish] = useState("");
  const [commercial_variant, set_commercial_variant] = useState("");
  const [brand, set_brand] = useState("");
  const [product, set_product] = useState("");
  const [variant, set_variant] = useState("");

  const [ingridients, set_ingridients] = useState("");
  const [notes, set_notes] = useState("");

  const [consumed_at, set_consumed_at] = useState(today(getLocalTimeZone()));

  const sourceTypeOptions = [
    {
      key: "homemade",
      label: "Homemade",
      tab: (
        <HomemadeForm
          consumable_type={consumable_type}
          dish={dish}
          set_dish={set_dish}
        />
      ),
    },
    {
      key: "commercial",
      label: "Commercial",
      tab: (
        <CommercialForm
          consumable_type={consumable_type}
          business={business}
          set_business={set_business}
          dish={commercial_dish}
          set_dish={set_commercial_dish}
          variant={commercial_variant}
          set_variant={set_commercial_variant}
        />
      ),
    },
    {
      key: "packaged",
      label: "Packaged",
      tab: (
        <PackagedForm
          consumable_type={consumable_type}
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

  const [page, set_page] = useState(0);

  const [can_submit, set_can_submit] = useState(true);
  useEffect(() => {
    if (
      (source_type == "homemade" && dish.length > 0) ||
      (source_type == "commercial" &&
        business.length > 0 &&
        commercial_dish.length > 0) ||
      (source_type == "packaged" && product.length > 0)
    ) {
      set_can_submit(false);
    } else {
      set_can_submit(true);
    }
  }, [source_type, dish, business, commercial_dish, product]);

  const navigate = useNavigate();
  const generate_form = () => {
    let entry = {
      consumable_type,
      source_type,
      consumed_at: consumed_at.toString(),
    };
    if (source_type === "homemade") {
      entry = {
        ...entry,
        dish,
      };
    } else if (source_type === "commercial") {
      entry = {
        ...entry,
        business,
        dish: commercial_dish,
        variant: commercial_variant,
      };
    } else if (source_type === "packaged") {
      entry = {
        ...entry,
        brand,
        product,
      };
      if (variant.length > 0) {
        entry = {
          ...entry,
          variant,
        };
      }
    }

    if (ingridients.length > 0) {
      entry = {
        ...entry,
        ingridients,
      };
    }
    if (notes.length > 0) {
      entry = {
        ...entry,
        notes,
      };
    }

    return entry;
  };

  const createEntryMutation = useCreateEntry();
  const handleSubmit = async () => {
    const entry = generate_form();
    createEntryMutation.mutate(entry, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  return (
    <div className="flex flex-col w-96 justify-between">
      <div className="flex flex-col gap-4">
        <SelectConsumedDate
          consumed_at={consumed_at}
          set_consumed_at={set_consumed_at}
        />
        <SelectConsumableType
          consumable_type={consumable_type}
          set_consumable_type={set_consumable_type}
        />
        <Surface className="rounded-3xl" variant="tertiary">
          <Tabs
            className="w-full max-w-md h-80"
            selectedKey={source_type}
            onSelectionChange={(key) => set_source_type(key)}
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
                className="pt-4 flex flex-col gap-4"
                id={option.key}
                key={option.key}
              >
                {option.tab}
              </Tabs.Panel>
            ))}
          </Tabs>
        </Surface>
        <TextField name="input-ingridients" onChange={set_ingridients}>
          <Label>
            Ingridients <Optional />
          </Label>
          <TextArea
            className={"h-24"}
            placeholder="e.g. minced beef 100gr, spring onion"
          ></TextArea>
        </TextField>
        <TextField name="input-notes" onChange={set_notes}>
          <Label>
            Additional notes
            <Optional />
          </Label>
          <TextArea
            className={"h-24"}
            placeholder="e.g. ate this at 3 AM, shared with friends, less sugar..."
          ></TextArea>
        </TextField>
        <div className="flex justify-end">
          <Button
            onPress={handleSubmit}
            isDisabled={can_submit || createEntryMutation.isPending}
          >
            {createEntryMutation.isPending === true ? (
              <>
                <Spinner color="background" />
                Submitting
              </>
            ) : (
              <>Submit</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
