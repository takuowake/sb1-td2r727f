import { View, Text, StyleSheet, FlatList } from 'react-native';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

const mockSchedules = [
  {
    id: '1',
    title: 'ミーティング',
    date: new Date(2024, 2, 15, 10, 0),
    duration: 60,
  },
  {
    id: '2',
    title: '歯医者',
    date: new Date(2024, 2, 16, 14, 30),
    duration: 45,
  },
];

export default function ScheduleScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.scheduleItem}>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>
          {format(item.date, 'H:mm', { locale: ja })}
        </Text>
        <Text style={styles.duration}>{item.duration}分</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>
          {format(item.date, 'M月d日(E)', { locale: ja })}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockSchedules}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  listContent: {
    padding: 16,
  },
  scheduleItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timeContainer: {
    marginRight: 16,
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  duration: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#8E8E93',
  },
});