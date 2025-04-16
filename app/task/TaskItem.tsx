import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Check, X, Edit2 } from 'lucide-react-native';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onToggle, onEdit }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => onToggle(task.id)}
      >
        {task.completed ? (
          <View style={styles.checked}>
            <Check size={16} color="#fff" />
          </View>
        ) : (
          <View style={styles.unchecked} />
        )}
      </TouchableOpacity>
      <Text
        style={[
          styles.title,
          task.completed && styles.completedTitle,
        ]}
      >
        {task.title}
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onEdit(task)}
        >
          <Edit2 size={20} color="#4f80c6" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onDelete(task.id)}
        >
          <X size={20} color="#ff4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  checkbox: {
    marginRight: 12,
  },
  checked: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4f80c6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unchecked: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4f80c6',
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: '#1D1D1D',
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#A1A1A1',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
});

export default TaskItem;
