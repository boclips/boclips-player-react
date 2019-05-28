import { BoclipsPlayerFactory } from 'boclips-player';
import * as React from 'react';

export class Player extends React.Component {
  private container: HTMLDivElement;
  // @ts-ignore
  private player: BoclipsPlayer;


  componentDidMount() {
    this.player = BoclipsPlayerFactory.get(this.container);
  }

  render() {
    return (
      <div ref={(container) => {this.container = container} }>Hello Second World</div>
    )
  }

}