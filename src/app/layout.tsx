"use client";
import { Inter } from "next/font/google";
import { Providers } from "./providers/chakra/providers";
import { ApolloWrapper } from "./lib/apollo-wrapper";
// TODO: combine the user and provider store together
import { PaginationStoreProvider } from "./providers/store/pagination-store-provider";
import { UserStoreProvider } from "./providers/store/user-store-provider";
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
          <PaginationStoreProvider>
            <UserStoreProvider>
              <Providers>
                {props.children}
                {props.modal}
                <div id="modal-root" />
              </Providers>
            </UserStoreProvider>
          </PaginationStoreProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
