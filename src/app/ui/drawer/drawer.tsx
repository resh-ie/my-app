import {
  Box,
  Drawer,
  Stack,
  DrawerOverlay,
  Button,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
  DrawerFooter,
  DrawerHeader,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import { LoginForm } from "../loginForm/loginForm";

export const MenuDrawer = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  return (
    <>
      <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
        Edit User Details
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        // initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
           User Details
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">

              <Box>
                <LoginForm handleOnClose={onClose} />
              </Box>

            </Stack>
          </DrawerBody>

          {/* <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Submit</Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  );
};
