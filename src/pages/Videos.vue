<template>
  <q-page class="bg-dark ">
    <div class="effect"></div>
      <div class="row justify-center text-white q-pa-md">
        <div class="col-12 col-md-10 col-xl-6 row q-col-gutter-md">
        <div class="col-12 col-md-8 row">
          <div class="col-12 text-h6 text-weight-bolder text-orange">Aula {{ play.index }}</div>
          <div class="col-12">
            <q-carousel
              style="height:460px; width: 100%"
              animated
              v-model="slideVideo"
              infinite
            >
              <q-carousel-slide :name="list.id" :key="list.title" v-for="list in listPlay">
                <q-video
                  class="absolute-full"
                  :src="list.link"
                />
              </q-carousel-slide>
            </q-carousel>
          </div>
        </div>
        <div class="col-12 col-md-4 row">
          <div class="col-12 text-h6 text-weight-bolder text-orange">Módulo {{ nameModule(moduleActive) }}</div>
          <q-scroll-area
            class="col-12" style="height: 460px;"
            visible
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            ref="firstRef"
          >
            <div class="row q-col-gutter-y-md">
              <template v-for="list in listPlay">
                <div class="col-12" :key="list.title" v-if="(moduleActive == list.module)">
                  <q-card
                    dark
                    :bordered="watched.includes(list.index)"
                    class="col-12 bg-grey-10 cursor-pointer"
                    @click="play = list, slideVideo = list.id"
                  >
                    <q-card-section>
                      <div class="row">
                        <div class="col-12 text-h6 text-weight-bolder q-mb-sm">
                          <q-checkbox dark color="green" left-label v-model="watched" :val="list.index" checked-icon="verified" unchecked-icon="unpublished" @click="viewed()">
                            <q-tooltip :class="(watched.includes(list.index)) ? 'bg-green' : 'bg-grey-9'" transition-show="rotate" transition-hide="rotate" >
                              {{ (watched.includes(list.index)) ? 'Assistido' : 'Ainda não foi assistido' }}
                            </q-tooltip>
                          </q-checkbox>
                          {{ list.title }}
                        </div>

                        <div class="col-5 flex flex-center">
                          <q-icon name="play_circle" size="60px" :color="(play.title == list.title) ? 'orange' : (watched.includes(list.index)) ? 'green' : 'grey-9'" />
                        </div>

                        <div class="col-7">
                          <div class="row q-col-gutter-y-sm">
                            <div class="col-12" >{{ list.desc }}</div>
                          </div>
                        </div>
                      </div>
                    </q-card-section>
                    <q-tooltip v-if="!watched.includes(list.index)">
                      Clique para visualizar o {{ list.title }}
                    </q-tooltip>
                  </q-card>
                </div>
              </template>
            </div>
          </q-scroll-area>
        </div>
        <div class="col-12 text-h3 text-weight-bolder text-center q-my-xl q-py-lg" style="-webkit-text-stroke: 1px orange; color:transparent">TODOS OS MÓDULOS</div>
        <div class="col-12 col-md-4" :key="mod.id" v-for="mod in modules" @click="moduleActive = mod.id">
          <q-card clickable v-ripple class="cursor-pointer bg-dark row" flat dark :bordered="(moduleActive == mod.id)">
            <q-card-section class="col-12 row">
              <div class="col-12 text-h5 text-weight-bolder">{{ mod.title }}</div>
            </q-card-section>
            <q-card-section class="col-12">
              <q-list dark>
                <template v-for="list in listPlay">
                  <q-item :key="list.id" v-if="mod.id == list.module" @click="play = list">
                    <q-item-section>
                      <q-item-label>
                        {{ list.title }}
                        <q-icon name="play_circle" color="orange" size="20px" v-if="play.id === list.id">
                          <q-tooltip class="bg-orange">Assistindo agora</q-tooltip>
                        </q-icon>
                        </q-item-label>
                      <q-item-label caption lines="2">{{ list.desc }}</q-item-label>
                    </q-item-section>

                    <q-item-section side top>
                      <q-checkbox
                          @click="viewed()"
                          dark
                          color="green"
                          left-label
                          v-model="watched"
                          :val="list.index"
                          checked-icon="task_alt"
                          unchecked-icon="highlight_off"
                        >
                        <q-tooltip :class="(watched.includes(list.index)) ? 'bg-green' : 'bg-grey-9'" transition-show="rotate" transition-hide="rotate" > {{ (watched.includes(list.index)) ? 'Assistido' : 'Ainda não foi assistido' }} </q-tooltip>
                        </q-checkbox>
                    </q-item-section>
                  </q-item>
                </template>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="col-12" style="height: 150px"></div>
    </div>
    <!-- Dialog do player -->
    <q-dialog v-model="seamless" seamless position="bottom">
      <q-card class="bg-dark text-white" style="width: 450px">
        <q-select
          filled
          transition-show="jump-up"
          transition-hide="jump-up"
          @filter="filterFn"
          v-model="search"
          :options="filterOptions"
          option-value="id"
          option-label="title"
          emit-value
          map-options
          dark
          dense
          label="Pesquisar vídeos"
          color="orange"
          input-debounce="0"
          use-input
          clearable
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
          <template v-slot:after>
            <q-btn round dense flat icon="send" @click="searchVideo()" />
          </template>
        </q-select>
        <q-card-section class="row items-center no-wrap">
          <div>
             <q-knob
              readonly
              v-model="valueKnob"
              show-value
              size="50px"
              :thickness="0.22"
              color="orange"
              track-color="orange-3"
              class="text-white"
              :min="0"
              :max="18"
            />
          </div>

          <q-space />

          <div class="q-px-md">
            <div class="text-weight-bold">{{ (play.title) ? play.title : 'Sobre o curso' }}</div>
            <div class="text-grey">{{ play.desc }}</div>
          </div>

          <q-space />

          <q-btn flat round icon="fast_rewind" @click="control('return')" :disabled="!play || play.index < 2" />
          <q-btn flat round icon="fast_forward" @click="control('next')" :disabled="!play || play.index > 8"/>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-ajax-bar ref="bar" position="top" color="orange" size="5px" skip-hijack />
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { LocalStorage } from 'quasar'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'PageVideo',
  setup () {
    // setando variaveis
    const $store = useStore()
    const listPlay = $store.state.videosGoogle.listPlay
    const modules = $store.state.videosGoogle.modules
    const width = ref(null)
    const watched = ref([])
    const play = ref([])
    const slideVideo = ref('y6C2w7qOlh8')
    const moduleActive = ref(1)
    const firstRef = ref(null)
    const secondRef = ref(null)
    const valueKnob = ref(0)
    const bar = ref(null)
    const search = ref(null)
    const filterOptions = ref(listPlay)

    // executa ao carregar a pagina pela primeira vez
    onMounted(() => {
      trigger()
      play.value = listPlay.find(v => v.index === 1)
      watched.value = (LocalStorage.getItem('watched')) ? LocalStorage.getItem('watched') : []
      valueKnob.value = (watched.value.length > 0) ? watched.value.length : 0
    })

    // retorna o nome do móodulo
    const nameModule = (id) => {
      return modules.find(v => v.id === id).title
    }

    // pesquisa e retona o vídeo pelo campo de pesquisa
    const searchVideo = () => {
      play.value = listPlay.find(v => v.id === search.value)
      if (play.value.module) moduleActive.value = play.value.module
      if (play.value.id) slideVideo.value = play.value.id
      search.value = null
    }

    // controle do player
    const control = (type) => {
      if (play.value && type === 'return') play.value = listPlay.find(v => v.index === (play.value.index - 1)) // anterior
      if (play.value && type === 'next') play.value = listPlay.find(v => v.index === (play.value.index + 1)) // proximo
      if (!play.value) play.value = listPlay.find(v => v.index === 1) // caso não tiver retorna o primeiro vídeo

      // alterando o módulo ativo
      if (play.value.module) moduleActive.value = play.value.module
      if (play.value.id) slideVideo.value = play.value.id
    }

    // retorna todos os vídeos visto salvos localmente
    const viewed = () => {
      LocalStorage.set('watched', watched.value)
      valueKnob.value = watched.value.length
    }

    // barra de carregamento inicial (nesse caso está estático)
    function trigger () {
      const barRef = bar.value
      barRef.start()

      setTimeout(() => {
        const barRef = bar.value
        if (barRef) {
          barRef.stop()
        }
      }, Math.random() * 2000 + 1000)
    }

    return {
      // retornando variaveis ao template
      filterOptions,
      searchVideo,
      search,
      viewed,
      listPlay,
      modules,
      nameModule,
      bar,
      trigger,
      seamless: ref(true),
      moduleActive,
      slideVideo,
      control,
      play,
      watched,
      left2: true,
      width,
      valueKnob,

      // barra de pesquisa
      firstRef,
      secondRef,
      thumbStyle: {
        right: '4px',
        borderRadius: '7px',
        backgroundColor: '#e69232',
        width: '4px',
        opacity: 0.75
      },
      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#e69232',
        width: '8px',
        opacity: 0.2
      },
      // filtro do campo de pesquisa
      filterFn (val, update, abort) {
        update(() => {
          const needle = val.toLowerCase()
          filterOptions.value = listPlay.filter(v => v.title.toLowerCase().indexOf(needle) > -1)
        })
      }
    }
  }
})
</script>
