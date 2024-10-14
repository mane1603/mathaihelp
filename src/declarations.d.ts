declare class ImageCapture {
  constructor(videoTrack: MediaStreamTrack);
  grabFrame(): Promise<ImageBitmap>;
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
