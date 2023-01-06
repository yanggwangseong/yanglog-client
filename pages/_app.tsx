import '../styles/globals.css';
import React from 'react';
import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import Root from '../layout/root';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
	const queryClient = React.useRef(new QueryClient());
	//const [queryClient] = React.useState(() => new QueryClient())

	return (
		<QueryClientProvider client={queryClient.current}>
			{/* <QueryClientProvider client={queryClient}> */}
			<Hydrate state={pageProps.dehydratedState}>
				<RecoilRoot>
					<Root>
						<main>
							<Component {...pageProps} />
							<ToastContainer
								position="top-right"
								autoClose={3000}
								hideProgressBar={false}
								newestOnTop={false}
								draggable={false}
								pauseOnHover
								closeOnClick
							/>
						</main>
					</Root>
				</RecoilRoot>
			</Hydrate>
		</QueryClientProvider>
	);
}

export default MyApp;
