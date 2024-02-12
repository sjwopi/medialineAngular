
const searchInp = document.querySelector('.overlay__search')
const ovRect = document.querySelector('.overlay__rectange');
const headMob = document.querySelector('.header-mob');
/* 
document.querySelector(".overlay__search-img").addEventListener('click', () => {
  if (searchInp.classList.contains('active')) {
    searchInp.classList.remove('active');
    ovRect.classList.remove('active');
  } else {
    searchInp.classList.add('active');
    ovRect.classList.add('active');
  }
}) */

document.querySelector('.header-mob__btn').addEventListener('click', () => {
  if (headMob.classList.contains('active')) {
    headMob.classList.remove('active');
    document.body.classList.remove('open');
  } else {
    headMob.classList.add('active');
    document.body.classList.add('open');
  }
})

document.querySelectorAll('.header-mob__link').forEach(item => {
  item.addEventListener('click', () => {
    headMob.classList.remove('active');
    document.body.classList.remove('open');
  })
})

