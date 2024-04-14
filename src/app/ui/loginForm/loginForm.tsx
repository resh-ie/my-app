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
import { loginSchema } from "@/app/schema/login";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { useUserStore } from "../../providers/store/user-store-provider";

type FormData = z.infer<typeof loginSchema>;

export const LoginForm = ({}) => {
  // User Store State
  const { name, updateName, jobTitle, updateJobTitle } = useUserStore(
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
    updateName(values.name);
    updateJobTitle(values.jobTitle);
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
