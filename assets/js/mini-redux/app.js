import html from './core.js'
import {connect} from './store.js'

function App({status, headings, infos}) {
  const newInfos = infos.filter((info) => {
    switch (status) {
      case 'active':
        return info.status === 'available'
      case 'completed':
        return info.status === 'actived'
      default:
        return true
    }
  })
  return html`
    ${headings.map((heading) => {
      if (!newInfos.some((info) => {
        return info['group-id'] == heading.id
      })) {
        return ''
      }
      return html`
        <div class="content__group">
          <div class="content__heading" data-index="${heading.id}">
            <span>${heading.content}</span>
            <input type="text" class="content__input">
            <div class="content__heading-edit">
              <i class="content__heading-icon fa-solid fa-pen"></i>
            </div>
          </div>
          <ul class="content__list">
            ${newInfos.map((info) => {
              if (info['group-id'] != heading.id) {
                return ''
              }
              return html`
                <li class="content__item ${info.status === 'actived' ? 'active' : ''}" data-index="${info.id}">
                  <div class="content__item-status">
                    <i class="content__item__icon fa-solid fa-check"></i>
                  </div>
                  <div class="content__info">${info.content}</div>
                  <div class="content__delete">
                    <i class="content__delete-icon fa-regular fa-trash-can"></i>
                  </div>
                </li>
              `
            })}
          </ul>
        </div>
      `
    })}
  `
} 

function selector(state) {
  return {
    status: state.config.status,
    headings: state.headings,
    infos: state.infos
  }
}

export default connect(selector)(App);