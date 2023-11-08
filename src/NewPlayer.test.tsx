import { render } from '@testing-library/react';
import React from 'react';
import NewPlayer from './NewPlayer';
import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';
import { MediaPlayerInstance } from '@vidstack/react';
import {stubBoclipsSecurity} from "./test-support/stubBoclipsSecurity";

describe(`NewPlayer`, () => {
  it('playback starts at segment start', () => {
    const video = VideoFactory.sample({});
    let playerRef: MediaPlayerInstance;
   render(
      <NewPlayer
        videoUrl={video.playback.links.hlsStream.getOriginalLink()}
        userIdFactory={stubBoclipsSecurity.getTokenFactory(5)}
        segment={{ start: 10 }}
        playerRef={(player) => {
          playerRef = player;
        }}
      />,
    );

    expect(playerRef.currentTime).toEqual(10);
  });
});
