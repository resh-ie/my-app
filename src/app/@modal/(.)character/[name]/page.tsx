import { Modal } from "./modal";

export default function PhotoModal({
  params: { name: photoId },
}: {
  params: { name: string };
}) {
  return <Modal>Hello world</Modal>;
}
