import { Player as PlayerType } from 'boclips-player';
import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { Player } from '../src/Player';

export const ContainerApp = () => {
  const [heading, setHeading] = useState('');
  const [showPlayer, setShowPlayer] = useState(true);

  const changeHeading = () => {
    setHeading(new Date().toISOString());
  };
  const togglePlayer = () => {
    setShowPlayer(!showPlayer);
  };

  return (
    <>
      <button onClick={changeHeading}>Change header</button>
      <button onClick={togglePlayer}>Toggle Player</button>
      {showPlayer && <SampleApp heading={heading} />}
    </>
  );
};

export interface Props {
  heading: string;
}

export const SampleApp = (props: Props) => {
  const [player, setPlayer] = useState<PlayerType>(null);
  const [videoUri, setVideoUri] = useState(
    'https://api.staging-boclips.com/v1/videos/5c542ab85438cdbcb56ddceb',
  );

  const loadVideoOne = () => {
    setVideoUri(
      'https://api.staging-boclips.com/v1/videos/5c542ab85438cdbcb56ddceb',
    );
  };
  const loadVideoTwo = () => {
    setVideoUri(
      'https://api.staging-boclips.com/v1/videos/5c542abf5438cdbcb56df0bf',
    );
  };
  const loadVideoThree = () => {
    setVideoUri(
      'https://api.staging-boclips.com/v1/videos/5c7e6e3c93aafe1355ad8bf5',
    );
  };
  const getPlayerRef = (playerRef) => {
    setPlayer(playerRef);
  };

  const handlePlay = () => player.play();

  const handlePause = () => player.pause();
  return (
    <>
      <h1>{props.heading}</h1>
      <Player playerRef={getPlayerRef} videoUri={videoUri} />
      <div>
        <button onClick={loadVideoOne}>Load Video One</button>
        <button onClick={loadVideoTwo}>Load Video Two</button>
        <button onClick={loadVideoThree}>Load Video Three</button>
      </div>
      <div>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
      </div>
    </>
  );
};

ReactDOM.render(<ContainerApp />, document.querySelector('#container'));
