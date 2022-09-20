import React, { FC, useContext } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { ColorsType, Theme } from "../../config/index";
import ThemeContext from "../../contexts/ThemeContext";

interface inputFieldProps {
  label: string;
  value: string;
  isPassword: boolean;
  onChangeText: Function;
  error?: string;
  placeholder: string;
  disableAutoCapitalize?: boolean;
}

const InputField: FC<inputFieldProps> = (props): JSX.Element => {
  const {
    label,
    value,
    isPassword = false,
    onChangeText,
    error,
    placeholder,
    disableAutoCapitalize = false,
  } = props;

  const { theme } = useContext(ThemeContext);
  const styles = themeStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.labelText}>{label}</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : undefined}
      </View>
      <TextInput
        value={value}
        onChangeText={(value) => onChangeText(value)}
        secureTextEntry={isPassword}
        style={styles.inputText}
        placeholder={placeholder}
        autoCapitalize={disableAutoCapitalize ? "none" : "sentences"}
      />
    </View>
  );
};

const themeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primary,
      width: "100%",
      marginBottom: 10,
      padding: 10,
      borderRadius: 5,
    },
    labelText: {
      color: theme.colors.labelText,
      fontSize: 18,
      marginBottom: 10,
      fontWeight: "bold",
    },
    inputText: {
      fontSize: 18,
      color: theme.colors.text,
      marginHorizontal: 20,
    },
    errorText: {
      fontSize: 12,
      color: theme.colors.textSub,
      textTransform: "capitalize",
      marginTop: 5,
      textAlign: "right",
    },
    labelRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });

export default InputField;