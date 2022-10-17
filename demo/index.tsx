import { Player as PlayerType } from 'boclips-player';
import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { Player } from '../src/Player';
import BoclipsSecurity from 'boclips-js-security';

const boclipsSecurity = BoclipsSecurity.createInstance({
  onLogin: () => {
    console.log('Successfully authenticated');
    renderPlayer();
  },
  realm: 'boclips',
  clientId: 'teachers',
  requireLoginPage: true,
  authEndpoint: 'https://login.staging-boclips.com/auth',
});

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
    'https://api.staging-boclips.com/v1/videos/5df92c1b67f5a65f1e5e64bb',
  );

  const loadVideoOne = () => {
    setVideoUri(
      'https://api.staging-boclips.com/v1/videos/5df92c1b67f5a65f1e5e64bb',
    );
  };
  const loadVideoTwo = () => {
    setVideoUri(
      'https://api.staging-boclips.com/v1/videos/5d2856987e173c570e69c523',
    );
  };
  const loadVideoThree = () => {
    setVideoUri(
      'https://api.staging-boclips.com/v1/videos/5df92c1b67f5a65f1e5e64bb',
    );
  };
  const getPlayerRef = (playerRef) => {
    setPlayer(playerRef);
  };

  const handlePlay = () => player.play();

  const handlePause = () => player.pause();

  const options = {
    api: { tokenFactory: boclipsSecurity.getTokenFactory(5) },
    displayAutogeneratedCaptions: true,
  };

  return (
    <>
      <h1>{props.heading}</h1>
      <Player playerRef={getPlayerRef} videoUri={videoUri} options={options} />
      <div>
        <button onClick={loadVideoOne}>Load Video One (Kaltura)</button>
        <button onClick={loadVideoTwo}>Load Video Two (YT)</button>
        <button onClick={loadVideoThree}>Load Video Three</button>
      </div>
      <div>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
      </div>
    </>
  );
};

const renderPlayer = () => {
  ReactDOM.render(<ContainerApp />, document.querySelector('#container'));
};
