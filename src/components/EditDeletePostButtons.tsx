import { Flex, Link, IconButton } from "@chakra-ui/react";
import NextLink from "next/link";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostButtonProps {
  id: number;
  creatorId: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonProps> = ({
  id,
  creatorId,
}) => {
  const [{ data: meData }] = useMeQuery();
  const [, deletePost] = useDeletePostMutation();

  if (meData?.me?.id !== creatorId) {
    return null;
  }

  return (
    <Flex flexDir="column" ml="auto">
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          as={Link}
          ml="auto"
          mb={4}
          icon={<EditIcon />}
          aria-label="edit post"
        />
      </NextLink>
      <IconButton
        ml="auto"
        icon={<DeleteIcon />}
        aria-label="delete post"
        onClick={() => {
          deletePost({ id });
        }}
      />
    </Flex>
  );
};
