import { call, put, takeEvery } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/Task';
import { router } from 'expo-router';
import {
  setTasks,
  addTask,
  toggleTask,
  deleteTask,
  updateTask,
  setLoading,
  setError,
  clearTasks,
  logout,
} from '../slices/taskSlice';

function* fetchTasksSaga(): Generator<any, void, any> {
  try {
    yield put(setLoading(true));
    const storedTasks: string | null = yield call(AsyncStorage.getItem, 'tasks');
    if (storedTasks) {
      const tasks: Task[] = JSON.parse(storedTasks);
      yield put(setTasks(tasks));
    }
  } catch (error) {
    yield put(setError('Failed to fetch tasks'));
  } finally {
    yield put(setLoading(false));
  }
}

function* addTaskSaga(action: { type: string; payload: Task }): Generator<any, void, any> {
  try {
    yield put(setLoading(true));
    const storedTasks: string | null = yield call(AsyncStorage.getItem, 'tasks');
    const tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];
    const updatedTasks = [...tasks, action.payload];
    yield call(AsyncStorage.setItem, 'tasks', JSON.stringify(updatedTasks));
    yield put(addTask(action.payload));
  } catch (error) {
    yield put(setError('Failed to add task'));
  } finally {
    yield put(setLoading(false));
  }
}

function* toggleTaskSaga(action: { type: string; payload: string }): Generator<any, void, any> {
  try {
    yield put(setLoading(true));
    const storedTasks: string | null = yield call(AsyncStorage.getItem, 'tasks');
    const tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];
    const updatedTasks = tasks.map(task =>
      task.id === action.payload
        ? { ...task, completed: !task.completed }
        : task
    );
    yield call(AsyncStorage.setItem, 'tasks', JSON.stringify(updatedTasks));
    yield put(toggleTask(action.payload));
  } catch (error) {
    yield put(setError('Failed to toggle task'));
  } finally {
    yield put(setLoading(false));
  }
}

function* deleteTaskSaga(action: { type: string; payload: string }): Generator<any, void, any> {
  try {
    yield put(setLoading(true));
    const storedTasks: string | null = yield call(AsyncStorage.getItem, 'tasks');
    const tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];
    const updatedTasks = tasks.filter(task => task.id !== action.payload);
    yield call(AsyncStorage.setItem, 'tasks', JSON.stringify(updatedTasks));
    yield put(deleteTask(action.payload));
  } catch (error) {
    yield put(setError('Failed to delete task'));
  } finally {
    yield put(setLoading(false));
  }
}

function* updateTaskSaga(action: { type: string; payload: { id: string; title: string } }): Generator<any, void, any> {
  try {
    yield put(setLoading(true));
    const storedTasks: string | null = yield call(AsyncStorage.getItem, 'tasks');
    const tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];
    const updatedTasks = tasks.map(task =>
      task.id === action.payload.id
        ? { ...task, title: action.payload.title }
        : task
    );
    yield call(AsyncStorage.setItem, 'tasks', JSON.stringify(updatedTasks));
    yield put(updateTask(action.payload));
  } catch (error) {
    yield put(setError('Failed to update task'));
  } finally {
    yield put(setLoading(false));
  }
}

function* clearTasksSaga(): Generator<any, void, any> {
  try {
    yield put(setLoading(true));
    yield call(AsyncStorage.removeItem, 'tasks');
    yield put(clearTasks());
  } catch (error) {
    yield put(setError('Failed to clear tasks'));
  } finally {
    yield put(setLoading(false));
  }
}

function* logoutSaga(): Generator<any, void, any> {
  try {
    yield put(setLoading(true));
    yield call(AsyncStorage.removeItem, 'user');
    yield call(AsyncStorage.removeItem, 'tasks');
    yield put(logout());
    yield call(router.replace, '/login');
  } catch (error) {
    yield put(setError('Failed to logout'));
  } finally {
    yield put(setLoading(false));
  }
}

export function* watchTaskSaga(): Generator<any, void, any> {
  yield takeEvery('FETCH_TASKS', fetchTasksSaga);
  yield takeEvery('ADD_TASK', addTaskSaga);
  yield takeEvery('TOGGLE_TASK', toggleTaskSaga);
  yield takeEvery('DELETE_TASK', deleteTaskSaga);
  yield takeEvery('UPDATE_TASK', updateTaskSaga);
  yield takeEvery('CLEAR_TASKS', clearTasksSaga);
  yield takeEvery('LOGOUT', logoutSaga);
} 