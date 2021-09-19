import { useState } from "react";
import Root from "components/layout/Root";
import DeviceSelector from "components/elements/DeviceSelector";
import Video from "components/elements/Video";

function App() {
  const [videoId, setVideoId] = useState<string>('');
  const [settings, setSettings] = useState<MediaTrackSettings | null>(null);

  const setFrame = (frame: string) => {
    (async () => {
      const options: RequestInit = {
        method: 'POST',
        body: JSON.stringify({ "image" : frame.replace("data:image/png;base64", "")}),
        headers: {
            'Content-Type': 'application/json'
        }
      }
      
      //const response = await fetch("/api/predict", options)
      console.log(options.body);
    })();
  }

  return (
    <Root title="Test">
      <div
        id="article"
        className="max-w-screen-md mx-auto mt-4 lg:mt-6 md:text-lg"
      >
        <div className="mt-2 ml-3 mr-3 text-4xl">Test Video Component</div>
        <div className="mt-3 text-2xl">
          <div>
            <DeviceSelector onSelect={setVideoId} />
          </div>
        </div>
        <div className="mt-5">
          <Video device={videoId} onVideoSet={setSettings} onFrameset={setFrame} />
        </div>
        <div className="mt-5">

        </div>
      </div>
    </Root>
  );
}

export default App;
