"use client";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Stack,
  Text,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { CharacterCard } from "../ui/characterCard/characterCard";
import { useUserStore } from "./providers/store/user-store-provider";
import { usePaginationStore } from "./providers/store/pagination-store-provider";
import { LoginForm } from "../ui/loginForm/loginForm";
import { MenuDrawer } from "../ui/menuDrawer/menuDrawer";
import {
  CharactersQueryResponse,
  GET_ALL_CHARACTERS,
} from "@/gql/queries/getAllCharacters";

const CHARACTERS_PER_PAGE = 10; // Number of characters per page

export default function Home() {
  const router = useRouter();

  // Pagination State
  const { currentPage, setCurrentPage } = usePaginationStore((state) => state);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/?page=${page}`);
  };
  const { data } = useSuspenseQuery<CharactersQueryResponse>(
    GET_ALL_CHARACTERS,
    {
      variables: { page: currentPage },
    }
  );

  const characters = data?.characters?.results || [];

  const searchParams = useSearchParams();

  const pageNumber = searchParams.get("page");

  const totalPages = Math.ceil(characters.length / CHARACTERS_PER_PAGE);

  const paginatedCharacters = characters.slice(
    (currentPage - 1) * CHARACTERS_PER_PAGE,
    currentPage * CHARACTERS_PER_PAGE
  );

  // User Store State
  // TODO: change updateName to setName
  const { name, jobTitle } = useUserStore((state) => state);

  const showModalIfNameOrJobTitleIsMissing = !name || !jobTitle;

  // Login Form State
  const [isModalOpen, setIsModalOpen] = useState(
    showModalIfNameOrJobTitleIsMissing
  );

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Check the page query param and set the current page
  useEffect(() => {
    const page = Number(pageNumber) || 1;
    setCurrentPage(page);
  }, [pageNumber, setCurrentPage]);

  console.log({ currentPage });

  return (
    <div style={{ padding: "20px" }}>
      <Suspense>
        {/* Login Form Modal*/}
        <Modal isOpen={isModalOpen} onClose={() => {}}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Login</ModalHeader>
            <ModalBody>
              <LoginForm handleOnClose={handleModalClose} />
            </ModalBody>
          </ModalContent>
        </Modal>
        {/* Menu Draw */}
        <MenuDrawer />

        {/* Pagination Controls */}
        <Stack direction="row" spacing={4} justify="center" mt={4} mb={2}>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              colorScheme={currentPage === i + 1 ? "teal" : "gray"}
            >
              {i + 1}
            </Button>
          ))}
        </Stack>
        <Text textAlign="center" mb={4}>
          Page {currentPage} of {totalPages}
        </Text>

        {/* Characters */}
        <Stack direction="column" spacing={4} alignItems="center">
          {paginatedCharacters.map((character) => (
            <CharacterCard
              key={character.id}
              name={character.name}
              url={character.image}
              status={character.status}
              id={character.id}
            />
          ))}
        </Stack>
      </Suspense>
    </div>
  );
}
