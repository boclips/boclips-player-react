import { Player as PlayerType } from 'boclips-player';

// noinspection JSUnusedLocalSymbols
const fakePlayer: PlayerType = {
  destroy: jest.fn(),
  loadVideo: jest.fn(),
  pause: jest.fn(),
  play: jest.fn(),
  onEnd: jest.fn(),
  onError: jest.fn()
};

// noinspection JSUnusedGlobalSymbols
export const PlayerFactory = {
  get: jest.fn().mockReturnValue(fakePlayer),
};
