<template>
  <div>
    <h3>Identicon Generator</h3>

    <div>
      <label for="content-input">Input</label>
      <input
        type="text"
        id="content-input"
        v-on:input="onInput"
        v-bind:value="input"
      />
    </div>

    <div>
      <span>Output:</span>
      <div v-html="identicon" />
    </div>
  </div>
</template>

<script>
import { toSvg } from "jdenticon";

export default {
  name: "App",
  data: function () {
    return {
      input: "val",
    };
  },
  computed: {
    identicon: function () {
      return toSvg(this.input, 200);
    },
  },
  methods: {
    onInput: function ({ target }) {
      this.input = target.value;
    },
  },
};
</script>
