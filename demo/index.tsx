import { BoclipsPlayer } from 'boclips-player';
import React from 'react';
import ReactDOM from 'react-dom';
import { Player } from '../src/Player';

class ContainerApp extends React.Component<
  any,
  { heading: string; showPlayer: boolean }
> {
  public state = {
    heading: 'Hello 123',
    showPlayer: true,
  };

  public render() {
    return (
      <>
        <button onClick={this.changeHeading}>Change header</button>
        <button onClick={this.togglePlayer}>Toggle Player</button>
        {this.state.showPlayer && <SampleApp heading={this.state.heading} />}
      </>
    );
  }

  public changeHeading = () => {
    this.setState({ heading: new Date().toISOString() });
  };
  public togglePlayer = () => {
    this.setState(state => ({ showPlayer: !state.showPlayer }));
  };
}

class SampleApp extends React.Component<{ heading: string }> {
  private player: BoclipsPlayer;

  public state = {
    videoUri:
      'https://teachers.staging-boclips.com/v1/videos/5c542ab85438cdbcb56ddceb',
  };

  public render() {
    return (
      <>
        <h1>{this.props.heading}</h1>
        <Player playerRef={this.getPlayerRef} videoUri={this.state.videoUri} />
        <div>
          <button onClick={this.loadVideoOne}>Load Video One</button>
          <button onClick={this.loadVideoTwo}>Load Video Two</button>
          <button onClick={this.loadVideoThree}>Load Video Three</button>
        </div>
        <div>
          <button onClick={this.handlePlay}>Play</button>
          <button onClick={this.handlePause}>Pause</button>
        </div>
      </>
    );
  }

  private loadVideoOne = () =>
    this.setState({
      videoUri:
        'https://teachers.staging-boclips.com/v1/videos/5c542ab85438cdbcb56ddceb',
    });

  private loadVideoTwo = () =>
    this.setState({
      videoUri:
        'https://teachers.staging-boclips.com/v1/videos/5c542abf5438cdbcb56df0bf',
    });

  private loadVideoThree = () =>
    this.setState({
      videoUri:
        'https://teachers.staging-boclips.com/v1/videos/5c7e6e3c93aafe1355ad8bf5',
    });

  private getPlayerRef = player => (this.player = player);

  private handlePlay = () => this.player.play();

  private handlePause = () => this.player.pause();
}

ReactDOM.render(<ContainerApp />, document.querySelector('#container'));
