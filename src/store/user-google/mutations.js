import { LocalStorage } from 'quasar'

export function updateUser (state, val) {
  LocalStorage.set('user', val)
  state.user = val
}

export function clearUser (state) {
  LocalStorage.remove('user')
  LocalStorage.remove('watched')
  state.user = []
}
