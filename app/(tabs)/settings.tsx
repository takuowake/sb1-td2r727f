import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const settingsOptions = [
  {
    id: 'notifications',
    title: '通知設定',
    icon: 'notifications-outline',
  },
  {
    id: 'appearance',
    title: '表示設定',
    icon: 'color-palette-outline',
  },
  {
    id: 'sync',
    title: '同期設定',
    icon: 'sync-outline',
  },
  {
    id: 'about',
    title: 'このアプリについて',
    icon: 'information-circle-outline',
  },
];

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      {settingsOptions.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={styles.option}
          onPress={() => console.log(option.id)}>
          <Ionicons name={option.icon} size={24} color="#007AFF" />
          <Text style={styles.optionText}>{option.title}</Text>
          <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  optionText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: '#000000',
  },
});