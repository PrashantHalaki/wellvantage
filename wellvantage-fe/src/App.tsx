import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';

import '@/App.css';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/context/auth';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <Routes>
          <Route
            path='/'
            element={<h1 className='text-3xl font-bold underline'>Hello world!</h1>}
          />
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
