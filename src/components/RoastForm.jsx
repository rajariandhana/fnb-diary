import {
  Alert,
  Button,
  Chip,
  Description,
  Label,
  Radio,
  RadioGroup,
  Spinner,
  TextField,
} from "@heroui/react";
import clsx from "clsx";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ImFire } from "react-icons/im";
import { MINIMUM_ROAST, useEntries } from "../hooks/useConsumableEntry";
import { useCreateRoast } from "../hooks/useRoast";
import { FaRegClock } from "react-icons/fa6";

export default function RoastForm() {
  const navigate = useNavigate();
  const [period, set_period] = useState(null);

  const { data: entries_this_week, isPending: isPending_entries_this_week } =
    useEntries("PERIOD_THIS_WEEK");
  const { data: entries_last_week, isPending: isPending_entries_last_week } =
    useEntries("PERIOD_LAST_WEEK");

  const week_options = [
    {
      key: "PERIOD_THIS_WEEK",
      label: "This Week",
      entries: entries_this_week,
    },
    {
      key: "PERIOD_LAST_WEEK",
      label: "Last Week",
      entries: entries_last_week,
    },
  ];

  const formatWeekRange = (entries) => {
    if (!entries?.length) return "";

    const dates = entries
      .map((e) => new Date(e.consumed_at))
      .sort((a, b) => a - b);

    const start = dates[0];
    const end = dates[dates.length - 1];

    const formatter = new Intl.DateTimeFormat("en-AU", {
      day: "2-digit",
      month: "short",
    });

    return `${formatter.format(start)} - ${formatter.format(end)}`;
  };

  const createRoastMutation = useCreateRoast();
  const handle_roast = async () => {
    // const period = "SAMPLE";
    createRoastMutation.mutate(
      {
        period,
      },
      {
        onSuccess: (newRoast) => {
          // console.log("RoastForm", newRoast);
          navigate(`/roast/${newRoast._id ?? "SAMPLE"}`, {
            state: newRoast,
          });
        },
      },
    );
  };

  if (isPending_entries_this_week || isPending_entries_last_week) {
    return <Spinner />;
  }

  return (
    <>
      <TextField className={"w-full"}>
        <div className="flex items-center gap-x-2">
          <Label isRequired>Which week to roast? </Label>
          <Chip size="sm" color="accent" variant="soft">
            (requires 5 entries minimum)
          </Chip>
        </div>
        <RadioGroup
          value={period}
          onChange={set_period}
          variant="secondary"
          className="grid grid-cols-1 md:grid-cols-2 w-full gap-2 justify-between"
        >
          {week_options.map((option) => (
            <Radio
              key={option.key}
              value={option.key}
              className={clsx(
                "group relative flex-col w-full gap-4 rounded-xl border border-transparent bg-surface px-5 py-4 transition-all data-[selected=true]:border-accent data-[selected=true]:bg-accent/10",
                "data-[focus-visible=true]:border-accent data-[focus-visible=true]:bg-accent/10",
              )}
              isDisabled={option.entries.length < MINIMUM_ROAST}
            >
              <Radio.Control className="absolute top-3 right-4 size-5">
                <Radio.Indicator />
              </Radio.Control>
              <Radio.Content className="flex gap-2">
                <div className="flex gap-2 items-center">
                  <Label>{option.label}</Label>
                  <Description>
                    <>({formatWeekRange(option.entries)})</>
                  </Description>
                </div>
                <Description className="flex w-full justify-between">
                  <>{option.entries.length} entries</>
                </Description>
              </Radio.Content>
            </Radio>
          ))}
        </RadioGroup>
      </TextField>
      <Alert status="accent">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Coming Soon</Alert.Title>
          <Alert.Description>
            You will be able to choose a persona for roasting
          </Alert.Description>
        </Alert.Content>
      </Alert>
      <div className="flex justify-between w-full items-center">
        <Button
          onPress={() => navigate("/roast-history")}
          size="sm"
          isDisabled={createRoastMutation.isPending}
          variant="outline"
        >
          <FaRegClock />
          History
        </Button>
        <Button
          onPress={handle_roast}
          className={"rounded-full"}
          size="lg"
          variant="danger-soft"
          isDisabled={(period === null) | createRoastMutation.isPending}
        >
          {createRoastMutation.isPending ? (
            <>
              <Spinner color="background" />
              Roasting...
            </>
          ) : (
            <>
              <ImFire color="danger" />
              Roast
            </>
          )}
        </Button>
      </div>
    </>
  );
}
