import { useRef, useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';
import { minutesToMillis, formatTime } from '../utils/helpers';

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: spacing.md,
  },
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
  },
});

const Countdown = ({ minutes = 0.25, isPaused, onProgress, onEnd }) => {
  const interval = useRef(null);
  const timeout = useRef(null);

  const [millis, setMillis] = useState(null);

  const reset = () => {
    timeout.current = setTimeout(
      () => setMillis(Number(minutesToMillis(minutes))),
      300
    );
  };

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd(reset);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    setMillis(Number(minutesToMillis(minutes)));
  }, [minutes]);

  useEffect(() => {
    onProgress(millis / Number(minutesToMillis(minutes)));
  }, [millis]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(countDown, 1000);

    return () => {
      clearInterval(interval.current);
      clearTimeout(timeout.current);
    };
  }, [isPaused]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {formatTime(minute)}:{formatTime(seconds)}
      </Text>
    </View>
  );
};

export default Countdown;
