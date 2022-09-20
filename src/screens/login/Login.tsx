import React, { FC, useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import * as yup from "yup";
import { useFormik } from "formik";
import { InputField } from "../../components";
import ThemeContext from "../../contexts/ThemeContext";
import { Theme } from "../../config";

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

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.headerText}>Login</Text>
      <View style={styles.inputContainer}>
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
      </View>
      <Button title={"Login"} onPress={formik.submitForm} />
    </View>
  );
};

const themeStyles = (theme: Theme) =>
  StyleSheet.create({
    headerText: {},
    pageContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    inputContainer: {
      width: "70%",
    },
  });

export default Login;
