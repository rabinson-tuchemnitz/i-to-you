import {
  Box,
  Center,
  Image,
  List,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';

const HeroBanner = () => {
  return (
    <Center pt={8} pb={5} pr={5} pl={5}>
      <Box maxW={['30rem']}>
        <UnorderedList spacing={3}>
          <ListItem>Share any files with copyright owner's consent</ListItem>
          <ListItem>Request to block or unblock the files</ListItem>
          <ListItem>Easy drag or drop to upload multiple files</ListItem>
        </UnorderedList>
      </Box>
      <Box flexGrow="1" display={['none', 'flex']} minW="20rem">
        <Image src="/hero-img.png" />
      </Box>
    </Center>
  );
};

export default HeroBanner;
