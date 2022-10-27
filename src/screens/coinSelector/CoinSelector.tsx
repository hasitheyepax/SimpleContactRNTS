import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { FC } from "react";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";

const CoinSelector: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <View>
      <Text>CoinSelector</Text>
      <Pressable onPress={handleLogOut}>
        <Text>LogOut</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CoinSelector;
