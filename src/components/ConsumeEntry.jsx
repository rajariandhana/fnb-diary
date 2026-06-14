import { useEffect, useState } from "react";
import {
  Button,
  Chip,
  Label,
  Spinner,
  Tabs,
  TextArea,
  TextField,
  toast,
} from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import instance from "../libs/axios/instance";
import { SelectConsumableType } from "./SelectConsumableType";
import { SelectConsumedDate } from "./SelectConsumedDate";
import {
  DEFAULT_CONSUMABLE_TYPE,
  DEFAULT_SOURCE_TYPE,
} from "../hooks/useConsumableEntry";
import { HomemadeForm } from "./SourceTypeTabForms/HomemadeForm";
import { CommercialForm } from "./SourceTypeTabForms/CommercialForm";
import { PackagedForm } from "./SourceTypeTabForms/PackagedForm";
import { useNavigate } from "react-router";

export function ConsumeEntry() {
  const ping = async () => {
    const response = await instance.get("/ping");
    console.log(response);
  };

  const [consumable_type, set_consumable_type] = useState(
    DEFAULT_CONSUMABLE_TYPE,
  );

  const [source_type, set_source_type] = useState(DEFAULT_SOURCE_TYPE);

  const [dish, set_dish] = useState("");
  const [business, set_business] = useState("");
  const [commercial_dish, set_commercial_dish] = useState("");
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
      tab: <HomemadeForm dish={dish} set_dish={set_dish} />,
    },
    {
      key: "commercial",
      label: "Commercial",
      tab: (
        <CommercialForm
          business={business}
          set_business={set_business}
          dish={commercial_dish}
          set_dish={set_commercial_dish}
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

  const [page, set_page] = useState(0);

  const [disable_next, set_disable_next] = useState(true);
  useEffect(() => {
    if (
      (source_type == "homemade" && dish.length > 0) ||
      (source_type == "commercial" &&
        business.length > 0 &&
        commercial_dish.length > 0) ||
      (source_type == "packaged" && brand.length > 0 && product.length > 0)
    ) {
      set_disable_next(false);
    } else {
      set_disable_next(true);
    }
  }, [source_type, dish, business, commercial_dish, brand, product, variant]);

  const [is_submitting, set_is_submitting] = useState();
  const navigate = useNavigate();
  const [alert, set_alert] = useState(null);
  const generate_form = () => {
    let entry = {
      consumable_type,
      source_type,
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
    } else if (notes.length > 0) {
      entry = {
        ...entry,
        notes,
      };
    }

    console.log(entry);
    return entry;
  };
  const handleSubmit = async () => {
    try {
      set_is_submitting(true);
      const entry = generate_form();
      const response = await instance.post("/fnb/entry", entry);

      if (response.data.meta.status === 200) {
        toast.success("FnB entry created successfully");
        navigate("/");
      } else {
        toast.danger("Failed to create entry.");
      }
    } catch (error) {
      toast.danger("An unexpected error occurred.");
    } finally {
      set_is_submitting(false);
    }
  };

  return (
    <div className="flex flex-col w-96 justify-between">
      <div className="flex flex-col gap-4 h-120">
        {page === 0 ? (
          <>
            <SelectConsumedDate
              consumed_at={consumed_at}
              set_consumed_at={set_consumed_at}
            />
            <SelectConsumableType
              consumable_type={consumable_type}
              set_consumable_type={set_consumable_type}
            />
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
          </>
        ) : (
          <>
            <TextField name="input-ingridients" onChange={set_ingridients}>
              <Label>
                Ingridients{" "}
                <Chip color="accent" className="ml-2">
                  (optional)
                </Chip>
              </Label>
              <TextArea
                className={"h-32"}
                placeholder="e.g. minced beef 100gr, spring onion"
              ></TextArea>
            </TextField>
            <TextField name="input-notes" onChange={set_notes}>
              <Label>
                Additional Notes
                <Chip color="accent" className="ml-2">
                  (optional)
                </Chip>
              </Label>
              <TextArea
                className={"h-32"}
                placeholder="e.g. I ate this at like 3 AM, shared with friends, how it tasted, how you felt..."
              ></TextArea>
            </TextField>
          </>
        )}
      </div>
      <div className="flex justify-between">
        {page === 0 ? (
          <>
            <Button
              onPress={() => navigate("/")}
              variant="secondary"
            >
              Back
            </Button>
            <Button onPress={() => set_page(1)} isDisabled={disable_next}>
              Next
            </Button>
          </>
        ) : (
          <>
            <Button
              onPress={() => set_page(0)}
              variant="secondary"
              isDisabled={is_submitting}
            >
              Back
            </Button>
            <Button
              onPress={handleSubmit}
              isDisabled={is_submitting}
              className={"w-1/3"}
            >
              {is_submitting === true ? (
                <Spinner color="background" />
              ) : (
                <>Submit</>
              )}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
