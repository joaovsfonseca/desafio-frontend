import { boot } from 'quasar/wrappers'
import GAuth from 'vue3-google-oauth2'

const gAuthOptions = { clientId: '953719664469-5hcc5qrnnkcepep37o2om1p3g5sn45ha.apps.googleusercontent.com', scope: 'email', prompt: 'consent', fetch_basic_profile: false }
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ app }) => {
  app.use(GAuth, gAuthOptions)
})
