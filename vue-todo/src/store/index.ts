import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

type TaskState = "unassigned" | "in_progress" | "completed";
interface Task {
  title: string;
  state: TaskState;
}

interface Store {
  taskInput: string;
  tasks: Task[];
}

export default new Vuex.Store<Store>({
  state: {
    taskInput: "",
    tasks: []
  },
  mutations: {
    SET_TASK_INPUT(state, value) {
      state.taskInput = value;
    },
    CLEAR_TASK_INPUT(state) {
      state.taskInput = ""
    },
    ADD_TASK(state) {
      state.tasks.push({
        title: state.taskInput,
        state: "unassigned"
      });
    },
    UPDATE_TASK(state, { index, task }: { index: number; task: Task; }) {
      state.tasks[index] = {
        title: task.title,
        state: task.state
      }
      state.tasks = [...state.tasks]
    }
  },
  actions: {
    setTaskInput({ commit }, value) {
      commit("SET_TASK_INPUT", value);
    },
    clearTaskInput({ commit }) {
      commit("CLEAR_TASK_INPUT")
    },
    addTask({ commit }) {
      commit('ADD_TASK');
    },
    updateTask({ commit }, value) {
      commit("UPDATE_TASK", value)
    }
  },
  modules: {},
});
