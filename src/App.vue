<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">

$scrollBar-track-color: rgb(235,235,235);
$scrollBar-thumb-color: rgb(210,210,210);
$scrollBar-thumb-hover-color: rgb(200,200,200);
$scrollBar-thumb-active-color: rgb(190,190,190);
#app {
  margin: 0;
}
body {
  margin: 0;
}

      ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}

::-webkit-scrollbar-track {
    background-color: $scrollBar-track-color;
}

::-webkit-scrollbar-thumb {
    background-color: $scrollBar-thumb-color;
    border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
    background-color: $scrollBar-thumb-hover-color;
}

::-webkit-scrollbar-thumb:active {
    background-color: $scrollBar-thumb-active-color;
}

</style>
