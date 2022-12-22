import '../styles/globals.css';
import React from 'react'; 
import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = React.useRef(new QueryClient());

  //const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient.current}>
    {/* <QueryClientProvider client={queryClient}> */}
      <Hydrate state={pageProps.dehydratedState}>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp
