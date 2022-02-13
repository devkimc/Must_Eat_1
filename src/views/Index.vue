<template>
  <div id="app">
    <b-card
      overlay
      :img-src="TopImg"
      img-alt="Card Image"
      text-variant="white"
      title="Must-Eat Restaurant"
      sub-title="맛집"
    >
      <b-card-text>
        소중한 사람과 가고 싶은 식당이 있나요?
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import convoInRest from '@/assets/img/conversation_in_rest.jpg'

export default {
  name: 'Index',
  data () {
    return {
      TopImg: convoInRest
    }
  }
}
</script>

<style>

</style>
