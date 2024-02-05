import moment from 'moment';
import { Video } from 'boclips-api-client/dist/sub-clients/videos/model/Video';

export const GenerateWebVtt = (video: Video) => {
  const width = 160; // width of each thumbnail
  const height = 90; // height of each thumbnail
  const slices = 10;
  const duration = video.playback.duration.asSeconds(); // Total duration of the video in seconds
  const image = video.playback.links.videoPreview.getTemplatedLink({
    thumbnailWidth: width,
    thumbnailCount: slices,
  });
  const timeBetweenSlices = Math.floor(duration / slices);
  let thumbOutput = 'WEBVTT\n\n';
  const startTime = moment('00:00:00', 'HH:mm:ss.SSS');
  const endTime = moment('00:00:00', 'HH:mm:ss.SSS').add(
    timeBetweenSlices,
    'seconds',
  );

  // This loop is for generating multiple 5x5 sprite, you can remove this if you want all thumbnails in a single sprite
  for (let i = 0; i < slices; i++) {
    thumbOutput += `${startTime.format('HH:mm:ss.SSS')} --> ${endTime.format(
      'HH:mm:ss.SSS',
    )}\n`;

    thumbOutput += `${image}#xywh=${
      i * width
    },0,${width},${height}\n\n`;

    startTime.add(timeBetweenSlices, 'seconds');
    endTime.add(timeBetweenSlices, 'seconds');
  }

  console.log(thumbOutput);
};
