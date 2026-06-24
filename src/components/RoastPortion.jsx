import { Alert, Button, ScrollShadow, Spinner, Surface } from "@heroui/react";
import { useLocation, useNavigate, useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import { useQuery } from "@tanstack/react-query";
import { fetchRoast } from "../hooks/useRoast";
import { FaRegClock } from "react-icons/fa6";

export function RoastPortion() {
  const { roast_id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { data, isPending } = useQuery({
    queryKey: ["entryRoasts", roast_id],
    queryFn: fetchRoast,
    initialData: location.state,
    enabled: roast_id !== "SAMPLE",
  });

  return (
    <>
      {data ? (
        <>
          <h2>
            The Weekly Roast Presents...
          </h2>
          {data.period && data.period === "SAMPLE" && (
            <div className="w-full">
              <Alert status="warning">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>This is a sample output</Alert.Title>
                  <Alert.Description>
                    This output is overridden from the server because there are
                    too many requests within a period of time that exhausts the
                    AI token.
                  </Alert.Description>
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
        <Spinner />
      )}
			<div className="flex justify-between w-full items-center">
        <Button
          onPress={() => navigate("/roast-history")}
          size="sm"
          variant="outline"
        >
          <FaRegClock />
          History
        </Button>
      </div>
    </>
  );
}
