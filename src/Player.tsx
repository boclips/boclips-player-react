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
    options: null,
    ...props,
  };

  const container = React.useRef<HTMLDivElement>(null);

  const [player, setPlayer] = React.useState<PlayerType>(null);
  const stablePlayerRefCallback = React.useCallback(playerRef, []);

  React.useEffect(() => {
    const newPlayer = PlayerFactory.get(container.current, options || {});

    setPlayer(newPlayer);
    stablePlayerRefCallback(newPlayer);

    return () => {
      newPlayer.destroy();
    };
  }, [options, stablePlayerRefCallback]);

  React.useEffect(() => {
    if (videoUri && player) {
      player.loadVideo(videoUri);
    }
  }, [videoUri, player]);

  return (
    <div
      className="boclips-player"
      ref={refContainer => {
        container.current = refContainer;
      }}
    />
  );
};
