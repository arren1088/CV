// 回到頂部函數，帶有平滑滾動效果
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // 平滑滾動效果
  });
}

// 監聽滾動事件，當頁面滾動時顯示或隱藏回到頂部按鈕
window.onscroll = function() {
  var scrollTopButton = document.querySelector('.scroll-to-top');

  // 當滾動超過 100px 時顯示按鈕，並加入顯示動畫
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollTopButton.classList.add('show-scroll-to-top');
    scrollTopButton.classList.remove('hide-scroll-to-top');
  } else {
    // 當滾動回頂部時隱藏按鈕，並加入隱藏動畫
    scrollTopButton.classList.add('hide-scroll-to-top');
    scrollTopButton.classList.remove('show-scroll-to-top');
  }
};
