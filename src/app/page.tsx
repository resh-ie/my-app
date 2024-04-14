"use client";
import { Suspense, FC } from "react";
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
  Character,
} from "@/gql/queries/getAllCharacters";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const CHARACTERS_PER_PAGE = 10; // Number of characters per page

const Home: FC = () => {
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

  return (
    <div style={{ padding: "20px" }}>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginFormModal isModalOpen={isModalOpen} onClose={handleModalClose} />
        <MenuDrawer />
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
        <Text textAlign="center" mb={4}>
          Page {currentPage} of {totalPages}
        </Text>
        <Characters paginatedCharacters={paginatedCharacters} />
      </Suspense>
    </div>
  );
};

interface LoginFormModalProps {
  isModalOpen: boolean;
  onClose: () => void;
}

const LoginFormModal: FC<LoginFormModalProps> = ({ isModalOpen, onClose }) => {
  return (
    <Modal isOpen={isModalOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalBody>
          <LoginForm handleOnClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const PaginationControls: FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  return (
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
  );
};

interface CharactersProps {
  paginatedCharacters: Character[];
}

const Characters: FC<CharactersProps> = ({ paginatedCharacters }) => {
  return (
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
  );
};

export default Home;
