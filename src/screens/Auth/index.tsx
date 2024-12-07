import {
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import globalStyles from 'assets/styles/globalStyles';
import color from 'assets/styles/color';
import {ActivityIndicator, Avatar, Button, Text} from 'react-native-paper';
import fonts from 'assets/styles/fonts';
import {TextInput} from 'components';
import {Person} from 'assets/icons';
import {api, setToken} from 'api';
import Toast from 'react-native-toast-message';
import useStore from 'store';
// @ts-ignore
import {get} from 'lodash';
import {reset} from 'navigators/NavigationService';

const Auth = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {setUserData, userData} = useStore();

  useEffect(() => {
    setUserData({auth_token: ''});
  }, []);

  const loginHandler = useCallback((login: string, password: string) => {
    setLoading(true);
    api
      .post('/users/login', {
        username: login,
        password,
      })
      .then(response => {
        showToast('success', 'Tabriklaymiz', 'Siz dasturga kirdingiz!');
        setUserData({
          auth_token: get(response, 'data.access_token', ''),
          ...get(response, 'data', {}),
        });
        setToken(get(response, 'data.access_token', ''));
        if (get(response, 'data.user_role', '') === 'admin') {
          reset('Tabs', 0);
        } else {
          reset('SellerTabs', 1);
        }
      })
      .catch(error => {
        showToast('error', 'Xatolik', "Login yoki parol noto'g'ri!");
      })
      .finally(() => setLoading(false));
  }, []);

  const showToast = useCallback(
    (type: 'success' | 'error' | 'info', text1: string, text2: string) => {
      Toast.show({
        type: type,
        text1,
        text2,
        onPress: () => {
          Toast.hide();
        },
      });
    },
    [],
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[globalStyles.center, {backgroundColor: color.white}]}>
        <ScrollView
          style={{width: '100%'}}
          contentContainerStyle={{
            alignItems: 'center',
            flexGrow: 1,
            paddingVertical: 30,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Avatar.Text size={122} label="RN" />
          <Text
            variant="titleMedium"
            style={{
              color: color.descColor,
              textAlign: 'center',
              maxWidth: 250,
              fontFamily: fonts.ManropeMedium,
              marginVertical: 10,
            }}>
            Some description {'\n'} about the app here ...
          </Text>
          <Text
            variant="headlineSmall"
            style={{
              marginVertical: 10,
              color: color.descColor,
              fontFamily: fonts.ManropeSemiBold,
            }}>
            Welcome to <Text style={{color: color.brandColor}}>.RN</Text>
          </Text>

          <TextInput
            rightIcon={<Person />}
            value={login}
            setValue={setLogin}
            placeholder="Login"
          />
          <TextInput
            value={password}
            setValue={setPassword}
            placeholder="Password"
            isPassword={true}
          />
          <Button
            mode="elevated"
            buttonColor={color.brandColor}
            textColor={color.white}
            style={{
              width: '90%',
              marginVertical: 10,
              borderRadius: 10,
              height: 42,
            }}
            onPress={() => {
              if (login === '' || password === '') {
                showToast(
                  'error',
                  'Bildirishnoma',
                  'Login va parol kiritish shart!',
                );
              } else {
                loginHandler(login, password);
              }
            }}>
            {loading ? (
              <ActivityIndicator color={color.white} />
            ) : (
              <Text
                style={{color: color.white, fontFamily: fonts.ManropeMedium}}>
                Kirish
              </Text>
            )}
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Auth;
