"use client";
import { Inter } from "next/font/google";
import { Providers } from "./providers/providers";
import { ApolloWrapper } from "./lib/apollo-wrapper";
import { CounterStoreProvider } from "./providers/store/counterStoreProvider";
const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Reshy Next Js",
//   description:
//     "A sample Next.js app showing dynamic routing with modals as a route.",
//   metadataBase: new URL("https://nextgram.vercel.app"),
// };

// TODO: make it read only
export default function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <CounterStoreProvider>
            <Providers>
              {props.children}
              {props.modal}
              <div id="modal-root" />
            </Providers>
          </CounterStoreProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
