import { QueryClient, QueryClientProvider } from "react-query";
import SignUpPage from "~/pages/auth/SignUpPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SignUpPage />
    </QueryClientProvider>
  );
}

export default App;
