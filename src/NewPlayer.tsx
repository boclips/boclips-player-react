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

interface Props {
  videoUrl: string;
  tokenFactory: () => Promise<string>;
}

export const Player = ({ videoUrl, tokenFactory }: Props): ReactElement => {
  const player = useRef<MediaPlayerElement>(null);

  // player?.current?.addEventListener('on-sources-change', async (event) => {
  //   console.log('load-start');
  //   const apiClient = await ApiBoclipsClient.create(axios, apiPrefix);
  //   // original media event (`loadedmetadata`) is still available.
  //   const video = await apiClient.videos.get(
  //     videoUrl.substring(videoUrl.indexOf('/v1') + 1),
  //   );
  //   const url = video.playback.links
  //     .hlsStream!.getOriginalLink()
  //     .replace('.mp4', '.m3u8');
  //   player?.current.setAttribute('src', url);
  //   player?.current.setAttribute('title', video.title);
  //   player?.current!.startLoading();
  // });
  const [src, setSrc] = useState<string>('');
  const apiClient = useRef<ApiBoclipsClient>();
  console.log('hi');
  useEffect(() => {
    console.log('load-start');
    async function getMediaStream() {
      apiClient.current = await ApiBoclipsClient.create(
        axios,
        videoUrl.substring(0, videoUrl.indexOf('/v1')),
      );
      // original media event (`loadedmetadata`) is still available.
      const id = videoUrl.substring(videoUrl.indexOf('/v1/videos/') + 11);
      console.log(id);
      const video = await apiClient.current.videos.get(id);
      const url = video.playback.links
        .hlsStream!.getOriginalLink()
        .replace('.mp4', '.m3u8');
      player?.current.setAttribute('src', url);
      player?.current.setAttribute('title', video.title);
      player?.current.setAttribute(
        'poster',
        video.playback.links.thumbnail.getOriginalLink(),
      );
      setSrc(url);
    }

    getMediaStream();
  }, [videoUrl]);

  return (
    <MediaPlayer src={src} preferNativeHLS={true} crossorigin="" ref={player}>
      <MediaOutlet />
      <MediaPoster />
      <MediaCommunitySkin />
    </MediaPlayer>
  );
};

export default Player;
