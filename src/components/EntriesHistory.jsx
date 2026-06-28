import { Alert } from "@heroui/react";

export default function EntriesHistory() {
  return (
    <>
      <h2>FnB Entries</h2>
      <Alert status="warning">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Under Construction</Alert.Title>
          <Alert.Description>
            Sorry, this page is under construction, please come back some other time.
          </Alert.Description>
        </Alert.Content>
      </Alert>
    </>
  );
}
