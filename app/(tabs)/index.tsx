import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { ja } from 'date-fns/locale';

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const getDaysInMonth = useCallback((date: Date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    return eachDayOfInterval({ start, end });
  }, []);

  const days = getDaysInMonth(selectedDate);
  const currentMonth = format(selectedDate, 'yyyy年 M月', { locale: ja });

  const previousMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={previousMonth}>
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.monthText}>{currentMonth}</Text>
        <TouchableOpacity onPress={nextMonth}>
          <Ionicons name="chevron-forward" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.weekDays}>
        {['日', '月', '火', '水', '木', '金', '土'].map((day) => (
          <Text key={day} style={[styles.weekDayText, day === '日' && styles.sundayText]}>
            {day}
          </Text>
        ))}
      </View>

      <ScrollView>
        <View style={styles.calendar}>
          {days.map((date) => {
            const isCurrentMonth = isSameMonth(date, selectedDate);
            const isCurrentDay = isToday(date);

            return (
              <TouchableOpacity
                key={date.toISOString()}
                style={[
                  styles.day,
                  isCurrentDay && styles.today,
                ]}
                onPress={() => console.log(date)}>
                <Text
                  style={[
                    styles.dayText,
                    !isCurrentMonth && styles.otherMonthText,
                    isCurrentDay && styles.todayText,
                    date.getDay() === 0 && styles.sundayText,
                  ]}>
                  {format(date, 'd')}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  monthText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  weekDays: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    color: '#000000',
    fontWeight: '500',
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  day: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontSize: 16,
    color: '#000000',
  },
  otherMonthText: {
    color: '#c7c7cc',
  },
  today: {
    backgroundColor: '#007AFF20',
    borderRadius: 8,
  },
  todayText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  sundayText: {
    color: '#FF3B30',
  },
});