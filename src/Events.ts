import { ApiBoclipsClient } from 'boclips-api-client';
import { Video } from 'boclips-api-client/dist/sub-clients/videos/model/Video';
import { PlaybackSegment } from 'boclips-player/dist/MediaPlayer/MediaPlayer';
import { MediaPlayerInstance } from '@vidstack/react';

export const setUpEvents = (
  player: MediaPlayerInstance,
  apiClient: ApiBoclipsClient,
  video: Video,
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

  player.addEventListener('play', () => {
    console.log(`play event sent`);
    apiClient?.events
      .trackVideoInteraction(
        video!,
        'VIDEO_PLAYBACK_STARTED', //TODO(AG) - Check the real event names
      )
      .then(() => console.log(`play event sent`));
  });

  player.addEventListener('pause', () => {
    apiClient?.events
      .trackVideoInteraction(video!, 'VIDEO_PLAYBACK_PAUSED')
      .then(() => console.log(`pause event sent`));
  });

  player.addEventListener('duration-change', () => {
    apiClient?.events
      .trackVideoInteraction(video!, 'VIDEO_PLAYBACK_DURATION_CHANGE')
      .then(() => console.log(`duration-change event sent`));
  });

  player.addEventListener('fullscreen-change', () => {
    apiClient?.events
      .trackVideoInteraction(video!, 'VIDEO_PLAYBACK_FULLSCREEN_CHANGE')
      .then(() => console.log(`fullscreen-change event sent`));
  });

  player.addEventListener('quality-change', () => {
    apiClient?.events
      .trackVideoInteraction(video!, 'VIDEO_PLAYBACK_QUALITY_CHANGE')
      .then(() => console.log(`quality-change event sent`));
  });

  player?.addEventListener('rate-change', () => {
    apiClient?.events
      .trackVideoInteraction(video!, 'VIDEO_PLAYBACK_RATE_CHANGE')
      .then(() => console.log(`rate-change event sent`));
  });

  if (segments) {
    const segmentStart = segments.start || 0;

    player.currentTime = segmentStart;

    if (segments.end && segments.end > segmentStart) {
      player.addEventListener('seeking', autoStop);
      player.addEventListener('time-update', autoStop);
    }
  }
};
