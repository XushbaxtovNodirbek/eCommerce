import color from 'assets/styles/color';
import fonts from 'assets/styles/fonts';
import globalStyles from 'assets/styles/globalStyles';
import {TextInput} from 'components';
import logger from 'helpers/logger';
import React, {useCallback, useMemo} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  SectionList,
  Linking,
} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const CustomerInfo = ({route}: any) => {
  const customer = route.params;
  const [dolg, setDolg] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [isDebt, setIsDebt] = React.useState(true);
  const [isCash, setIsCash] = React.useState(true);
  const [paymentType, setPaymentType] = React.useState<'cash' | 'card' | 'mix'>(
    'cash',
  );
  const [index, setIndex] = React.useState(0);
  const [showBalance, setShowBalance] = React.useState(false);
  const [routes] = React.useState([
    {key: 'first', title: 'Qarzlar'},
    {key: 'second', title: 'Tolovlar'},
  ]);

  const FirstRoute = useCallback(
    () => (
      <SectionList
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{paddingBottom: 20, gap: 10}}
        sections={[
          {title: '13.09.2024', data: [1, 2, 3, 4, 5]},
          {title: '14.09.2024', data: [1, 2, 3, 4, 5]},
        ]}
        renderItem={() => (
          <View
            style={{
              width: '100%',
              height: 70,
              backgroundColor: color.lgray,
              borderRadius: 14,
            }}
          />
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={[styles.text, {fontSize: 16, color: color.gray}]}>
            {title}
          </Text>
        )}
      />
    ),
    [],
  );

  const SecondRoute = () => (
    <SectionList
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{paddingBottom: 20, gap: 10}}
      sections={[
        {title: '13.09.2024', data: [1, 2, 3, 4, 5]},
        {title: '14.09.2024', data: [1, 2, 3, 4, 5]},
      ]}
      renderItem={() => (
        <View
          style={{
            width: '100%',
            height: 70,
            backgroundColor: color.lgray,
            borderRadius: 14,
          }}
        />
      )}
      renderSectionHeader={({section: {title}}) => (
        <Text style={[styles.text, {fontSize: 16, color: color.gray}]}>
          {title}
        </Text>
      )}
    />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const animatedValue = useSharedValue(20);

  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedValue.value,
  }));

  const toggleHeight = useCallback(() => {
    animatedValue.value = withTiming(showBalance ? 20 : 65);
  }, [showBalance]);

  return (
    <View style={globalStyles.center}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: 10,
        }}>
        <View style={styles.header}>
          <Avatar.Text size={80} label={customer?.full_name[0]} />
          <View>
            <Text style={[styles.text, {fontWeight: '700'}]}>
              {customer?.full_name}
            </Text>
            <Text
              onPress={() => {
                Linking.openURL(`tel:${customer.phone_number}`);
              }}
              style={[styles.text, {fontSize: 15, color: color.darkBlue}]}>
              +998{customer?.phone_number}
            </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                toggleHeight();
                setShowBalance(!showBalance);
              }}>
              <Animated.View style={[animatedStyle, {overflow: 'hidden'}]}>
                <Text style={[styles.text, {fontSize: 15}]}>
                  Balans: {customer?.balance?.balance} so'm{' '}
                  <Text
                    style={[
                      styles.text,
                      {fontSize: 13, color: color.darkBlue},
                    ]}>
                    {showBalance ? 'Yashirish' : 'Batafsil'}
                  </Text>
                </Text>
                <Text style={[styles.text, {fontSize: 15}]}>
                  Qarz: {customer?.balance?.debit} so'm{' '}
                </Text>
                <Text style={[styles.text, {fontSize: 15}]}>
                  Haqdorlik: {customer?.balance?.credit} so'm{' '}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>
        <TextInput
          value={dolg}
          setValue={setDolg}
          placeholder={'Qarz qoshish/ayirish summasi...'}
          width={Dimensions.get('window').width - 20}
          isNumber
        />
        <TextInput
          isTextArea
          value={comment}
          setValue={setComment}
          placeholder={'Izoh qoldirish...'}
          width={Dimensions.get('window').width - 20}
        />

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            padding: 5,
          }}>
          <TouchableOpacity
            onPress={() => setIsDebt(false)}
            style={[
              styles.row,
              {width: '35%', padding: 0, justifyContent: 'flex-start', gap: 10},
            ]}>
            <View
              style={[
                styles.radio,
                !isDebt && {backgroundColor: color.darkBlue},
              ]}
            />
            <Text style={[styles.text, {color: color.alizarin}]}>
              Qarz qo'shish
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsDebt(true)}
            style={[
              styles.row,
              {width: '35%', padding: 0, justifyContent: 'flex-start', gap: 10},
            ]}>
            <View
              style={[
                styles.radio,
                isDebt && {backgroundColor: color.darkBlue},
              ]}
            />
            <Text style={[styles.text, {color: color.brandColor}]}>
              Qarzni to'lash
            </Text>
          </TouchableOpacity>
        </View>
        {isDebt && (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 5,
            }}>
            <TouchableOpacity
              onPress={() => setPaymentType('cash')}
              style={[
                styles.row,
                {
                  width: '20%',
                  padding: 0,
                  justifyContent: 'flex-start',
                  gap: 10,
                },
              ]}>
              <View
                style={[
                  styles.radio,
                  paymentType === 'cash' && {backgroundColor: color.darkBlue},
                ]}
              />
              <Text style={[styles.text]}>Naqt</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPaymentType('card')}
              style={[
                styles.row,
                {
                  width: '20%',
                  padding: 0,
                  justifyContent: 'flex-start',
                  gap: 10,
                },
              ]}>
              <View
                style={[
                  styles.radio,
                  paymentType === 'card' && {backgroundColor: color.darkBlue},
                ]}
              />
              <Text style={[styles.text]}>Karta</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPaymentType('mix')}
              style={[
                styles.row,
                {
                  width: '25%',
                  padding: 0,
                  justifyContent: 'flex-start',
                  gap: 10,
                },
              ]}>
              <View
                style={[
                  styles.radio,
                  paymentType === 'mix' && {backgroundColor: color.darkBlue},
                ]}
              />
              <Text style={[styles.text]}>Karta orqali</Text>
            </TouchableOpacity>
          </View>
        )}
        <Button
          mode="contained"
          textColor="white"
          style={{
            width: '95%',
            marginVertical: 10,
            borderRadius: 10,
            backgroundColor: color.brandColor,
          }}
          onPress={() => logger('Qarz qo`shish')}>
          {isDebt ? 'Qarzni to`lash' : 'Qarz qo`shish'}
        </Button>
        <View style={styles.history}>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width}}
            renderTabBar={props => (
              <TabBar
                {...props}
                indicatorStyle={{
                  backgroundColor: color.brandColor,
                  height: 48,
                  borderRadius: 10,
                  zIndex: -1,
                }}
                style={{
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  elevation: 0,
                  borderRadius: 10,
                }}
                renderLabel={({route, focused}) => (
                  <Text
                    style={[
                      styles.text,
                      {color: focused ? color.white : color.gray},
                    ]}>
                    {route.title}
                  </Text>
                )}
              />
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  history: {
    width: width,
    height: height * 0.9,
    padding: 10,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  radio: {
    height: 12,
    width: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: color.darkBlue,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    fontSize: 16,
    color: color.textColor,
    fontFamily: fonts.ManropeMedium,
  },
});

export default CustomerInfo;
