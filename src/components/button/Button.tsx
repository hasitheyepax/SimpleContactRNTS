import { FC, useContext } from "react";
import ThemeContext from "../../contexts/ThemeContext";
import { Theme } from "../../config/colors";
import { StyleSheet, Pressable, Text } from "react-native";

interface buttonProps {
  label: string;
  onPress: Function;
  disabled?: boolean;
}

const Button: FC<buttonProps> = (props): JSX.Element => {
  const { label, onPress, disabled = false } = props;

  const { theme } = useContext(ThemeContext);
  const styles = themeStyles(theme);

  return (
    <Pressable
      onPress={() => !disabled && onPress()}
      style={disabled ? styles.disabledButton : styles.button}
      android_ripple={{
        color: theme.colors.card,
      }}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
};

const themeStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      backgroundColor: theme.colors.buttonBody,
      alignItems: "center",
      justifyContent: "center",
      height: 50,
      borderRadius: theme.borderRadius,
    },
    buttonText: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.colors.labelText,
    },
    disabledButton: {
      backgroundColor: theme.colors.disabledButtonBody,
      alignItems: "center",
      justifyContent: "center",
      height: 50,
      borderRadius: theme.borderRadius,
    },
  });

export default Button;
