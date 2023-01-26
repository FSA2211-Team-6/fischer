import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

import { store } from "../redux/store";
import { Provider } from "react-redux";

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}
