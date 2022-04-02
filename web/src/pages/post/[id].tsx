import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { Heading, Flex, Box, Text } from "@chakra-ui/react";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import { withUrqlClient } from "next-urql";

const Post = ({}) => {
  const router = useRouter();
  const [{ data, error, fetching }] = useGetPostFromUrl();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (fetching) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <div>Could not find post</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Flex my="15%" shadow="md" p={5} borderWidth="1px" flexDir="column">
        <Box p={4}>
          <Box borderBottom="1px solid">
            <Heading mb={4}>{data.post.title}</Heading>
          </Box>
          <Box my={4} p={4}>
            <Text>{data.post.text}</Text>
          </Box>
          <EditDeletePostButtons
            id={data.post.id}
            creatorId={data.post.creator.id}
          />
        </Box>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
