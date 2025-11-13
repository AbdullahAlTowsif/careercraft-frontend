import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './components/theme-provider.tsx'
import { RouterProvider } from 'react-router'
import { router } from './routes/routes.tsx'
import { Provider as ReduxProvider } from "react-redux";
import { store } from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
    </ReduxProvider>
  </StrictMode>,
)
