import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

import RoundedButton from '../components/RoundedButton';

import { spacing, fontSizes } from '../utils/sizes';

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    marginLeft: spacing.lg,
    marginRight: spacing.lg,
  },
  inputWrapper: {
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    marginRight: spacing.md,
    fontSize: fontSizes.sm + 2,
    height: 65,
  },
  buttonWrapper: {
    justifyContent: 'center',
  },
});

const Focus = ({ addSubject }) => {
  const [focusText, setFocusText] = useState(null);

  const handleAddSubject = () => {
    addSubject(focusText);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          outlineStyle={{ borderRadius: spacing.md }}
          placeholder="What would you like to focus on?"
          value={focusText}
          mode="outlined"
          onChangeText={setFocusText}
        />
        <View style={styles.buttonWrapper}>
          <RoundedButton
            title="+"
            size={50}
            onPress={handleAddSubject}
          />
        </View>
      </View>
    </View>
  );
};

export default Focus;
