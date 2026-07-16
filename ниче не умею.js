// script.js

const track = document.getElementById('sliderTrack');
const cards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

function updateSlider() {
  const cardWidth = cards[0].getBoundingClientRect().width;
  const gap = 30; // расстояние между карточками из CSS
  
  // 1. Вычисляем максимальный сдвиг, который вообще возможен
  // (Ширина всей длинной ленты минус ширина видимого окошка)
  const maxScroll = track.scrollWidth - track.parentElement.clientWidth;
  
  // 2. Вычисляем желаемый сдвиг для текущего индекса
  let targetTranslate = currentIndex * (cardWidth + gap);
  
  // 3. КРИТИЧЕСКИЙ МОМЕНТ: Если желаемый сдвиг больше максимального,
  // мы насильно прижимаем слайдер к самому правому краю.
  // Это гарантирует, что последний отзыв покажется целиком и не отрежется!
  if (targetTranslate > maxScroll) {
    targetTranslate = maxScroll;
  }

  // Сдвигаем ленту
  track.style.transform = `translateX(-${targetTranslate}px)`;

  // Обновляем активную карточку (подсветка рамки)
  cards.forEach((card, idx) => {
    if (idx === currentIndex) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });

  // Обновляем активную точку внизу
  dots.forEach((dot, idx) => {
    if (idx === currentIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Кнопка Вперед
nextBtn.addEventListener('click', () => {
  const maxIndex = cards.length - getVisibleCardsCount();
  if (currentIndex < maxIndex) {
    currentIndex++;
  } else {
    currentIndex = 0; // Возвращаемся в начало, если дошли до конца
  }
  updateSlider();
});

// Кнопка Назад
prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = cards.length - getVisibleCardsCount(); // Переходим в конец
  }
  updateSlider();
});

// Клик по точкам
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    const maxIndex = cards.length - getVisibleCardsCount();
    if (index <= maxIndex) {
      currentIndex = index;
      updateSlider();
    }
  });
});

// Сколько карточек помещается на экране в зависимости от его ширины
function getVisibleCardsCount() {
  const width = window.innerWidth;
  if (width > 992) return 3;
  if (width > 600) return 2;
  return 1;
}

// Пересчет при изменении размеров окна браузера
window.addEventListener('resize', () => {
  currentIndex = 0;
  updateSlider();
});

// Инициализация при первой загрузке
updateSlider();