
console.log("Olá mundo do 'Jogo da Velha' em HTML");

const btnPlay = document.getElementById('btn-action-play');
btnPlay.addEventListener('click', () => {
  const element = document.querySelector('.app-screen.in-game');
  element.classList.add('is-visible');
  element.classList.remove('is-hidden');
});
