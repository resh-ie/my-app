"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Container,
} from "@chakra-ui/react";

import { Stack, Text, Button, Input } from "@chakra-ui/react";
import { z } from "zod";
import { loginSchema } from "@/schema/login";
import { useForm, SubmitHandler } from "react-hook-form";

import { useUserStore } from "@/app/providers/store/user-store-provider";
import { FC } from "react";

type FormData = z.infer<typeof loginSchema>;

type LoginFormProps = {
  handleOnClose: () => void;
};

export const LoginForm: FC<LoginFormProps> = ({ handleOnClose }) => {
  // User Store State
  const { name, setName, jobTitle, setJobTitle } = useUserStore(
    (state) => state
  );

  const defaultValues: FormData = {
    name: name ?? "",
    jobTitle: jobTitle ?? "",
  };

  // React Hook Form
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormData> = (values) => {
    setName(values.name);
    setJobTitle(values.jobTitle);
    handleOnClose();
  };

  return (
    <Container mt={8} mb={20} as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={6}>
        <FormControl id="name" isInvalid={!!errors.name}>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Please enter your name"
            type="text"
            {...register("name")}
          />
          {!errors.name ? (
            <FormHelperText>
              We do not share your name with anyone.
            </FormHelperText>
          ) : (
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl id="name" isInvalid={!!errors.jobTitle}>
          <FormLabel>Job Title</FormLabel>
          <Input
            placeholder="Please enter your job title"
            type="text"
            {...register("jobTitle")}
          />
          {!errors.jobTitle ? (
            <FormHelperText>Enter your current job title.</FormHelperText>
          ) : (
            <FormErrorMessage>{errors.jobTitle?.message}</FormErrorMessage>
          )}
        </FormControl>
        <Button
          colorScheme="teal"
          size="lg"
          type="submit"
          className="submit-button"
          isLoading={isSubmitting}
        >
          Submit
        </Button>
      </Stack>
    </Container>
  );
};
