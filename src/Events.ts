import { MediaPlayerElement } from 'vidstack';
import { ApiBoclipsClient } from 'boclips-api-client';
import { Video } from 'boclips-api-client/dist/sub-clients/videos/model/Video';

export const setUpEvents = (
  player: MediaPlayerElement,
  apiClient: ApiBoclipsClient,
  video: Video,
) => {
  player.addEventListener('play', () => {
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
};
