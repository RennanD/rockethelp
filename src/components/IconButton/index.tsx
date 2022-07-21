import {
  IconButton as NBIconButton,
  IIconButtonProps,
  useTheme,
} from 'native-base';
import { IconProps } from 'phosphor-react-native';
import React from 'react';

type IconButtonProps = Omit<IIconButtonProps, 'icon'> & {
  icon: React.ElementType<IconProps>;
};

export function IconButton({
  icon: Icon,
  ...rest
}: IconButtonProps): JSX.Element {
  const { colors } = useTheme();

  return (
    <NBIconButton
      icon={<Icon size={26} color={colors.gray['300']} />}
      h={14}
      rounded="sm"
      bg="gray.600"
      {...rest}
    />
  );
}
