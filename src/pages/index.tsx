import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import {
  Text,
  Link,
  Stack,
  Box,
  Heading,
  Flex,
  Button,
  IconButton,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { UpdootSection } from "../components/UpdootSection";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });

  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return <div>No posts found. Try refreshing the page</div>;
  }

  return (
    <Layout>
      <Flex align="center">
        <Heading>Reddit</Heading>
        <NextLink href="/create-post">
          <Link ml="auto">create post</Link>
        </NextLink>
      </Flex>
      <br />
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map((p) =>
            !p ? null : (
              <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                <UpdootSection post={p} />
                <Box flex={1}>
                  <Heading fontSize="xl">{p.title}</Heading>
                  <Text>Posted by: {p.creator.username}</Text>
                  <Text mt={4}>{p.textSnippet + " ..."}</Text>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            m="auto"
            my={8}
          >
            Load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
