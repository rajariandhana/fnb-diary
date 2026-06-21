import { EmptyState, Spinner, Table } from "@heroui/react";
import { ConsumableTypeChip } from "./ConsumableTypeChip";
import { SourceTypeChip } from "./SourceTypeChip";
import { useEntries } from "../hooks/useConsumableEntry";

export function EntriesList({ week }) {
  const { data: entries, isPending } = useEntries(week);

  return (
    <Table>
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
    </Table>
  );
}
