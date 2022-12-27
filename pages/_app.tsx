import '../styles/globals.css';
import React, { useEffect } from 'react'; 
import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { getFromStorage, checkUser } from '../api/userService';
import { loginAtom } from '../atoms/loginAtom';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = React.useRef(new QueryClient());

  //const [queryClient] = React.useState(() => new QueryClient())
  useEffect(() => {
      const accessToken = getFromStorage('accessToken');
      async function refreshData() {
        const data = await checkUser(accessToken ? accessToken : "");
        console.log(data);
      }
      refreshData();
  },[]);
  
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
