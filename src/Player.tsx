import {
  Player as PlayerType,
  PlayerFactory,
  PlayerOptions,
} from 'boclips-player';

import * as React from 'react';

export interface Props {
  playerRef?: (player: PlayerType) => void;
  videoUri?: string;
  options?: Partial<PlayerOptions>;
}

const noop: (args?: any) => any = () => {};
export const Player = (props: Props) => {
  const { playerRef, videoUri, options } = {
    playerRef: noop,
    videoUri: null,
    options: {},
    ...props,
  };

  let container: HTMLDivElement;

  const player = React.useRef<PlayerType>(null);

  React.useEffect(() => {
    player.current = PlayerFactory.get(container, options);

    return () => {
      player.current.destroy();
    };
  }, []);

  React.useEffect(() => {
    if (videoUri && player.current) {
      player.current.loadVideo(videoUri);
    }

    playerRef(player.current);
  }, [videoUri, player, playerRef]);

  return (
    <div
      className="boclips-player"
      ref={refContainer => {
        container = refContainer;
      }}
    />
  );
};
