<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <EvolutionaryChain/>
  </div>
</template>

<script>
import EvolutionaryChain from './components/EvolutionaryChain/EvolutionaryChain.vue'

export default {
  name: 'App',
  components: {
    EvolutionaryChain
  }
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
