import { Input, IInputProps, Icon as NBIcon, useTheme } from 'native-base';
import { IconProps } from 'phosphor-react-native';
import React, { forwardRef } from 'react';

type TextInputProps = IInputProps & {
  icon?: React.ElementType<IconProps>;
};

const TextInput = forwardRef<typeof Input, TextInputProps>(
  ({ icon: Icon, ...rest }: TextInputProps, ref) => {
    const { colors } = useTheme();

    return (
      <Input
        ref={ref}
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
  },
);

export { TextInput };

// export function ({
//   icon: Icon,
//   ...rest
// }: TextInputProps): JSX.Element {

// }
