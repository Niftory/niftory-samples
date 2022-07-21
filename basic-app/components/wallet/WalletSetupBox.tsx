import { Box, Button, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMemo } from "react";

type WalletSetupBoxProps = {
  text: string;
  buttonText: string;
  isLoading: boolean;
  error: Error;
  onClick: () => void;
};
export const WalletSetupBox = ({
  text,
  buttonText,
  isLoading,
  error,
  onClick,
}: WalletSetupBoxProps) => {
  useMemo(() => console.error(error), [error]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Box>Something went wrong. Please try again later!</Box>;
  }

  return (
    <>
      <Box maxW="xl">{text}</Box>
      <Button onClick={onClick} colorScheme="blue">
        {buttonText}
      </Button>
    </>
  );
};
