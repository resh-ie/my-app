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
import { LoginForm } from "../loginForm/loginForm";

export const MenuDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button leftIcon={<EditIcon />} colorScheme="teal" onClick={onOpen}>
        Edit User Details
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">User Details</DrawerHeader>

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
