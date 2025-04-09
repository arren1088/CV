// 滾動至頂部
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // 平滑滾動效果
  });
}

// 監聽滾動事件，當頁面向下滾動時顯示回到頂部按鈕
window.addEventListener('scroll', function() {
  var scrollTopButton = document.querySelector('.scroll-to-top');

  // 確保頁面滾動超過 100px 時顯示按鈕
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollTopButton.style.display = 'block'; // 顯示按鈕
    scrollTopButton.classList.add('show-scroll-to-top');
    scrollTopButton.classList.remove('hide-scroll-to-top');
  } else {
    scrollTopButton.style.display = 'none'; // 滾動到頁面上端時隱藏按鈕
    scrollTopButton.classList.add('hide-scroll-to-top');
    scrollTopButton.classList.remove('show-scroll-to-top');
  }
});

// 頁面加載時隱藏回到頂部按鈕
window.onload = function() {
  var button = document.querySelector('.scroll-to-top');
  button.style.display = 'none'; // 頁面加載後按鈕隱藏
};
