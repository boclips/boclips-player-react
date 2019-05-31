import { Player as PlayerType, PlayerFactory, PlayerOptions } from 'boclips-player';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { Player, Props } from './Player';

jest.mock('boclips-player');

describe('Player', () => {
  let playerWrapper: ReactWrapper<Props>;

  let fakePlayer: PlayerType;
  let playerRefSpy;
  let handlePauseSpy;
  let handlePlaySpy;

  beforeEach(() => {
    fakePlayer = (PlayerFactory.get as any)();
    playerRefSpy = jest.fn();
    handlePauseSpy = jest.fn();
    handlePlaySpy = jest.fn();

    playerWrapper = mount(
      <Player
        playerRef={playerRefSpy}
        handlePause={handlePauseSpy}
        handlePlay={handlePlaySpy}
        videoUri="path/to/a/video"
      />,
    );
  });

  it('Instantiates a Player with the container', () => {
    const divs = playerWrapper.find('div');
    expect(divs).toHaveLength(1);

    const container: HTMLDivElement = divs.at(0).getDOMNode();
    expect(PlayerFactory.get).toHaveBeenCalledWith(container, expect.anything());
  });

  it('Passes the Player up the playerRef callback', () => {
    expect(playerRefSpy).toHaveBeenCalledWith(fakePlayer);
  });

  it('does initially load the video from videoUri props', () => {
    expect(fakePlayer.loadVideo).toHaveBeenCalledWith('path/to/a/video');
  });

  it('Destroys the Player on unmount', () => {
    playerWrapper.unmount();
    expect(fakePlayer.destroy).toHaveBeenCalled();
  });

  it('does load a new video when the videoUri prop changes', () => {
    playerWrapper.setProps({
      videoUri: 'a/new/path/for/video',
    });
    expect(fakePlayer.loadVideo).toHaveBeenCalledWith('a/new/path/for/video');
  });

  it('passes options down into the factory', () => {
    let options: Partial<PlayerOptions> = {
      player: {
        controls: ['play', 'fullscreen'],
      },
    };

    mount(<Player options={options} />);

    expect(PlayerFactory.get).toHaveBeenCalledWith(
      expect.anything(),
      options,
    );
  });
});
