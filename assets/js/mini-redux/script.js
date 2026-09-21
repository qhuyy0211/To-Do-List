import App from './app.js'
import Group from './group.js'
import Task from './taskRemaining.js'
import {attach} from './store.js'
import {getHeading} from '../ApiServices/getContent.js'
import {getInfo} from '../ApiServices/getContent.js'
import {getConfig} from '../ApiServices/getContent.js'

attach(App, document.querySelector('.content__wrap'))
attach(Group, document.querySelector('#sub-create'))
attach(Task, document.querySelector('.header__subheading'))

async function getData() {
  const headings = await getHeading();
  const infos = await getInfo();
  const configs = await getConfig()

  loadConfigFilter(configs.status)
  loadConfigTheme(configs.theme)
  
  dispatch('ADD_INFO', infos);
  dispatch('ADD_HEADING', headings);
  dispatch('CHANGE_FILTER', configs.status)
  dispatch('CHANGE_THEME', configs.theme)
}

getData()

function loadConfigTheme(theme) {
  const htmlElement = document.querySelector('html')
  const headerModeBtn = document.querySelector('.header__btn')
  htmlElement.dataset.theme = theme;
  headerModeBtn.classList.toggle('active', theme == 'dark')
}

function loadConfigFilter(status) {
  const optionItems = document.querySelectorAll('.option__item')
  optionItems.forEach((optionItem) => {
    if (optionItem.dataset.status === status) {
      optionItem.classList.add('active')
      return;
    }
  })
}
