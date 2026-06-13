import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./libs/tanstack/tanstack";

export function Providers({ children }) {
  return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
  );
}
