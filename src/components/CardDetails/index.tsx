import { VStack, HStack, Text, useTheme, Box, StyledProps } from 'native-base';
import { IconProps } from 'phosphor-react-native';
import { ElementType, ReactNode } from 'react';

type CardDetailsProps = StyledProps & {
  title: string;
  description?: string;
  footer?: string;
  icon: ElementType<IconProps>;
  children?: ReactNode;
};

export function CardDetails({
  icon: Icon,
  title,
  children,
  description,
  footer,
  ...rest
}: CardDetailsProps): JSX.Element {
  const { colors } = useTheme();

  return (
    <VStack bg="gray.600" p={5} {...rest}>
      <HStack alignItems="center" mb={4}>
        <Icon size={16} color={colors.primary['700']} />
        <Text ml={2} color="gray.300" fontSize="sm" textTransform="uppercase">
          {title}
        </Text>
      </HStack>
      {!!description && (
        <Text color="gray.100" fontSize="md">
          {description}
        </Text>
      )}

      {children}

      {!!footer && (
        <Box borderTopWidth={1} borderTopColor="gray.400" mt={3}>
          <Text mt={3} color="gray.300" fontSize="sm">
            {footer}
          </Text>
        </Box>
      )}
    </VStack>
  );
}
