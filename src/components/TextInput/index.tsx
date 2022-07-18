import { Input, IInputProps, Icon as NBIcon, useTheme } from 'native-base';
import { IconProps } from 'phosphor-react-native';
import React from 'react';

type TextInputProps = IInputProps & {
  icon?: React.ElementType<IconProps>;
};

export function TextInput({
  icon: Icon,
  ...rest
}: TextInputProps): JSX.Element {
  const { colors } = useTheme();

  return (
    <Input
      bg="gray.700"
      h={14}
      size="md"
      borderWidth={1}
      borderColor="gray.700"
      fontSize="md"
      fontFamily="body"
      color="white"
      placeholderTextColor="gray.300"
      _focus={{
        backgroundColor: 'gray.700',
        borderWidth: 1,
        borderColor: 'green.500',
      }}
      leftElement={
        Icon && <NBIcon ml={4} as={<Icon color={colors.gray['100']} />} />
      }
      {...rest}
    />
  );
}
