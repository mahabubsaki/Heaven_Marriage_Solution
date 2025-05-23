import { StrictMode } from 'react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import router from './Routes/Routes';
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
// tanstack query
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
const queryClient = new QueryClient();

// react router
import {
  RouterProvider,
} from "react-router-dom";

// react hot toast
import { Toaster } from 'react-hot-toast';
import AuthProvider from './Providers/AuthProvider';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </ChakraProvider>
  </StrictMode>,
);
