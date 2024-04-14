"use client";
import { Inter } from "next/font/google";
import { Providers } from "./providers/chakra/providers";
import { ApolloWrapper } from "./lib/apollo-wrapper";

import { PaginationStoreProvider } from "./providers/store/pagination-store-provider";
import { UserStoreProvider } from "./providers/store/user-store-provider";
import { Suspense } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense>
          <ApolloWrapper>
            <PaginationStoreProvider>
              <UserStoreProvider>
                <Providers>
                  <main>
                    {props.children}
                    {props.modal}
                    <div id="modal-root" />
                  </main>
                </Providers>
              </UserStoreProvider>
            </PaginationStoreProvider>
          </ApolloWrapper>
        </Suspense>
      </body>
    </html>
  );
}
