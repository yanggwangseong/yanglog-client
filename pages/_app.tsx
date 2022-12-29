import '../styles/globals.css';
import React from 'react'; 
import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import Root from '../layout/root';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = React.useRef(new QueryClient());
  //const [queryClient] = React.useState(() => new QueryClient())

  
  return (
    <QueryClientProvider client={queryClient.current}>
    {/* <QueryClientProvider client={queryClient}> */}
      <Hydrate state={pageProps.dehydratedState}>
        <RecoilRoot>
          <Root>
            <Component {...pageProps} />
          </Root>
        </RecoilRoot>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp
