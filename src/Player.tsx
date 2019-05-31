import {
  Player as PlayerType,
  PlayerFactory,
  PlayerOptions,
} from 'boclips-player';
import * as React from 'react';

export interface Props {
  playerRef?: (player: PlayerType) => void;
  videoUri?: string;
  handlePlay?: () => Promise<void>;
  handlePause?: () => void;
  options?: Partial<PlayerOptions>;
}

const noop: (args?: any) => any = () => {};

export class Player extends React.Component<Props> {
  private container: HTMLDivElement;
  // @ts-ignore
  private player: PlayerType;

  public static defaultProps: Partial<Props> = {
    videoUri: null,
    playerRef: noop,
    handlePlay: noop,
    handlePause: noop,
    options: {},
  };

  public componentDidMount() {
    this.player = PlayerFactory.get(this.container, this.props.options);
    if (this.props.videoUri) {
      // noinspection JSIgnoredPromiseFromCall
      this.player.loadVideo(this.props.videoUri);
    }
    this.props.playerRef(this.player);
  }

  public componentWillUnmount(): void {
    this.player.destroy();
  }

  public componentDidUpdate(prevProps: Readonly<Props>) {
    if (prevProps.videoUri !== this.props.videoUri) {
      this.player.loadVideo(this.props.videoUri);
    }
  }

  public render() {
    return (
      <div
        ref={container => {
          this.container = container;
        }}
      />
    );
  }
}
