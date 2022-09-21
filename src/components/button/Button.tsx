import { FC, useContext } from "react";
import ThemeContext from "../../contexts/ThemeContext";
import { Theme } from "../../config/colors";
import { StyleSheet, Pressable, Text } from "react-native";

interface buttonProps {
  label: string;
  onPress: Function;
}

const Button: FC<buttonProps> = (props): JSX.Element => {
  const { label, onPress } = props;

  const { theme } = useContext(ThemeContext);
  const styles = themeStyles(theme);

  return (
    <Pressable
      onPress={() => onPress()}
      style={styles.button}
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
  });

export default Button;
