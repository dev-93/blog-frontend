import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { SWRConfig } from "swr";
import fetch from "../util/fetchJson";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SWRConfig
            value={{
                fetcher: fetch,
                onError: (err) => {
                console.error(err);
                },
            }}
        >
            <Head>
                <meta name="viewport" content="viewport-fit=cover" />
            </Head>
            <RecoilRoot>
                <Component {...pageProps} />
            </RecoilRoot>
        </SWRConfig>
    )
}

export default MyApp
