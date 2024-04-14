import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
} from "@chakra-ui/react";
import { FC } from "react";
import Link from "next/link";

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
  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src={url}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{name}</Heading>
          <Text color="blue.600" fontSize="2xl">
            {status}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          {/* TODO: use the button and router push instead of Link */}
          <Link passHref href={`/character/${id}`}>
            View {name}
          </Link>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
