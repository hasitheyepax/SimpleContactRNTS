import { FC, useContext } from "react";
import { StyleSheet, View } from "react-native";
import ThemeContext from "../../contexts/ThemeContext";
import { Theme } from "../../config/colors";
import { InputField } from "../../components";
import * as yup from "yup";
import { useFormik } from "formik";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
  passwordVerify: yup.string().required("Re-enter the password here"),
});

const Register: FC = (): JSX.Element => {
  const { theme } = useContext(ThemeContext);
  const styles = themeStyles(theme);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordVerify: "",
    },
    validationSchema,
    validateOnMount: false,
    validateOnChange: false,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          label={"Name"}
          value={formik.values.name}
          isPassword={false}
          onChangeText={formik.handleChange("name")}
          placeholder={"Your name"}
          error={formik.errors.name}
        />
        <InputField
          label={"Email"}
          value={formik.values.email}
          isPassword={false}
          onChangeText={formik.handleChange("email")}
          placeholder={"Your email address"}
          error={formik.errors.email}
        />
        <InputField
          label={"Password"}
          value={formik.values.password}
          isPassword={false}
          onChangeText={formik.handleChange("password")}
          placeholder={"Password"}
          error={formik.errors.password}
        />
        <InputField
          label={"Verify Password"}
          value={formik.values.passwordVerify}
          isPassword={false}
          onChangeText={formik.handleChange("passwordVerify")}
          placeholder={"Password, again"}
          error={formik.errors.passwordVerify}
        />
      </View>
    </View>
  );
};

const themeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
    inputContainer: {
      width: "85%",
    },
    headerText: {
      color: theme.colors.text,
      fontSize: 24,
    },
  });

export default Register;
