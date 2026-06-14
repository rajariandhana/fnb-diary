import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./libs/tanstack/tanstack";
import { I18nProvider, Toast } from "@heroui/react";

export function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider locale="en-GB">
        <Toast.Provider />
        {children}
      </I18nProvider>
    </QueryClientProvider>
  );
}
