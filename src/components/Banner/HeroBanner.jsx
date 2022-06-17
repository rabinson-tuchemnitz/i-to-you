import { Box, Center, Image, Text } from '@chakra-ui/react';

const HeroBanner = () => {
  return (
    <Center pt={8} pb={5} pr={5} pl={5}>
      <Box maxW={['30rem']}>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting
        </Text>
      </Box>
      <Box flexGrow="1" display={['none', 'flex']} minW="20rem">
        <Image src="/hero-img.png" />
      </Box>
    </Center>
  );
};

export default HeroBanner;
