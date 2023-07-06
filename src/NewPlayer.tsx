import React, { ReactElement, useEffect, useRef, useState } from 'react';
import {
  MediaCommunitySkin, MediaMenu, MediaMenuButton, MediaMenuItems,
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
import { setUpEvents } from './Events';

interface Props {
  videoUrl: string;
  tokenFactory: () => Promise<string>;
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

export const Player = ({ videoUrl, tokenFactory }: Props): ReactElement => {
  const player = useRef<MediaPlayerElement>(null);

  const [src, setSrc] = useState<string>('');
  const apiClient = useRef<ApiBoclipsClient>();
  const video = useRef<Video>();

  useEffect(() => {
    async function getMediaStream() {
      apiClient.current = await ApiBoclipsClient.create(
        axios,
        getBaseUrl(videoUrl),
      );
      video.current = await apiClient.current.videos.get(getVideoId(videoUrl));
      const url = getPlaybackUrl(video);
      player?.current.setAttribute('src', url);
      player?.current.setAttribute('title', video.current.title);
      player?.current.setAttribute(
        'poster',
        video.current.playback.links.thumbnail.getOriginalLink(),
      );

      setSrc(url);
      setUpEvents(player.current, apiClient.current, video.current);
    }

    getMediaStream();
  }, [videoUrl]);

  return (
    <MediaPlayer src={src} preferNativeHLS={true} crossorigin="" ref={player}>
      <MediaMenu>
        <MediaMenuButton aria-label="Settings">
          <span>blah</span>
        </MediaMenuButton>
        <MediaMenuItems><div>Embed</div></MediaMenuItems>
      </MediaMenu>
      <MediaOutlet />
      <MediaPoster />
      <MediaCommunitySkin />
    </MediaPlayer>
  );
};

export default Player;
