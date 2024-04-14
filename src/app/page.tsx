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
// import { LoginForm } from "./ui/loginForm/loginForm";

type User = {
  name: string;
  jobTitle: string;
};

export default function Home() {
  const [user, setUser] = useState<User>();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = () => {
    router.push("/information");
    closeModal();
  };
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
    </div>
  );
}
