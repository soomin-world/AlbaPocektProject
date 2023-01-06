import { QueryClientProvider } from "@tanstack/react-query";
import Router from "./shared/Router";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router />;
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
