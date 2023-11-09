import React, { ReactElement, useEffect, useRef, useState } from 'react';
import './player.css';
import {
  MediaPlayer,
  MediaPlayerInstance,
} from '@vidstack/react';
import { ApiBoclipsClient } from 'boclips-api-client';
import axios from 'axios';
import { Video } from 'boclips-api-client/dist/sub-clients/videos/model/Video';
import { PlaybackSegment } from 'boclips-player/dist/MediaPlayer/MediaPlayer';
import { Provider } from './Provider';

interface Props {
  playerRef?: (player: MediaPlayerInstance) => void;
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
  const [src, setSrc] = useState<string>('');

  const apiClient = useRef<ApiBoclipsClient>();
  const video = useRef<Video>();

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
      if (segment) {
        //player.current.
      }
    }

    getMediaStream();
  }, [segment, userIdFactory, videoUrl]);

  return (
    <>
      {video.current && apiClient.current && (
        <MediaPlayer
          className="player"
          title={video.current.title}
          src={src}
          crossorigin
        >
          <Provider
            client={apiClient.current}
            video={video.current}
            segment={segment}
          />
        </MediaPlayer>
      )}
    </>
  );
};

export default Player;
