import html from './core.js'
import {connect} from './store.js'

function Task({infos}) {
  let quantity = 0;
  infos.forEach((info) => {
    if (info.status != 'actived') {
      quantity++;
    }
  })
  return html`${quantity} tasks remaining`
}

export default connect((state) => {return {infos: state.infos}})(Task);