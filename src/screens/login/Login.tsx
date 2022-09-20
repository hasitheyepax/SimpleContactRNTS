import React, { FC, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import * as yup from "yup";
import { useFormik } from "formik";
import { InputField } from "../../components";
import ThemeContext from "../../contexts/ThemeContext";
import { Theme } from "../../config/colors";
import { HideKeyboard } from "../../components";

const validationSchema = yup.object({
  email: yup.string().email().required("An email is needed"),
  password: yup.string().required("A password is needed"),
});

const Login: FC = (): JSX.Element => {
  const { theme } = useContext(ThemeContext);
  const styles = themeStyles(theme);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
    validateOnChange: true,
    validateOnMount: false,
  });

  const handleRegisterPress: Function = () => {
    console.log("Navigate to register from here");
  };

  return (
    <HideKeyboard>
      <View style={styles.pageContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{"🪙 Coin Trick"}</Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.inputContainer}
        >
          <InputField
            label={"Email"}
            value={formik.values.email}
            isPassword={false}
            onChangeText={formik.handleChange("email")}
            error={formik.errors.email}
            placeholder={"Your email address"}
            disableAutoCapitalize
          />
          <InputField
            label={"Password"}
            value={formik.values.password}
            isPassword={true}
            onChangeText={formik.handleChange("password")}
            error={formik.errors.password}
            placeholder={"Enter your password"}
          />
        </KeyboardAvoidingView>
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={formik.handleSubmit}
            style={styles.button}
            android_ripple={{
              color: theme.colors.card,
            }}
          >
            <Text style={styles.buttonText}>{"Login"}</Text>
          </Pressable>
          <View style={styles.margin} />
          <Pressable
            onPress={() => handleRegisterPress()}
            style={styles.button}
            android_ripple={{
              color: theme.colors.card,
            }}
          >
            <Text style={styles.buttonText}>{"Register"}</Text>
          </Pressable>
        </View>
      </View>
    </HideKeyboard>
  );
};

const themeStyles = (theme: Theme) =>
  StyleSheet.create({
    pageContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
    headerContainer: {
      flex: 2,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 40,
    },
    headerText: {
      fontSize: 40,
      fontWeight: "700",
      letterSpacing: 4,
      color: theme.colors.text,
    },
    inputContainer: {
      width: "85%",
      marginBottom: 40,
    },
    buttonContainer: {
      flex: 2,
      width: "70%",
    },
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
    margin: {
      height: theme.verticalMargin,
    },
  });

export default Login;
