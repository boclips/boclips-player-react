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

  const player = React.useRef<PlayerType>();

  React.useEffect(() => {
    player.current = PlayerFactory.get(container.current, options || {});

    playerRef(player.current);

    return () => {
      if (player.current) {
        player.current.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (videoUri) {
      player.current.loadVideo(videoUri);
    }
  }, [videoUri]);

  return (
    <div
      className="boclips-player"
      ref={refContainer => {
        container.current = refContainer;
      }}
    />
  );
};
