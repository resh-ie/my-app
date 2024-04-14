import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import { FC } from "react";
import { useRouter } from "next/navigation";

type CharacterCardProps = {
  name: string;
  url: string;
  status: "Alive" | "Dead" | "unknown";
  id: string;
};

export const CharacterCard: FC<CharacterCardProps> = ({
  name,
  url,
  status,
  id,
}) => {
  const router = useRouter();

  const handleViewCharacter = () => {
    router.push(`/character/${id}`);
  };

  return (
    <Card maxW="sm">
      <Image src={url} alt={name} borderRadius="lg" />
      <CardBody>
        <Stack spacing="3">
          <Heading size="md">{name}</Heading>
          <Text color="blue.600" fontSize="lg">
            {status}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter justifyContent="flex-end">
        <Button onClick={handleViewCharacter} colorScheme="teal" size="sm">
          View {name}
        </Button>
      </CardFooter>
    </Card>
  );
};
