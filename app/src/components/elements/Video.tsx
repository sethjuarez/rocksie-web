import { useEffect, useRef, useState } from "react";

interface Props {
  device: string;
  onFrameset(frame: string): void;
}

export const Video = ({ device, onFrameset }: Props) => {
  const [running, setRunning] = useState<boolean>(false);
  const video = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  

  useEffect(() => {
    const sendFrame = () => {
      if (video.current && canvas.current) {
        const ctx = canvas.current.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, 320, 240);
          ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);
          ctx.drawImage(video.current, 0, 0, 320, 240);
          onFrameset(canvas.current.toDataURL());
        }
      }
    };
    let interval: NodeJS.Timeout | null = null;
    if (running) {
      interval = setInterval(sendFrame, 1000);
    } else if (!running && interval) {
      clearInterval(interval);
    }
    return () => { interval && clearInterval(interval); }
  }, [running, onFrameset]);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      (async () => {
        try {
          let stream = await navigator.mediaDevices.getUserMedia({
            video: {
              deviceId: {
                exact: device,
              },
            },
          });
          const tracks = stream.getVideoTracks();
          if (video && tracks.length >= 1) {
            if (video.current) {
              video.current.srcObject = stream;
              video.current.play();
            }
          }
        } catch (err) {
          //console.log(err);
        }
      })();
    }
  }, [device]);

  return (
    <>
      <button
        className={`px-4 py-2 font-bold text-white rounded ${running ? "bg-red-500 hover:bg-red-700" : "bg-green-500 hover:bg-green-700"}`}
        onClick={() => setRunning(!running)}
      >
        {running ? "Stop" : "Start"}
      </button>
      <div className="max-w-screen-lg mx-auto md:grid md:grid-cols-2 md:gap-12">
        <div className="block mb-12 md:mb-auto">
          <video
            className="mt-3"
            ref={video}
            width="320"
            height="240"
            autoPlay={true}
          ></video>
        </div>
        <div>
          <canvas
            className="mt-3"
            ref={canvas}
            width="320"
            height="240"
          ></canvas>
        </div>
      </div>
    </>
  );
};

export default Video;
