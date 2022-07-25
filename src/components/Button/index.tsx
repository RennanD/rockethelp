import {
  Button as NBButton,
  Heading,
  IButtonProps,
  useTheme,
} from 'native-base';

type ButtonProps = Omit<IButtonProps, 'variant'> & {
  children: string;
  variant?: 'primary' | 'secondary';
};

export function Button({
  children,
  variant = 'primary',
  ...rest
}: ButtonProps): JSX.Element {
  const { colors } = useTheme();

  const variants = {
    primary: {
      bg: colors.green['700'],
      color: colors.white,
      pressed: colors.green['500'],
    },
    secondary: {
      bg: colors.secondary['700'],
      color: colors.gray['500'],
      pressed: colors.secondary['500'],
    },
  };

  return (
    <NBButton
      h={14}
      rounded="sm"
      bg={variants[variant].bg}
      opacity={rest.disabled ? 0.5 : 1}
      _pressed={{ bg: variants[variant].pressed }}
      {...rest}
    >
      <Heading color={variants[variant].color} fontSize="sm">
        {children}
      </Heading>
    </NBButton>
  );
}
