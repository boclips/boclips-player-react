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

  const container = React.useRef(null);

  const memoisedOptions = React.useMemo(() => options, []);

  const [player, setPlayer] = React.useState<PlayerType>();

  React.useEffect(() => {
    const localPlayer = PlayerFactory.get(container.current, memoisedOptions);
    setPlayer(localPlayer);

    return () => {
      localPlayer.destroy();
    };
  }, [memoisedOptions]);

  React.useEffect(() => {
    if (videoUri && player) {
      player.loadVideo(videoUri);
    }

    playerRef(player);
  }, [videoUri, player, playerRef]);

  return (
    <div
      className="boclips-player"
      ref={refContainer => {
        container.current = refContainer;
      }}
    />
  );
};
