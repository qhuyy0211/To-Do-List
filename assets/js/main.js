const main = {
  handleEvent() {
    // toggle light/dark mode
    const modeBtn = document.querySelector('.header__btn');
    modeBtn.onclick = function() {
      const isActived = modeBtn.classList.contains('active')
      modeBtn.classList.toggle('active', !isActived);
      if (isActived) {
        document.querySelector('html').dataset.theme = 'light'; 
      } else {
        document.querySelector('html').dataset.theme = 'dark';
      }
    }
  },
  start() {
    this.handleEvent();
  }
}

main.start();