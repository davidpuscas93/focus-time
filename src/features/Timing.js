import { View, StyleSheet } from 'react-native';

import RoundedButton from '../components/RoundedButton';

const styles = StyleSheet.create({
  buttonWrapper: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const Timing = ({ onChangeTime }) => {
  return (
    <View style={styles.buttonWrapper}>
      <RoundedButton size={75} title="10" onPress={() => onChangeTime(10)} />
      <RoundedButton size={75} title="15" onPress={() => onChangeTime(15)} />
      <RoundedButton size={75} title="20" onPress={() => onChangeTime(20)} />
    </View>
  );
};

export default Timing;
