import {
  IconButton as NBIconButton,
  IIconButtonProps,
  useTheme,
} from 'native-base';
import { IconProps } from 'phosphor-react-native';
import React from 'react';

type IconButtonProps = Omit<IIconButtonProps, 'icon'> & {
  icon: React.ElementType<IconProps>;
  // variant?: 'primary' | 'secondary';
};

export function IconButton({
  icon: Icon,
  // variant = 'primary',
  ...rest
}: IconButtonProps): JSX.Element {
  const { colors } = useTheme();

  // const variants = {
  //   primary: {
  //     bg: colors.green['700'],
  //     pressed: colors.green['500'],
  //   },
  //   secondary: {
  //     bg: colors.secondary['700'],
  //     pressed: colors.secondary['500'],
  //   },
  // };

  return (
    <NBIconButton
      icon={<Icon size={26} color={colors.gray['300']} />}
      h={14}
      rounded="sm"
      // bg={variants[variant].bg}
      // _pressed={{ bg: variants[variant].pressed }}
      {...rest}
    />
  );
}
