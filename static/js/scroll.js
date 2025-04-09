function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

window.addEventListener('scroll', function() {
  var scrollTopButton = document.querySelector('.scroll-to-top');

  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollTopButton.style.display = 'block';
    scrollTopButton.classList.add('show-scroll-to-top');
    scrollTopButton.classList.remove('hide-scroll-to-top');
  } else {
    scrollTopButton.style.display = 'none';
    scrollTopButton.classList.add('hide-scroll-to-top');
    scrollTopButton.classList.remove('show-scroll-to-top');
  }
});

window.onload = function() {
  var button = document.querySelector('.scroll-to-top');
  button.style.display = 'none';
};
