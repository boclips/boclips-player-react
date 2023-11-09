import { PlaybackSegment } from 'boclips-player/dist/MediaPlayer/MediaPlayer';
import { MediaPlayerInstance } from '@vidstack/react';

export const setUpEvents = (
  player: MediaPlayerInstance,
  segments?: PlaybackSegment,
) => {
  console.log(player);
  const autoStop = (event) => {
    console.log(event);

    if (player.currentTime > segments.end) {
      player.pause();
      player.currentTime = segments.end;
    }
    if (player.currentTime < segments.start) {
      player.pause();
      player.currentTime = segments.start;
    }
  };

  const skipToStart = (segmentStart) => {
    player.currentTime = segmentStart;
    player.removeEventListener('playing', skipToStart);
  };

  if (segments) {
    const segmentStart = segments.start || 0;

    player.currentTime = segmentStart;

    if (segments.end && segments.end > segmentStart) {
      player.addEventListener('seeking', autoStop);
      player.addEventListener('time-update', autoStop);
    }
  }
};
