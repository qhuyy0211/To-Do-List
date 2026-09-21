import { addHeading, addInfo } from "./ApiServices/addContent.js";
import { changeInfoStatus, changeStatus, changeTheme, changeHeading } from "./ApiServices/changeContent.js";
import removeInfo from "./ApiServices/deleteContent.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = {
  handleEvent() {
    // toggle light/dark mode
    const modeBtn = document.querySelector('.header__btn');
    const htmlElement = document.querySelector('html')
    modeBtn.onclick = function() {
      const isActived = modeBtn.classList.contains('active')
      modeBtn.classList.toggle('active', !isActived);
      if (isActived) {
        htmlElement.dataset.theme = 'light'; 
      } else {
        htmlElement.dataset.theme = 'dark';
      }
      changeTheme(htmlElement.dataset.theme)
    }

    // Event with inside Item
    const contentWrap = $('.content__wrap')
    contentWrap.addEventListener('click', function(e) {
      // toggle status on item
      const contentItem = e.target.closest('.content__item')
      if (contentItem) {
        const contentStatus = e.target.closest('.content__item-status')
        if (contentStatus) {
          const isCompleted = contentItem.classList.contains('active');
          contentItem.classList.toggle('active', !isCompleted)
          const newStatus = isCompleted ? 'available' : 'actived'
          console.log(newStatus)
          changeInfoStatus(newStatus, contentItem.dataset.index)
        }
      }
    })
    
    contentWrap.addEventListener('click', function(e) {
      // Delete Item
      const contentItem = e.target.closest('.content__item')
      if (contentItem) {
        const contentDelete = e.target.closest('.content__delete')
        if (contentDelete) {
          removeInfo(contentItem.dataset.index)
          contentItem.remove()
        }
      }
    })
    
    contentWrap.addEventListener('click', function(e) {
      // Edit Heading
      const contentHeading = e.target.closest('.content__heading')
      if (contentHeading) {
        const editHeadingBtn = e.target.closest('.content__heading-edit')
        if (editHeadingBtn) {
          const headingElement = editHeadingBtn.closest('.content__heading')
          const headingInput = headingElement.querySelector('.content__input')
          headingElement.classList.add('editing')
          headingInput.value = headingElement.innerText
          headingInput.focus()
        }
      }
    })

    contentWrap.addEventListener('focusout', function(e) {
      const headingInput = e.target.closest('.content__input')
      if (headingInput) {
        const headingElement = headingInput.closest('.content__heading')
        headingElement.classList.remove('editing')
        changeHeading(headingInput.value, headingElement.dataset.index)
      }
    })

    contentWrap.addEventListener('keydown', function(e) {
      const headingInput = e.target.closest('.content__input')
      if (headingInput && e.key == 'Enter') {
        const headingElement = headingInput.closest('.content__heading')
        headingElement.classList.remove('editing')
        changeHeading(headingInput.value, headingElement.dataset.index)
      }
    })

    // handle create input event
    const createInput = $('.create__input');
    const createBtn = $('.create__btn')
    const subCreate = $('#sub-create')
    createInput.oninput = function() {
      if (this.value == '') {
        createBtn.classList.add('disabled')
        subCreate.classList.remove('active')
        return 
      }
      createBtn.classList.remove('disabled')
      subCreate.classList.add('active')
    }

    createBtn.onclick = async function() {
      if (createBtn.classList.contains('disabled')) {return}
      createInput.blur();
      subCreate.classList.remove('active')
      let isAnyChecked = document.querySelector('#sub-create__radio:checked')
      let groupIndex;
      if (isAnyChecked) {
        groupIndex = isAnyChecked.closest('.sub-create__item').dataset.index
      }
      if (!groupIndex) {
        const textElement = subCreate.querySelector('.sub-create__item.sub-create__item--new-group .sub-create__text')
        groupIndex = (await addHeading(textElement.textContent)).id
      }
      addInfo(createInput.value, groupIndex)
      createInput.value = ''
    }

    // Create new Group
    function showChangeInput(e) {
      const newGroupBtn = e.target.closest('.sub-create__item.sub-create__item--new-group')
      if (newGroupBtn) {
        const newGroupText = newGroupBtn.querySelector('.sub-create__text')
        const newGroupInput = newGroupBtn.querySelector('.sub-create__input')
        newGroupText.classList.remove('active')
        newGroupInput.classList.add('active')

        newGroupInput.value = newGroupText.textContent
        newGroupInput.focus()
      }
    }

    subCreate.addEventListener('click', showChangeInput)

    function completedChangeInput(e) {
      const newGroupBtn = e.target.closest('.sub-create__item.sub-create__item--new-group')
      const newGroupText = newGroupBtn.querySelector('.sub-create__text')
      const newGroupInput = newGroupBtn.querySelector('.sub-create__input')
      newGroupText.classList.add('active')
      newGroupInput.classList.remove('active')
      newGroupText.textContent = newGroupInput.value
    }
    
    subCreate.addEventListener('focusout', function(e) {
      if (e.target.closest('.sub-create__input')) {
        completedChangeInput(e)
      } 
    });

    subCreate.addEventListener('keydown', function(e) {
      if (e.target.closest('.sub-create__input') && e.key === 'Enter') {
        completedChangeInput(e)
      }
    })

    subCreate.addEventListener('submit', function(e) {
      e.preventDefault();
    })

    // handle filter btn event
    const option = $('.option')
    option.addEventListener('click', function(e) {
      const optionItem = e.target.closest('.option__item')
      if (optionItem && !optionItem.classList.contains('active')) {
        $('.option__item.active').classList.remove('active')
        optionItem.classList.add('active')
        changeStatus(optionItem.dataset.status)
      }
    })
  },
  start() {
    this.handleEvent();
  }
}

app.start();