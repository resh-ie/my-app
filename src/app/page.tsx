"use client";
import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Container,
} from "@chakra-ui/react";
import { loginSchema } from "./schema/login";
import {
  Stack,
  Text,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { z } from "zod";
import { gql } from "@apollo/client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { CharacterCard } from "./ui/characterCard/characterCard";
//TODO: fix the @ import
import { useUserStore } from "./providers/store/user-store-provider";
import { usePaginationStore } from "./providers/store/pagination-store-provider";
import { LoginForm } from "./ui/loginForm/loginForm";
const CHARACTERS_PER_PAGE = 10; // Number of characters per page

const query = gql`
  query Characters($page: Int!) {
    characters(page: $page) {
      results {
        id
        name
        image
        status
      }
    }
  }
`;

type FormData = z.infer<typeof loginSchema>;

export default function Home() {
  const router = useRouter();

  // Pagination State
  const { currentPage, setCurrentPage } = usePaginationStore((state) => state);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    router.push(`/?page=${page}`);
  };

  const { data } = useSuspenseQuery(query, {
    variables: { page: currentPage },
  });

  const characters = data?.characters?.results || [];

  const totalPages = Math.ceil(characters.length / CHARACTERS_PER_PAGE);

  const paginatedCharacters = characters.slice(
    (currentPage - 1) * CHARACTERS_PER_PAGE,
    currentPage * CHARACTERS_PER_PAGE
  );

  // User Store State
  const { name, updateName, jobTitle, updateJobTitle } = useUserStore(
    (state) => state
  );

  const showModalIfNameOrJobTitleIsMissing = !name || !jobTitle;

  // Login Form State
  const [isModalOpen, setIsModalOpen] = useState(
    showModalIfNameOrJobTitleIsMissing
  );

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Login Form */}
      <Modal isOpen={isModalOpen} onClose={() => {}}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <LoginForm handleOnClose={handleModalClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
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
      {paginatedCharacters.map((character) => (
        <CharacterCard
          key={character.id}
          name={character.name}
          url={character.image}
          status={character.status}
          id={character.id}
        />
      ))}
    </div>
  );
}
