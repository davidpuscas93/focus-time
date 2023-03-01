import { View, Text, FlatList, StyleSheet } from 'react-native';

import { colors } from '../utils/colors';
import { spacing, fontSizes } from '../utils/sizes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: spacing.md,
    marginLeft: spacing.lg,
    marginRight: spacing.lg,
  },
  title: {
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
    color: colors.lightBlue,
    marginBottom: spacing.sm,
  },
  itemWrapper: {
    backgroundColor: colors.lightBlue,
    borderRadius: spacing.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  item: {
    fontSize: fontSizes.lg,
    fontStyle: 'italic',
    color: colors.white,
    marginRight: spacing.md,
  },
});

const History = ({ history }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Focus History</Text>
      {history.length ? (
        <FlatList
          data={history}
          renderItem={({ item, index }) => (
            <View style={styles.itemWrapper} key={index}>
              <Text style={styles.item}>{index + 1}.</Text>
              <Text style={styles.item}>{item}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.item}>Nothing to display yet...</Text>
      )}
    </View>
  );
};

export default History;
