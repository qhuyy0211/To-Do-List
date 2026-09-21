import html from './core.js'
import {connect} from './store.js'

function Group({headings}) {
  return html`
    <form class="sub-create__list">
      ${headings.map((heading) => {
        return html`
          <label class="sub-create__item" data-index="${heading.id}">
            <input type="radio" name="group" id="sub-create__radio">
            <div class="sub-create__checkbox">
              <i class="sub-create__icon fa-solid fa-check"></i>
            </div>
            <span class="sub-create__text">${heading.content}</span>
          </label>
        `
      })}
      <label class="sub-create__item sub-create__item--new-group">
        <input type="radio" name="group" id="sub-create__radio">
        <div class="sub-create__checkbox">
          <i class="sub-create__icon fa-solid fa-check"></i>
        </div>
        <input type="text" class="sub-create__input" palceholder="New Group">
        <span class="sub-create__text active">New Group</span>
      </label>
    </form>
  `
}

function selector(state) {
  return {
    headings: [...state.headings]
  }
}

export default connect(selector)(Group)