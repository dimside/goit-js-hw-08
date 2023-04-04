import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const CURRENT_TIME = 'videoplayer-current-time';
const THROTTLE_TIME = 1000;

player.on(
  'timeupdate',
  throttle(function (evt) {
    localStorage.setItem(CURRENT_TIME, Math.round(evt.seconds));
  }, THROTTLE_TIME)
);
if (localStorage.getItem(CURRENT_TIME)) {
  let savedPlaybackTime = localStorage.getItem(CURRENT_TIME);
  player.setCurrentTime(savedPlaybackTime);
} else return;
