<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-dark" style="padding: 15px 10vw">
        <q-toolbar-title class="text-weight-bolder quantify mobile-hide text-title text-h5">
           <img src="~assets/images/icon.png" style="height: 20px" /> Influencers
        </q-toolbar-title>

        <q-space />

        <q-tabs no-caps dense narrow-indicator align="justify">
          <q-route-tab label="Início" to="/" />
          <q-route-tab label="Vídeos" to="/videos" />
        </q-tabs>
        <q-space />

        <div>
          <q-btn
            v-if="user.id == null"
            text-color="orange-8"
            no-caps
            icon="person"
            label="Acessar ou criar conta"
            @click='handleSignIn'
            flat
          />
          <q-btn-dropdown
            v-else
            no-caps
            color="orange-8"
            label="Sua conta"
          >
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">Dados</div>
                {{ user.id }} <br>
                {{ user.email }}
                {{ user.img }}
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="~assets/images/icon.png" />
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">{{ user.name }}</div>

                <q-btn
                  color="red"
                  label="Desconectar"
                  push
                  size="sm"
                  @click='handleSignOut'
                />
              </div>
            </div>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, inject } from 'vue'
import { LocalStorage } from 'quasar'

export default defineComponent({
  name: 'MainLayout',
  computed: {
    user () {
      return (this.$store.state.userGoogle.user) ? this.$store.state.userGoogle.user : null
    }
  },
  created () {
    this.initStart()
  },
  methods: {
    initStart () {
      const userVal = LocalStorage.getItem('user')
      if (userVal) this.$store.commit('userGoogle/updateUser', userVal)
    },
    async handleSignIn () {
      try {
        const googleUser = await this.$gAuth.signIn()
        // console.log(this.$gAuth.signIn)

        if (!googleUser) {
          return null
        } else {
          const user = {
            id: googleUser.getBasicProfile().getId(),
            email: googleUser.getBasicProfile().getEmail(),
            name: googleUser.getBasicProfile().getName(),
            img: googleUser.getBasicProfile().getImageUrl()
          }
          this.$store.commit('userGoogle/updateUser', user)
          this.$router.push('/videos')
        }
      } catch (error) {
        console.log(error)
        return null
      }
      console.log(this.$store.state.userGoogle.user)
    },
    async handleSignOut () {
      try {
        await this.$gAuth.signOut() // desloga
        this.$store.commit('userGoogle/clearUser') // limpa store
        this.$router.push('/')
      } catch (error) {
        console.log(error)
      }
    }
  },
  // retorna dados do Google+
  setup () {
    const Vue3GoogleOauth = inject('Vue3GoogleOauth')

    return {
      Vue3GoogleOauth
    }
  }
})
</script>
