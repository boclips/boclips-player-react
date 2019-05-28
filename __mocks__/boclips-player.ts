import { BoclipsPlayer as IBoclipsPlayer } from 'boclips-player';

// noinspection JSUnusedLocalSymbols
const fakeBoclipsPlayer: IBoclipsPlayer = {
  destroy: jest.fn(),
  loadVideo: jest.fn(),
  pause: jest.fn(),
  play: jest.fn(),
};

// noinspection JSUnusedGlobalSymbols
export const BoclipsPlayerFactory = {
  get: jest.fn().mockReturnValue(fakeBoclipsPlayer),
};
