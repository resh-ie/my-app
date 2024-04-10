"use client";
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

type User = {
  name: string;
  jobTitle: string;
};

// TODO: figure out why modal is not opening when imported into page.tsx
export const LoginForm = () => {
  const [user, setUser] = useState<User>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
          <Button colorScheme="teal" size="lg" onClick={onClose}>
            Login
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
