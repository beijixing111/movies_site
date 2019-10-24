<template>
  <div id="app"> 
    <router-view/> 
  </div>
</template>

<script> 
  export default {
    name: 'Mimyz',
    mounted() {
    	document.getElementById('loading').style.display = 'none';
    }
  }
</script>
 

