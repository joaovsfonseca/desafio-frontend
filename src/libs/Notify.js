import { useQuasar } from 'quasar'

export default {
  setup () {
    const $q = useQuasar()

    const notification = (typeMessage, message) => {
      setTimeout(() => {
        $q.notify({
          progress: true,
          message: message,
          type: typeMessage
        })
      }, 2000)
    }

    return {
      notification
    }
  }
}
