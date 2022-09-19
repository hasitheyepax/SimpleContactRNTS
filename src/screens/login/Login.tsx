import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import React, { FC } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { InputField } from "../../components";

const validationSchema = yup.object({
  email: yup.string().email().required("we need your email"),
  password: yup.string().required("a strong password is a must"),
});

const Login: FC = (): JSX.Element => {
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
      <Text>Login</Text>
      <View style={styles.inputContainer}>
        <InputField
          label={"Email"}
          value={formik.values.email}
          isPassword={false}
          onChangeText={formik.handleChange("email")}
          error={formik.errors.email}
          placeholder={"Your email address"}
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

const styles = StyleSheet.create({
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
