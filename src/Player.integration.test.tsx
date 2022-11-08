import React from 'react';
import { Player } from './Player';
import { render } from '@testing-library/react';

jest.unmock('boclips-player');
jest.resetModules();
jest.requireActual('boclips-player');

describe('a Player is actually created', () => {
  let component;
  let actualPlayer;
  beforeEach(() => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    component = render(
      <Player
        playerRef={(player) => {
          actualPlayer = player;
        }}
      />,
    );
  });

  it('passes back a player reference', () => {
    expect(actualPlayer).toBeTruthy();
    expect(actualPlayer).toMatchObject({
      play: expect.any(Function),
      pause: expect.any(Function),
    });
  });

  it('loads a video element in the DOM', () => {
    const player = component.baseElement.querySelector(
      `[data-qa="boclips-player"]`,
    );

    expect(player).toBeTruthy();
  });
});
