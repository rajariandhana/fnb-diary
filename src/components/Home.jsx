import { Button, EmptyState, Spinner, Table, toast } from "@heroui/react";
import { useNavigate } from "react-router";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import instance from "../libs/axios/instance";
import { useEntries } from "../hooks/useConsumableEntry";
import { ConsumableTypeChip } from "./ConsumableTypeChip";
import { SourceTypeChip } from "./SourceTypeChip";
import { ImFire } from "react-icons/im";

export default function Home() {
  const navigate = useNavigate();
  const [week, set_week] = useState("PERIOD_THIS_WEEK");
  const { data: entries, isPending } = useEntries(week);

  const [roast_loading, set_roast_loading] = useState(false);
  const handle_roast = async () => {
    set_roast_loading(true);
    try {
      const response = await instance.post("/fnb/roast", {
        period: "SAMPLE",
        // period: week,
      });
      console.log(response.data.data);
      navigate("/roast-portion", {
        state: {
          period: "SAMPLE",
          // period: week,
          roast: response.data.data.roast,
        },
      });
    } catch (error) {
      console.error(error.response.data.meta);
      toast.danger(error.response.data.meta.message);
    } finally {
      set_roast_loading(false);
    }
  };

  return (
    <>
      <h2 className="text-left w-full text-lg">
        {week === "PERIOD_THIS_WEEK" ? "This" : "Last"} Week's Roast Materials
      </h2>
      <Table variant="secondary">
        <Table.ScrollContainer>
          <Table.Content aria-label="Entries Table" className="h-full">
            <Table.Header>
              <Table.Column isRowHeader className={"column-date"}>
                Date
              </Table.Column>
              <Table.Column className={"column-type"}>Type</Table.Column>
              <Table.Column className={"column-source"}>Source</Table.Column>
              <Table.Column className={"column-name"}>Name</Table.Column>
            </Table.Header>
            <Table.Body
              renderEmptyState={() => (
                <EmptyState className="flex h-full w-full flex-col items-center justify-center text-center">
                  {isPending ? (
                    <Spinner />
                  ) : (
                    <span className="text-sm text-muted">No results found</span>
                  )}
                </EmptyState>
              )}
            >
              {!isPending &&
                entries &&
                entries.map((entry) => (
                  <Table.Row key={entry._id}>
                    <Table.Cell className={"column-date"}>
                      {new Date(entry.consumed_at).toLocaleDateString("en-AU", {
                        day: "numeric",
                        // month: "short",
                      })}
                    </Table.Cell>
                    <Table.Cell className={"column-type"}>
                      <ConsumableTypeChip type={entry.consumable_type} />
                    </Table.Cell>
                    <Table.Cell className={"column-source"}>
                      <SourceTypeChip type={entry.source_type} />
                    </Table.Cell>
                    <Table.Cell className={"column-name"}>
                      {entry.source_type === "packaged" ? (
                        <>
                          {entry.product} {entry.variant}
                        </>
                      ) : (
                        <>{entry.dish}</>
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        <Table.Footer className="w-full justify-between items-center">
          <Button
            size="sm"
            variant="outline"
            onPress={() => set_week("PERIOD_LAST_WEEK")}
            isDisabled={week === "PERIOD_LAST_WEEK"}
          >
            <FaAnglesLeft />
            Last week's
          </Button>
          <Button
            size="sm"
            variant="outline"
            onPress={() => set_week("PERIOD_THIS_WEEK")}
            isDisabled={week === "PERIOD_THIS_WEEK"}
          >
            This week's
            <FaAnglesRight />
          </Button>
        </Table.Footer>
      </Table>
      <div className="absolute z-20 bottom-12 flex gap-x-4">
        <Button
          onPress={handle_roast}
          className={"rounded-full"}
          size="lg"
          variant="danger-soft"
          isDisabled={isPending || entries.length === 0 || roast_loading}
        >
          {roast_loading ? (
            <Spinner color="danger" />
          ) : (
            <ImFire color="danger" />
          )}
          Roast
        </Button>
        <Button
          onPress={() => navigate("/entry")}
          className={"rounded-full"}
          size="lg"
        >
          <FaPlus color="current" size={48} />
          Add entry
        </Button>
      </div>
    </>
  );
}
