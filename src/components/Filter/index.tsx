import { Text, Button, IButtonProps, useTheme } from 'native-base';

type FilterProps = IButtonProps & {
  children: string;
  isActive?: boolean;
  type: 'open' | 'closed';
};

export function Filter({
  children,
  type,
  isActive = false,
  ...rest
}: FilterProps): JSX.Element {
  const { colors } = useTheme();

  const colorType = {
    open: colors.secondary['700'],
    closed: colors.green['300'],
  };

  return (
    <Button
      variant="outline"
      borderColor={isActive ? colorType[type] : colors.gray['600']}
      bgColor="gray.600"
      flex={1}
      size="sm"
      {...rest}
    >
      <Text
        fontSize="xs"
        textTransform="uppercase"
        color={isActive ? colorType[type] : 'gray.300'}
      >
        {children}
      </Text>
    </Button>
  );
}
