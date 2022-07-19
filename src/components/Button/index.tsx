import {
  Button as NBButton,
  Heading,
  IButtonProps,
  useTheme,
} from 'native-base';

type ButtonProps = IButtonProps & {
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
      pressed: colors.green['500'],
    },
    secondary: {
      bg: colors.secondary['700'],
      pressed: colors.secondary['500'],
    },
  };

  return (
    <NBButton
      h={14}
      rounded="sm"
      bg={variants[variant].bg}
      _pressed={{ bg: variants[variant].pressed }}
      {...rest}
    >
      <Heading color="white" fontSize="sm">
        {children}
      </Heading>
    </NBButton>
  );
}
