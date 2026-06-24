import { Button, EmptyState, Spinner, Table } from "@heroui/react";
import { useEntryRoasts } from "../hooks/useRoast";
import { useNavigate } from "react-router";
import { GoLinkExternal } from "react-icons/go";
// import { ImFire } from "react-icons/im";

export default function RoastHistory() {
  const navigate = useNavigate();
  const { data: entries, isPending } = useEntryRoasts();
  return (
    <>
      <h2>Previously Generated Roasts</h2>
      {/* <ImFire /> */}
      <Table variant="secondary">
        <Table.ScrollContainer>
          <Table.Content aria-label="Roast History Table" className="h-full">
            <Table.Header>
              <Table.Column isRowHeader>Period</Table.Column>
              <Table.Column isRowHeader>Created at</Table.Column>
              <Table.Column isRowHeader>Num. entries</Table.Column>
              <Table.Column isRowHeader>Link</Table.Column>
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
                    <Table.Cell>
                      {new Date(entry.start).toLocaleDateString("en-AU", {
                        day: "numeric",
                        month: "short",
                      })}
											{" - "}
											{new Date(entry.end).toLocaleDateString("en-AU", {
                        day: "numeric",
                        month: "short",
                      })}
                    </Table.Cell>
                    <Table.Cell>
                      {new Date(entry.createdAt).toLocaleDateString("en-AU", {
                        day: "numeric",
                        month: "short",
                      })}
                    </Table.Cell>
                    <Table.Cell>{entry.entries_id.length}</Table.Cell>
                    <Table.Cell>
                      <Button
                        onPress={() => navigate(`/roast/${entry._id}`)}
                        isIconOnly
                        size="sm"
                        className={"rounded-full"}
                        variant="ghost"
                      >
                        <GoLinkExternal />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </>
  );
}
