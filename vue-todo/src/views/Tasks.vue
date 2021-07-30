<template>
  <div class="tasks">
    <div class="new-task">
      <label for="task-input">New Task:</label>
      <input
        type="text"
        id="task-input"
        v-bind:value="taskInput"
        v-on:input="setTaskInput"
      />
      <button @click="addTask">Add Todo</button>
    </div>
    <ul class="task-list" v-if="tasks.length > 0">
      <li class="task-list__item" v-for="(task, index) in tasks" :key="index">
        <span>{{ task.title }}</span>
        ---
        <span
          :class="'state-tag state-tag--' + task.state"
          @click="() => updateTask(index, task)"
        >
          {{ formatState(task.state) }}
        </span>
      </li>
    </ul>
    <div v-else>No tasks, go ahead and add some</div>
  </div>
</template>

<script>
export default {
  name: "Tasks",
  methods: {
    setTaskInput({ target }) {
      this.$store.dispatch("setTaskInput", target.value);
    },
    addTask() {
      this.$store.dispatch("addTask");
      this.$store.dispatch("clearTaskInput");
    },
    updateTask(index, task) {
      this.$store.dispatch("updateTask", {
        index,
        task: {
          title: task.title,
          state:
            task.state === "unassigned"
              ? "in_progress"
              : task.state === "in_progress"
              ? "completed"
              : "unassigned",
        },
      });
    },
    formatState(state) {
      switch (state) {
        case "unassigned":
          return "Unassigned";
        case "in_progress":
          return "In Progress";
        case "completed":
          return "Completed";
      }
    },
  },
  computed: {
    taskInput() {
      return this.$store.state.taskInput;
    },
    tasks() {
      console.log(this.$store.state.tasks);
      return this.$store.state.tasks;
    },
  },
  // methods: {
  //   onChange: function ({ target }) {
  //     store.todoInput = target.value;
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.tasks {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
}

.new-task {
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  label {
    margin-right: 8px;
  }

  input {
    flex: 1;
    margin-right: 8px;
  }
}

.task-list {
  width: 500px;
  list-style: none;
  padding: 0;

  .task-list__item {
    padding: 16px;
    &:not(:last-of-type) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }

    .state-tag {
      border-radius: 50px;
      padding: 4px 8px;
      color: #fff;
      cursor: pointer;

      &--unassigned {
        background-color: #f59e0b;
      }

      &--in_progress {
        background-color: #3b82f6;
      }

      &--completed {
        background-color: #10b981;
      }
    }
  }
}
</style>