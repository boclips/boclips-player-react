import React, { ReactElement, useEffect, useRef, useState } from 'react';
import {
  MediaCommunitySkin,
  MediaOutlet,
  MediaPlayer,
  MediaPoster,
} from '@vidstack/react';
import 'vidstack/styles/defaults.css';
import 'vidstack/styles/community-skin/video.css';
import { ApiBoclipsClient } from 'boclips-api-client';
import axios from 'axios';
import { MediaPlayerElement, MediaSrc } from 'vidstack';
import { Video } from 'boclips-api-client/dist/sub-clients/videos/model/Video';

interface Props {
  videoUrl: string;
  tokenFactory: () => Promise<string>;
}

export const Player = ({ videoUrl, tokenFactory }: Props): ReactElement => {
  const player = useRef<MediaPlayerElement>(null);

  const [src, setSrc] = useState<string>('');
  const apiClient = useRef<ApiBoclipsClient>();
  const video = useRef<Video>();

  useEffect(() => {
    async function getMediaStream() {
      apiClient.current = await ApiBoclipsClient.create(
        axios,
        videoUrl.substring(0, videoUrl.indexOf('/v1')),
      );
      const id = videoUrl.substring(videoUrl.indexOf('/v1/videos/') + 11);
      console.log(id);
      video.current = await apiClient.current.videos.get(id);
      const url = video.current.playback.links
        .hlsStream!.getOriginalLink()
        .replace('.mp4', '.m3u8');
      player?.current.setAttribute('src', url);
      player?.current.setAttribute('title', video.current.title);
      player?.current.setAttribute(
        'poster',
        video.current.playback.links.thumbnail.getOriginalLink(),
      );
      setSrc(url);
      setupEvents();
    }

    getMediaStream();
  }, [videoUrl]);
  const setupEvents = () => {
    player.current.addEventListener('play', () => {
      apiClient.current?.events
        .trackVideoInteraction(
          video.current!,
          'VIDEO_PLAYBACK_STARTED', //TODO(AG) - Check the real event names
        )
        .then((_e) => console.log(`play event sent `));
    });

    player.current.addEventListener('pause', () => {
      apiClient.current?.events
        .trackVideoInteraction(
          video.current!,
          'VIDEO_PLAYBACK_PAUSED', //TODO - Check the real event names
        )
        .then((_e) => console.log(`pause event sent`));
    });
  };

  return (
    <MediaPlayer src={src} preferNativeHLS={true} crossorigin="" ref={player}>
      <MediaOutlet />
      <MediaPoster />
      <MediaCommunitySkin />
    </MediaPlayer>
  );
};

export default Player;
