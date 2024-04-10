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
} from "@chakra-ui/react";
import { useState } from "react";

type User = {
  name: string;
  jobTitle: string;
};

// TODO: add validation to the form
// Error state
{
  /* <Input
    isInvalid
    errorBorderColor='crimson'
    placeholder='Here is a sample placeholder'
  /> */
}
export default function Page() {
  const [user, setUser] = useState<User>();
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
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
          <Button colorScheme="teal" size="lg" onClick={handleClose}>
            Login
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
