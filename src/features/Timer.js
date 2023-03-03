import { useState } from 'react';

import { View, Text, StyleSheet, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import { useKeepAwake } from 'expo-keep-awake';

import { colors } from '../utils/colors';
import { spacing, fontSizes } from '../utils/sizes';

import Timing from './Timing';

import RoundedButton from '../components/RoundedButton';
import Countdown from '../components/Countdown';

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: spacing.lg,
    marginRight: spacing.lg,
  },
  countdownWrapper: {
    flex: 0.5,
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoWrapper: {
    marginTop: spacing.lg,
  },
  title: {
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.white,
  },
  task: {
    fontSize: fontSizes.lg,
    fontStyle: 'italic',
    textAlign: 'center',
    color: colors.white,
  },
  progressWrapper: {
    marginTop: spacing.sm,
  },
  progressBar: {
    backgroundColor: colors.white,
    height: spacing.sm,
    borderRadius: spacing.md,
  },
  timingWrapper: {
    flex: 0.2,
    padding: spacing.md,
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clearWrapper: {
    flex: 0.1,
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.25);

  useKeepAwake();

  const onProgress = (progress) => {
    setProgress(progress);
    if (!isStarted) {
      setMinutes(progress);
    }
  };

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    onTimerEnd(focusSubject);
    reset();
  };

  const decrement = () => {
    let newMinutes = 0;
    if (minutes > 0.25) {
      newMinutes = Math.max(0.25, Number(minutes) - 0.25);
    } else {
      newMinutes = Math.max(0.05, Number(minutes) - 0.05);
    }
    setMinutes(newMinutes);
  };

  const increment = () => {
    let newMinutes = 0;
    if (minutes >= 0.25) {
      newMinutes = Math.max(0.25, Number(minutes) + 0.25);
    } else {
      newMinutes = Math.max(0.05, Number(minutes) + 0.05);
    }
    setMinutes(newMinutes);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdownWrapper}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
        <View style={styles.infoWrapper}>
          <Text style={styles.title}>Focus:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View style={styles.progressWrapper}>
        <ProgressBar
          color={colors.lightBlue}
          progress={progress}
          style={styles.progressBar}
        />
      </View>
      <View style={styles.timingWrapper}>
        <Timing
          onChangeTime={(newMinutes) =>
            setMinutes((prevMinutes) => prevMinutes + newMinutes)
          }
        />
      </View>
      <View style={styles.buttonWrapper}>
        <RoundedButton title='-' size={50} onPress={decrement} />
        <RoundedButton
          title={isStarted ? 'pause' : 'start'}
          textStyle={{ fontSize: fontSizes.xl }}
          onPress={() => setIsStarted(!isStarted)}
        />
        <RoundedButton title='+' size={50} onPress={increment} />
      </View>
      <View style={styles.clearWrapper}>
        <RoundedButton
          size={50}
          title='clear'
          textStyle={{ fontSize: fontSizes.sm }}
          onPress={clearSubject}
        />
      </View>
    </View>
  );
};

export default Timer;
