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
import React, { useEffect } from 'react';
import { Video } from 'boclips-api-client/dist/sub-clients/videos/model/Video';
import { PlaybackSegment } from 'boclips-player/dist/MediaPlayer/MediaPlayer';

interface Props {
  video: Video;
  segment: PlaybackSegment;
}
export const Provider = ({ video, segment }: Props) => {
  const remote = useMediaRemote();
  const play = useMediaPlayer();
  console.log('callqing oncanplay');
  const handleCanPlay = () => segment?.start && remote.seek(segment.start);

  const handlePlaying = () => {
    if (segment?.start && play.currentTime < segment.start) {
      remote.seek(segment.start);
    } else if (segment?.end && play.currentTime > segment.end) {
      remote.seek(segment.start);
      remote.pause();
    }
  };

  return (
    <>
      <MediaProvider onTimeUpdate={handlePlaying} onLoadStart={handleCanPlay}>
        <Poster
          className="vds-poster"
          src={video.playback.links.thumbnail.getOriginalLink()}
          alt=""
        />
      </MediaProvider>

      {/* Layouts */}
      <DefaultVideoLayout
        icons={defaultLayoutIcons}
        thumbnails={video.playback.links.thumbnail.getOriginalLink()}
      />
    </>
  );
};
