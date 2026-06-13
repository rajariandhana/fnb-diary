import { useState } from "react";
import {
  Button,
  Calendar,
  DateField,
  DatePicker,
  Label,
  Tabs,
} from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import instance from "../libs/axios/instance";

export function ConsumeEntry() {
  const [value, setValue] = useState(today(getLocalTimeZone()));
  const ping = async () => {
    const response = await instance.get("/ping");
    console.log(response);
  };
	
  return (
    <>
      <DatePicker value={value} onChange={setValue}>
        <Label>Date</Label>
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

      <Tabs className="w-full max-w-md">
        <Tabs.ListContainer>
          <Tabs.List aria-label="Options">
            <Tabs.Tab id="overview">
              Homemade
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="analytics">
              Eating Out
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="reports">
              Ultraprocessed
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
        <Tabs.Panel className="pt-4" id="overview">
          <p>View your project overview and recent activity.</p>
        </Tabs.Panel>
        <Tabs.Panel className="pt-4" id="analytics">
          <p>Track your metrics and analyze performance data.</p>
        </Tabs.Panel>
        <Tabs.Panel className="pt-4" id="reports">
          <p>Generate and download detailed reports.</p>
        </Tabs.Panel>
      </Tabs>

      <Button onPress={ping}>My Button</Button>
    </>
  );
}
