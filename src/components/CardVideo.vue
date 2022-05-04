<template>
   <q-card flat bordered dark class="col-12 bg-dark q-py-sm">
      <q-card-section horizontal clickable v-ripple class="cursor-pointer">
        <q-card-section class="col-5 flex flex-center">
          <q-icon name="play_circle" size="80px" color="grey-9" />
        </q-card-section>

        {{ watched }}

        <q-card-section>
          <div class="row q-col-gutter-y-sm">
            <div class="col-12 text-h5 text-weight-bolder">
              <q-checkbox
                color="orange"
                left-label
                v-model="watched"
                :val="title"
                checked-icon="task_alt"
                unchecked-icon="highlight_off"
              >
              <q-tooltip class="bg-orange" transition-show="rotate" transition-hide="rotate" > Assitido </q-tooltip>
              </q-checkbox>
              {{ title }}

              </div>
            <div class="col-12" >{{ desc }}</div>
            <div class="col-12">
              <q-rating
                v-model="ratingModel"
                :max="4"
                size="2em"
                color="green"
                :icon="icons"
              />
            </div>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    photo: {
      type: String,
      default: ''
    },

    desc: {
      type: String,
      default: '#'
    }
  },
  setup () {
    const watched = ref([])

    return {
      watched,
      left2: true,
      ratingModel: ref(3),

      icons: [
        'sentiment_very_dissatisfied',
        'sentiment_dissatisfied',
        'sentiment_satisfied',
        'sentiment_very_satisfied'
      ]
    }
  }
})
</script>
