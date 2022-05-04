<template>
  <q-page class="bg-white">
    <div class="row justify-center">
      <div class="col-12 col-md-10 col-xl-6 row justify-between q-px-md">
        <div class="col-12 col-md-4 flex flex-center">
          <div class="q-gutter-y-md">
            <div> <q-img src="~assets/images/logo_full_hori_black.png" style="width:100%" /> </div>
            <div class="text-h4 text-weight-bolder">Seja o(a) Novo(a) Creator Famoso!</div>
            <div class="text-h6 text-weight-light">Aprenda sobre Gestão Mercadológica para sua marca pessoal de Influencer</div>
            <div><q-btn color="orange-8" unelevated label="Vou ser influencer" to="/videos" /></div>
          </div>
        </div>
        <div class="col-12 col-md-6 text-center mobile-hide">
          <q-img src="~assets/images/social-media-5.png" style="width:100%" />
        </div>
      </div>
      <div class="row col-12">
        <div class="col-12 col-md-8 text-center">
          <q-img src="~assets/images/social-media-2.jpg" style="width:100%" />
        </div>
        <div class="col-12 col-md-4 flex flex-center bg-dark q-pb-md">
          <div class="row q-col-gutter-md text-center">
            <div class="col-12 flex flex-center">
              <q-tree
                  :nodes="simple"
                  node-key="label"
                  v-model:expanded="expanded"
                  accordion
                  dark
              />
              </div>
            <div class="col-12"><q-btn color="red-5" unelevated label="Começar a aprender" to="/videos" /></div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PageIndex',
  setup () {
    return {
      step: ref(1),
      expanded: ref(['Sobre o curso', 'O que você aprenderá']),
      simple: [
        {
          label: 'Sobre o curso',
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          children: [
            {
              label: 'O que você aprenderá',
              icon: 'restaurant_menu',
              children: [
                { label: 'Ser um digital influencer do futuro' },
                { label: 'Investir em uma profissão rentável' },
                { label: 'O que seus seguidores buscam' },
                { label: 'Soluções aos seus parceiros' },
                { label: 'Marketing no digital' }
              ]
            },
            {
              label: 'Requisitos recomendados',
              icon: 'room_service',
              children: [
                { label: 'Sobre negociações digitais' },
                { label: 'Básico em ferramentas digitais' },
                { label: 'Básico em redes sociais' }
              ]
            }
          ]
        }
      ]
    }
  }
})
</script>
