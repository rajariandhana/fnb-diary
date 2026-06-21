import { Alert, Button, Chip, ScrollShadow, Surface } from "@heroui/react";
import { FaAnglesLeft } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router";
import ReactMarkdown from "react-markdown";

export function RoastPortion() {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  return (
    <>
      {data ? (
        <>
          <h2 className="text-lg text-left w-full">
            The Weekly Roast Presents
          </h2>
          {data.period === "SAMPLE" && (
            <div className="w-full">
							<Alert status="warning">
								<Alert.Indicator/>
								<Alert.Content>
									<Alert.Title>This is a sample output</Alert.Title>
									<Alert.Description>This output is overridden from the server because there are too many requests within a period of time that exhausts the AI token.</Alert.Description>
								</Alert.Content>
							</Alert>
            </div>
          )}
          <Surface className="flex flex-col gap-2 rounded-xl p-4 text-sm">
            <ScrollShadow className="max-h-90">
              {data.roast.split("\n\n").map((paragraph, index) => (
                <div key={index} className="leading-6 mb-4">
                  <ReactMarkdown key={index}>{paragraph}</ReactMarkdown>
                </div>
              ))}
            </ScrollShadow>
          </Surface>
        </>
      ) : (
        <>
          <Alert status="danger">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Oops no response available</Alert.Title>
              <Alert.Description>
                Go back to home and retry again!
              </Alert.Description>
            </Alert.Content>
          </Alert>
        </>
      )}
      <div className="flex w-full justify-between">
        <Button onPress={() => navigate("/")} variant="outline" size="sm">
          <FaAnglesLeft />
          Back to home
        </Button>
      </div>
    </>
  );
}
