import { MediaPlayerElement } from 'vidstack';
import { ApiBoclipsClient } from 'boclips-api-client';
import { Video } from 'boclips-api-client/dist/sub-clients/videos/model/Video';
import { PlaybackSegment } from 'boclips-player/dist/MediaPlayer/MediaPlayer';

export const setUpEvents = (
  player: MediaPlayerElement,
  apiClient: ApiBoclipsClient,
  video: Video,
  segments?: PlaybackSegment,
) => {
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

  player.addEventListener('play', () => {
    console.log(player.provider);
    apiClient?.events
      .trackVideoInteraction(
        video!,
        'VIDEO_PLAYBACK_STARTED', //TODO(AG) - Check the real event names
      )
      .then((_e) => console.log(`play event sent `));
  });

  player.addEventListener('pause', () => {
    apiClient?.events
      .trackVideoInteraction(
        video!,
        'VIDEO_PLAYBACK_PAUSED', //TODO - Check the real event names
      )
      .then((_e) => console.log(`pause event sent`));
  });

  if (segments) {
    const segmentStart = segments.start || 0;

    player.currentTime = segmentStart;

    if (segments.end && segments.end > segmentStart) {
      player.addEventListener('seeking', autoStop);
      player.addEventListener('timeupdate', autoStop);
    }
  }
};
