"use client";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Input,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

export const dynamic = "force-dynamic";

import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { CharacterCard } from "./ui/characterCard/characterCard";

type User = {
  name: string;
  jobTitle: string;
};

const query = gql`
  query {
    characters {
      results {
        id
        name
        image
        status
      }
    }
  }
`;

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = () => {
    closeModal();
  };
  const { data } = useSuspenseQuery(query);
  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <Text>Please enter your name:</Text>
              <Input placeholder="Enter first and last name" size="lg" />
              <Text>Please enter your job title:</Text>
              <Input placeholder="Enter your job title" size="lg" />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" size="lg" onClick={handleLogin}>
              Login
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Characters */}
      {data?.characters?.results?.map((character: any) => (
        <CharacterCard
          key={character.name}
          name={character.name}
          url={character.image}
          status={character.status}
        />
      ))}
    </div>
  );
}
