import { Modal } from "./modal";

import CharacterPage from "@/app/character/[name]/page";

export default function PhotoModal({
  params: { name: name },
}: {
  params: { name: string };
}) {
  return (
    <Modal>
      <CharacterPage />
    </Modal>
  );
}
