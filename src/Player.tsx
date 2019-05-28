import { BoclipsPlayer, BoclipsPlayerFactory } from 'boclips-player';
import * as React from 'react';

interface Props {
  playerRef?: (player: BoclipsPlayer) => void;
  videoUri?: string;
  handlePlay?: () => Promise<void>;
  handlePause?: () => void;
}

interface State {
  error: boolean;
}

const noop: (args?: any) => any = () => {};

export class Player extends React.Component<Props, State> {
  private container: HTMLDivElement;
  // @ts-ignore
  private player: BoclipsPlayer;

  public state: State = {
    error: false,
  };

  public static defaultProps: Partial<Props> = {
    videoUri: null,
    playerRef: noop,
    handlePlay: noop,
    handlePause: noop,
  };

  public componentDidMount() {
    this.player = BoclipsPlayerFactory.get(this.container);
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

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({ error: true });
    console.error(
      'An error occurred within the Player component.',
      error,
      errorInfo,
    );
  }

  public render() {
    if (this.state.error) {
      return <div>An error has occurred.</div>;
    }

    return (
      <div
        ref={container => {
          this.container = container;
        }}
      />
    );
  }
}
