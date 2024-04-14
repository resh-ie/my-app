"use client";
import {
  Box,
  Drawer,
  Stack,
  DrawerOverlay,
  Button,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
  DrawerHeader,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { LoginForm } from "@/ui/loginForm/loginForm";
import { useUserStore } from "@/app/providers/store/user-store-provider";

export const MenuDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { name, jobTitle } = useUserStore((state) => state);

  return (
    <>
      <Button leftIcon={<EditIcon />} colorScheme="teal" onClick={onOpen}>
        Edit User Details
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            User Info for {name} with current job as {jobTitle}
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <LoginForm handleOnClose={onClose} />
              </Box>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
