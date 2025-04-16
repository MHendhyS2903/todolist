import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LogOut } from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../src/store';
import TaskItem, { Task } from './TaskItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import WeatherWidget from '../src/components/WeatherWidget';

const TaskPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editedTitle, setEditedTitle] = useState('');

  const handleAddTask = useCallback(() => {
    if (!newTask.trim()) {
      Alert.alert('Error', 'Task cannot be empty!');
      return;
    }

    const task = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: 'ADD_TASK', payload: task });
    setNewTask('');
    Alert.alert('Success', 'Task added successfully!');
  }, [newTask, dispatch]);

  const handleToggleTask = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  }, [dispatch]);

  const handleDeleteTask = useCallback((id: string) => {
    const task = tasks.find(t => t.id === id);
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete the task "${task?.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch({ type: 'DELETE_TASK', payload: id });
            Alert.alert('Deleted', 'Task deleted successfully.');
          },
        },
      ]
    );
  }, [tasks, dispatch]);

  const handleEditTask = useCallback((task: Task) => {
    setEditingTask(task);
    setEditedTitle(task.title);
  }, []);

  const handleSaveEditedTask = useCallback(() => {
    if (!editedTitle.trim()) {
      Alert.alert('Error', 'Task title cannot be empty!');
      return;
    }

    if (editingTask) {
      dispatch({
        type: 'UPDATE_TASK',
        payload: { id: editingTask.id, title: editedTitle },
      });
      setEditingTask(null);
      setEditedTitle('');
      Alert.alert('Success', 'Task updated successfully!');
    }
  }, [editingTask, editedTitle, dispatch]);

  const handleLogout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
  }, [dispatch]);

  const activeTasks = tasks.filter(task => !task.completed).length;
  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#F0F4F8', '#D6E4ED']}
        style={styles.containerMain}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <WeatherWidget />
              <Text style={styles.infoText}>
                Active: {activeTasks} | Completed: {completedTasks}
              </Text>
            </View>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <LogOut color={'#1D1D1D'} size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Add a new task"
              value={newTask}
              onChangeText={setNewTask}
              style={styles.input}
              placeholderTextColor={'#A1A1A1'}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
              <Text style={styles.addButtonText}>Add Task</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TaskItem
                task={item}
                onDelete={handleDeleteTask}
                onToggle={handleToggleTask}
                onEdit={handleEditTask}
              />
            )}
            style={styles.taskList}
          />

          <Modal
            visible={editingTask !== null}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setEditingTask(null)}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <TextInput
                  style={styles.modalInput}
                  value={editedTitle}
                  onChangeText={setEditedTitle}
                  placeholder="Edit task title"
                  autoFocus
                />
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleSaveEditedTask}
                >
                  <Text style={styles.modalButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setEditingTask(null)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  containerMain: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
    marginRight: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  logoutButton: {
    padding: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addButton: {
    backgroundColor: '#4f80c6',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  taskList: {
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxWidth: 400,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: '#4f80c6',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  cancelButton: {
    backgroundColor: '#666',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TaskPage;
