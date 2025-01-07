import {
  Player as PlayerType,
  PlayerFactory,
  PlayerOptions,
} from 'boclips-player';
import * as React from 'react';
import { Player } from './Player';
import { PlaybackSegment } from 'boclips-player/dist/MediaPlayer/MediaPlayer';
import { render } from '@testing-library/react';

jest.mock('boclips-player');

describe('Player', () => {
  let playerWrapper;

  let fakePlayer: PlayerType;
  let playerRefSpy;

  beforeEach(() => {
    fakePlayer = (PlayerFactory.get as any)();
    playerRefSpy = jest.fn();

    playerWrapper = render(
      <Player playerRef={playerRefSpy} videoUri="path/to/a/video" />,
    );
  });

  it('Instantiates a Player with the container', () => {
    const divs = playerWrapper.baseElement.querySelectorAll('div');
    expect(divs).toHaveLength(2);

    const container: HTMLDivElement = divs[1];

    expect(PlayerFactory.get).toHaveBeenCalledWith(
      container,
      expect.anything(),
    );
  });

  it('Passes the Player up the playerRef callback', () => {
    expect(playerRefSpy).toHaveBeenCalledWith(fakePlayer);
  });

  it('does initially load the video from videoUri props', () => {
    expect(fakePlayer.loadVideo).toHaveBeenCalledWith(
      'path/to/a/video',
      undefined,
    );
  });

  it('Destroys the Player on unmount', () => {
    playerWrapper.unmount();
    expect(fakePlayer.destroy).toHaveBeenCalled();
  });

  it('passes options down into the factory', () => {
    const options: Partial<PlayerOptions> = {
      interface: {
        controls: ['play', 'fullscreen'],
      },
    };

    render(<Player options={options} />);

    expect(PlayerFactory.get).toHaveBeenCalledWith(expect.anything(), options);
  });
});

describe(`segmenting`, () => {
  let fakePlayer;
  let playerRefSpy;
  const segment: PlaybackSegment = { start: 60, end: 120 };

  beforeEach(() => {
    fakePlayer = (PlayerFactory.get as any)();
    playerRefSpy = jest.fn();

    render(
      <Player
        playerRef={playerRefSpy}
        videoUri="path/to/a/video"
        segment={segment}
      />,
    );
  });

  it(`loads the video with the correct segment value`, () => {
    expect(fakePlayer.loadVideo).toHaveBeenCalledWith(
      'path/to/a/video',
      segment,
    );
  });
});
