<template>
<div>
  <div class="d-flex flex-row">
    <span>
      <font-awesome-icon  :icon="iconName" />
    </span>
    <div class="d-flex ml-2 flex-row align-items-baseline flex-wrap">
      <p>{{titleName}}</p>
      <h6 class="ml-2">{{valueName}}</h6>
    </div>
  </div>
</div>
</template>

<script>
export default {
name: "CardInfo",
  props:{
  iconName:{
    type:String
  },
    titleName:{
    type: String
    },
    valueName:{
    type:[String, Number]
    }
  }
}
</script>

<style lang="scss">

</style>
