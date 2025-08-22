import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

//QueryClient = the manager that stores all our query states & caches.
//QueryClientProvider = gives access to that manager across our app.
//Without it, we couldn’t use React Query hooks like useQuery or useMutation
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
