import { BoclipsSecurity } from 'boclips-js-security/dist/BoclipsSecurity';

export const boclipsSecurityFake = {
  logout: jest.fn(),
  isAuthenticated: () => true,
  getTokenFactory: jest.fn(),
  configureAxios: jest.fn(),
  ssoLogin: jest.fn(),
  hasRole: (_role: string) => true,
};

export const stubBoclipsSecurity: BoclipsSecurity = {
  ...boclipsSecurityFake,
  hasRole: (_role) => false,
};
