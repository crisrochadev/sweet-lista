import { boot } from 'quasar/wrappers'
import Localbase from 'localbase';


const db = new Localbase('sweetlist');
export default boot(async ({app}) => {
  app.config.globalProperties.$db = db
})

export {db}
