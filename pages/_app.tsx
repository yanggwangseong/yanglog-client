import '../styles/globals.css';
import React, { useEffect, useState } from 'react'; 
import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import { getFromStorage, checkUser } from '../api/userService';
import { loginAtom } from '../atoms/loginAtom';
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
