import { useState } from 'react';
import { StyleSheet, Platform, SafeAreaView, StatusBar } from 'react-native';

import Focus from './src/features/Focus';
import History from './src/features/History';
import Timer from './src/features/Timer';

import { colors } from './src/utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: colors.darkBlue,
  },
});

export default function App() {
  const [currentSubject, setCurrentSubject] = useState('null');
  const [history, setHistory] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      {!currentSubject ? (
        <>
          <Focus addSubject={setCurrentSubject} />
          <History history={history} />
        </>
      ) : (
        <Timer
          focusSubject={currentSubject}
          onTimerEnd={(subject) => {
            setHistory([...history, subject]);
          }}
          clearSubject={() => setCurrentSubject(null)}
        />
      )}
    </SafeAreaView>
  );
}
