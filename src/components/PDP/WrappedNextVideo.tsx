import Video, { VideoProps } from "next-video";

type WrappedNextVideoProps = VideoProps & {
  videoRef?: React.Ref<HTMLVideoElement>;
};

export default function WrappedNextVideo({
  videoRef,
  ...props
}: WrappedNextVideoProps) {
  return <Video ref={videoRef} {...props} />;
}