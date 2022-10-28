import React, { FC, Ref, RefObject, useContext } from "react";
import { View, Text, TextInput, StyleSheet, KeyboardType } from "react-native";
import { Theme } from "../../config/colors";
import ThemeContext from "../../contexts/ThemeContext";

interface inputFieldProps {
  label: string;
  value: string;
  isPassword: boolean;
  onChangeText: Function;
  placeholder: string;
  error?: string;
  disableAutoCapitalize?: boolean;
  onBlur?: Function;
  keyboardType?: KeyboardType;
  onSubmitEditing?: Function;
  innerRef?: RefObject<TextInput>;
}

const InputField: FC<inputFieldProps> = (props): JSX.Element => {
  const {
    label,
    value,
    isPassword = false,
    onChangeText,
    placeholder,
    error,
    disableAutoCapitalize = false,
    onBlur,
    keyboardType,
    onSubmitEditing,
    innerRef,
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
        autoCapitalize={
          disableAutoCapitalize || keyboardType ? "none" : "sentences"
        }
        onBlur={(e) => onBlur?.(e)}
        keyboardType={keyboardType}
        autoCorrect={false}
        spellCheck={false}
        onSubmitEditing={() => onSubmitEditing?.()}
        ref={innerRef}
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
