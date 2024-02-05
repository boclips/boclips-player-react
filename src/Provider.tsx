import {
  MediaProvider,
  Poster,
  useMediaPlayer,
  useMediaRemote,
} from '@vidstack/react';
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';
import React from 'react';
import { Video } from 'boclips-api-client/dist/sub-clients/videos/model/Video';
import { PlaybackSegment } from 'boclips-player/dist/MediaPlayer/MediaPlayer';
import { ApiBoclipsClient } from 'boclips-api-client';

interface Props {
  video: Video;
  client: ApiBoclipsClient;
  segment: PlaybackSegment;
}
export const Provider = ({ video, client, segment }: Props) => {
  const remote = useMediaRemote();
  const play = useMediaPlayer();

  const handleCanPlay = () => segment?.start && remote.seek(segment.start);

  const handlePlaying = () => {
    if (segment?.start && play.currentTime < segment.start) {
      remote.seek(segment.start);
    } else if (segment?.end && play.currentTime > segment.end) {
      remote.seek(segment.start);
      remote.pause();
    }
  };

  const onPlay = () => {
    client.events
      .trackVideoInteraction(video, 'VIDEO_PLAYBACK_STARTED')
      .then(() => console.log(`play event sent`));
  };

  const onPause = () => {
    client.events
      .trackVideoInteraction(video, 'VIDEO_PLAYBACK_PAUSED')
      .then(() => console.log(`pause event sent`));
  };

  const onRateChange = () => {
    client.events
      .trackVideoInteraction(video, 'VIDEO_PLAYBACK_RATE_CHANGE')
      .then(() => console.log(`rate-change event sent`));
  };

  return (
    <>
      <MediaProvider
        onTimeUpdate={handlePlaying}
        onLoadStart={handleCanPlay}
        onPlay={onPlay}
        onPause={onPause}
        onRateChange={onRateChange}
      >
        <Poster
          className="vds-poster"
          src={video.playback.links.thumbnail.getOriginalLink()}
          alt=""
        />
      </MediaProvider>

      {/* Layouts */}
      <DefaultVideoLayout
        icons={defaultLayoutIcons}
        thumbnails={'https://media-files.vidstack.io/thumbnails.vtt'}
      />
    </>
  );
};
