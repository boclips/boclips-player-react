import React, { ReactElement, useEffect, useRef, useState } from 'react';
import './player.css';
import {
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  MediaViewType,
  Poster,
} from '@vidstack/react';
import { ApiBoclipsClient } from 'boclips-api-client';
import axios from 'axios';
import { Video } from 'boclips-api-client/dist/sub-clients/videos/model/Video';
import { PlaybackSegment } from 'boclips-player/dist/MediaPlayer/MediaPlayer';
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';

interface Props {
  videoUrl: string;
  userIdFactory: () => Promise<string>;
  segment?: PlaybackSegment;
}

function getBaseUrl(videoUrl: string) {
  return videoUrl.substring(0, videoUrl.indexOf('/v1'));
}

function getVideoId(videoUrl: string) {
  return videoUrl.substring(videoUrl.indexOf('/v1/videos/') + 11);
}

function getPlaybackUrl(video: React.MutableRefObject<Video | undefined>) {
  return video.current.playback.links
    .hlsStream!.getOriginalLink()
    .replace('.mp4', '.m3u8');
}

export const Player = ({
  videoUrl,
  userIdFactory,
  segment,
}: Props): ReactElement => {
  const player = useRef<MediaPlayerInstance>(null);

  const [src, setSrc] = useState<string>('');
  const [viewType, setViewType] = useState<MediaViewType>('unknown');

  const apiClient = useRef<ApiBoclipsClient>();
  const video = useRef<Video>();

  useEffect(() => {
    // Subscribe to state updates.
    return player.current?.subscribe(({ paused, viewType }) => {
      // console.log('is paused?', '->', paused);
      setViewType(viewType);
    });
  }, []);

  useEffect(() => {
    async function getMediaStream() {
      if (userIdFactory) {
        axios.interceptors.request.use(async (config) => {
          config.headers['Boclips-User-Id'] = await userIdFactory();
          return config;
        });
      }
      apiClient.current = await ApiBoclipsClient.create(
        axios,
        getBaseUrl(videoUrl),
      );
      video.current = await apiClient.current.videos.get(getVideoId(videoUrl));
      const url = getPlaybackUrl(video);

      setSrc(url);
      // setUpEvents(player.current, apiClient.current, video.current, segment);
    }

    getMediaStream();
  }, [segment, userIdFactory, videoUrl]);

  return (
    <>
      {video.current && (
        <MediaPlayer
          className="player"
          title={video.current.title}
          src={src}
          crossorigin
          ref={player}
        >
          <MediaProvider>
            <Poster
              className="vds-poster"
              src={video.current.playback.links.thumbnail.getOriginalLink()}
              alt=""
            />
          </MediaProvider>

          {/* Layouts */}
          <DefaultVideoLayout
            icons={defaultLayoutIcons}
            thumbnails={video.current.playback.links.thumbnail.getOriginalLink()}
          />
        </MediaPlayer>
      )}
    </>
  );
};

export default Player;
