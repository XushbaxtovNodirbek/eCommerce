import {api} from 'api';
import {ArrowDown, LogOutIcon} from 'assets/icons';
import color from 'assets/styles/color';
import fonts from 'assets/styles/fonts';
import globalStyles from 'assets/styles/globalStyles';
import {UnitModal} from 'components';
import {navigate} from 'navigators/NavigationService';
import React, {useCallback, useEffect, useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RefreshControl} from 'react-native-gesture-handler';
import {Avatar, Divider, List} from 'react-native-paper';
import useStore from 'store';

const Setting = () => {
  const [user, setUser] = React.useState<any>();
  const {setUserData} = useStore();
  const [units, setUnits] = React.useState<any>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const unitModalRef = useRef<any>(null);

  useEffect(() => {
    getMe();
    getUnits();
  }, []);

  const getUnits = useCallback(() => {
    api
      .get('/units')
      .then(data => {
        setUnits(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleLogout = () => {
    setUserData({auth_token: ''});
    navigate('Auth', {});
  };

  const getMe = useCallback(() => {
    setRefreshing(true);
    api
      .get('/users/get-me')
      .then(data => {
        setUser(data.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setRefreshing(false));
  }, []);

  const onRefresh = useCallback(() => {
    getMe();
    getUnits();
  }, []);

  return (
    <View style={globalStyles.center}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.container}>
        <View style={styles.profileTop}>
          <Avatar.Text size={72} label={user?.full_name[0]} />
          <View style={{width: '50%'}}>
            <Text style={styles.text}>{user?.username}</Text>
            <Text style={styles.text}>{user?.full_name}</Text>
          </View>
          <TouchableOpacity style={styles.exit} onPress={handleLogout}>
            <LogOutIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.acordionWrapper}>
            <TouchableOpacity
              style={{
                height: 48,
                justifyContent: 'center',
                backgroundColor: color.white,
                paddingHorizontal: 16,
              }}>
              <Text style={styles.text}>Profil</Text>
            </TouchableOpacity>
            <Divider />
            <List.Accordion
              style={{
                height: 48,
                justifyContent: 'center',
                backgroundColor: color.white,
              }}
              titleStyle={styles.text}
              right={props => <ArrowDown />}
              title="Birliklar">
              {units.map((item: any, index: number) => (
                <List.Item
                  key={index}
                  onPress={() => unitModalRef.current.open(item)}
                  titleStyle={styles.text2}
                  title={item.name}
                />
              ))}
              <List.Item
                onPress={() => unitModalRef.current.open()}
                titleStyle={styles.text2}
                title="Birlik qo'shish"
                right={() => <Avatar.Text size={25} label="+" />}
              />
            </List.Accordion>
          </View>
        </View>
      </ScrollView>
      <UnitModal getRef={ref => (unitModalRef.current = ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {width: '100%', paddingHorizontal: 16, paddingTop: 20},
  profileTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: color.textColor,
    fontFamily: fonts.ManropeSemiBold,
    fontSize: 18,
  },
  exit: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: color.brandColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: '100%',
    borderColor: color.brandColor,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    margin: 4,
  },
  wrapper: {
    width: '100%',
    marginTop: 20,
    backgroundColor: color.white,
    borderRadius: 10,
    padding: 8,
  },
  acordionWrapper: {
    width: '100%',
    backgroundColor: color.white,
    borderRadius: 24,
  },
  text2: {
    color: color.textColor,
    fontFamily: fonts.ManropeMedium,
    fontSize: 16,
  },
});

export default Setting;
