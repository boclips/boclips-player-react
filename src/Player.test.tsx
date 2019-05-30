import {
  BoclipsPlayer,
  BoclipsPlayerFactory,
  BoclipsPlayerOptions,
} from 'boclips-player';
import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Player, Props } from './Player';

jest.mock('boclips-player');

describe('Player', () => {
  let playerWrapper: ReactWrapper<Props>;

  let fakePlayer: BoclipsPlayer;
  let playerRefSpy;
  let handlePauseSpy;
  let handlePlaySpy;

  beforeEach(() => {
    fakePlayer = (BoclipsPlayerFactory.get as any)();
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

  it('Instantiates a BoclipsPlayer with the container', () => {
    const divs = playerWrapper.find('div');
    expect(divs).toHaveLength(1);

    const container: HTMLDivElement = divs.at(0).getDOMNode();
    expect(BoclipsPlayerFactory.get).toHaveBeenCalledWith(
      container,
      expect.anything(),
    );
  });

  it('Passes the BoclipsPlayer up the playerRef callback', () => {
    expect(playerRefSpy).toHaveBeenCalledWith(fakePlayer);
  });

  it('does initially load the video from videoUri props', () => {
    expect(fakePlayer.loadVideo).toHaveBeenCalledWith('path/to/a/video');
  });

  it('Destroys the BoclipsPlayer on unmount', () => {
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
    let options: Partial<BoclipsPlayerOptions> = {
      player: {
        controls: ['play', 'fullscreen'],
      },
    };

    mount(<Player options={options} />);

    expect(BoclipsPlayerFactory.get).toHaveBeenCalledWith(
      expect.anything(),
      options,
    );
  });
});
