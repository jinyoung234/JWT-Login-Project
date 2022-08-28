import { ThemeProvider } from 'styled-components';
import GlobalStyle from './utils/style/globalStyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Router from './utils/route/Router';
import { theme } from './utils/style/theme';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme = {theme}>
        <GlobalStyle/>
        <Router/>
        <ReactQueryDevtools initialIsOpen panelProps={{style:{height:250}}}/>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
