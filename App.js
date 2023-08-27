import React, { useState } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Card, Button } from 'react-native-paper';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const createTask = () => {
    if (newTask.trim() === '') return;

    const task = { id: Date.now(), title: newTask, done: false, paused: false };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleTaskDone = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  };

  const toggleTaskPaused = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, paused: !task.paused } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <Card style={styles.taskCard}>
      <View style={styles.taskInfo}>
        <TouchableOpacity onPress={() => toggleTaskDone(item.id)}>
          <Text
            style={[
              styles.taskTitle,
              item.done && styles.doneTask,
              item.paused && styles.pausedTask,
            ]}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
        <View style={styles.buttonGroup}>
          <Button mode="text" onPress={() => toggleTaskPaused(item.id)}>
            {item.paused ? 'Resume' : 'Pause'}
          </Button>
          <Button mode="text" onPress={() => deleteTask(item.id)}>
            Delete
          </Button>
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>To-Do App</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search tasks..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter a new task..."
        value={newTask}
        onChangeText={(text) => setNewTask(text)}
        onSubmitEditing={createTask}
      />
      <Button
        mode="contained"
        style={styles.createTaskButton} // Add this line to apply custom styling
        onPress={createTask}
      >
      Create Task
      </Button>
      <FlatList
        data={filteredTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  createTaskButton: {
    backgroundColor: 'purple', // Change the background color
    marginTop: 10, // Add some top margin
    paddingVertical: 10, // Adjust vertical padding
    paddingHorizontal: 10, // Adjust horizontal padding
    borderRadius: 10, // Add some border radius
    fontWeight: 'bold',
    margin: 10,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F4F4F4',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
    height:50,
    fontSize: 25,
    marginTop: 10,
    margin: 10,
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 8,
    width: '40%', // Adjust the width as needed
    borderRadius: 8,
    fontSize: 18,
  },
  taskCard: {
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  taskInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 16,
  },
  doneTask: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  pausedTask: {
    color: 'orange',
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
