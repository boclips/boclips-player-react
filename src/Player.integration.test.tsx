import { mount } from 'enzyme';
import { Player } from './Player';
import React from 'react';

jest.unmock('boclips-player');
jest.resetModules();
jest.requireActual('boclips-player');

describe('a Player is actually created', () => {
  let component;
  let actualPlayer;
  beforeEach(() => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    component = mount(
      <Player
        playerRef={player => {
          actualPlayer = player;
        }}
      />,
      {
        attachTo: container,
      },
    );
  });

  it('passes back a player reference', () => {
    expect(actualPlayer).toBeTruthy();
    expect(actualPlayer).toMatchObject({
        play: expect.any(Function),
        pause: expect.any(Function)
    });
  });

  it('loads a video element in the DOM', () => {
    const domNode = component.getDOMNode();

    const videoElement = domNode.querySelector('[data-qa="boclips-player"]');

    expect(videoElement).toBeTruthy();
  });
});
