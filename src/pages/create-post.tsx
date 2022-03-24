import React from "react";
import { Wrapper } from "../components/Wrapper";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { Box, Flex, Button } from "@chakra-ui/react";

const CreatePost: React.FC<{}> = ({}) => {
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values) => {
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="title" label="Title" />
            <Box mt={4}>
              <InputField
                textarea
                name="text"
                placeholder="text..."
                label="Body"
              />
            </Box>
            <Button
              mt={4}
              isLoading={isSubmitting}
              type="submit"
              colorScheme="teal"
            >
              Create post
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default CreatePost;
