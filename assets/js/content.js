'use strict'

const datas = [
  {
    heading: 'WORK',
    lists: [
      {
        status: 'actived',
        content: 'Read the aesthetics guidelines'
      },
      {
        status: 'available',
        content: 'Design a minimalist to-do app'
      }
    ],
  },
  {
    heading: 'SHOPPING',
    lists: [
      {
        status: 'available',
        content: 'Buy groceries'
      },
    ],
  },
]

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = (function() {
  const content = $('#content')

  return {  
    render() {
      if (!content) {
        return;
      }
      const status = $('.option__item.active').dataset.status;
      switch(status) {
        case 'all':
          datas.forEach(function(data) {
            const contentGroup = document.createElement('div');
            contentGroup.classList.add('content__group');
            contentGroup.innerHTML = `
              <div class="content__heading">
                <span>${data.heading}</span>
                <div class="content__heading-edit">
                  <i class="content__heading-icon fa-solid fa-pen"></i>
                </div>
              </div>
            `

            const contentList = document.createElement('ul');
            contentList.classList.add('content__list');
            const htmls = data.lists.map(function(list) {
              const isActive = list.status == 'actived' ? 'active' : ''
              return `
                <li class="content__item ${isActive}">
                  <div class="content__item-status">
                    <i class="content__item__icon fa-solid fa-check"></i>
                  </div>
                  <div class="content__info">${list.content}</div>
                  <div class="content__delete">
                    <i class="content__delete-icon fa-regular fa-trash-can"></i>
                  </div>
                </li>
              `
            })
            contentList.innerHTML = htmls.join('')
            contentGroup.appendChild(contentList)
            content.appendChild(contentGroup)
          })
          break;
        case 'active':
          break;
        case 'completed':
          break;
        default:
          console.log('Trạng thái không đúng!') 
          break;
      }
    },
    handleEvent() {
      // add/remove class active on content__item element and remove this element
      const contentItems = $$('.content__item');
      for (const contentItem of contentItems) {
        contentItem.onclick = function(e) {
          if (e.target.closest('.content__item-status')) {
            const isActived = contentItem.classList.contains('active');
            contentItem.classList.toggle('active', !isActived);
            return;
          }

          if (e.target.closest('.content__delete')) {
            contentItem.remove();
          }
        }
      }

      // toggle option element active
      const option = $('.option');
      option.onclick = function(e) {
        const optionItem = e.target.closest('.option__item:not(.active)');
        if (optionItem) {
          const activeOptionItem = $('.option__item.active');
          if (activeOptionItem) {
            activeOptionItem.classList.remove('active');
            optionItem.classList.add('active');
          }
        }
      }
    },
    start: function() {
      this.render();
      this.handleEvent();
    }
  }
})();

app.start();