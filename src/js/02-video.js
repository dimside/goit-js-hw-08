import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on(
  'timeupdate',
  throttle(function (evt) {
    localStorage.setItem('videoplayer-current-time', evt.seconds);
  }, 1000)
);

let videoplayerCurrentTime = localStorage.getItem('videoplayer-current-time');
console.log(videoplayerCurrentTime);

player.setCurrentTime(videoplayerCurrentTime);

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});
