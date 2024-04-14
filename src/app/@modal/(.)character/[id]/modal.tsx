"use client";
import { useEffect, useRef, type ElementRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { CloseButton, Box } from "@chakra-ui/react";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.style.display = "block";
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <div className="modal-backdrop" onClick={onDismiss}>
      <dialog
        ref={dialogRef}
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <Box
          borderWidth="1px"
          borderRadius="md"
          bg="white"
          p={4}
          boxShadow="lg"
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={onDismiss}
          />
          <Box>{children}</Box>
        </Box>
      </dialog>
    </div>,
    document.getElementById("modal-root")!
  );
}
