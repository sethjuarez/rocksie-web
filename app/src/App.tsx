import { useState } from "react";
import Root from "components/layout/Root";
import DeviceSelector from "components/elements/DeviceSelector";
import Video from "components/elements/Video";

interface Scores {
  none: number;
  paper: number;
  rock: number;
  scissors: number;
}

interface Prediction {
  time: number;
  prediction: string;
  scores: Scores;
  timestamp: string;
  model_update: string;
  message: string;
}

function App() {
  const pctFmt = (n: number | undefined) => n && (n * 100).toFixed(2) + "%";
  const [videoId, setVideoId] = useState<string>("");
  const [prediction, setPrediction] = useState<Prediction | null>(null);

  const setFrame = (frame: string) => {
    (async () => {
      const options: RequestInit = {
        method: "POST",
        body: JSON.stringify({ image: frame }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("/api/predict", options);
      const pred: Prediction = await response.json();
      setPrediction(pred);
    })();
  };

  return (
    <Root title="Stylish Demo">
      <div
        id="article"
        className="max-w-screen-md mx-auto mt-4 lg:mt-6 md:text-lg"
      >
        <div className="mt-2 text-4xl">Stylish MLOps Demo</div>
        <div className="mt-3 text-2xl">
          <div>
            <DeviceSelector onSelect={setVideoId} />
          </div>
        </div>
        <div className="mt-5">
          <Video device={videoId} onFrameset={setFrame} />
        </div>
        <div className="mt-5 content">
          <table className="flex-grow" width={300}>
            <tbody>
              <tr>
                <td className="text-3xl font-bold text-green-600">{prediction?.prediction}</td>
                <td>Last Update: {prediction?.model_update}</td>
              </tr>
              <tr>
                <td className="text-right">None:</td>
                <td className={`${prediction && prediction.prediction === 'none' ? 'text-3xl text-green-600 font-bold' : ''} text-right`}>{pctFmt(prediction?.scores.none)}</td>
              </tr>
              <tr>
                <td className="text-right">Rock:</td>
                <td className={`${prediction && prediction.prediction === 'rock' ? 'text-3xl text-green-600 font-bold' : ''} text-right`}>{pctFmt(prediction?.scores.rock)}</td>
              </tr>
              <tr>
                <td className="text-right">Paper:</td>
                <td className={`${prediction && prediction.prediction === 'paper' ? 'text-3xl text-green-600 font-bold' : ''} text-right`}>{pctFmt(prediction?.scores.paper)}</td>
              </tr>
              <tr>
                <td className="text-right">Scissors:</td>
                <td className={`${prediction && prediction.prediction === 'scissors' ? 'text-3xl text-green-600 font-bold' : ''} text-right`}>{pctFmt(prediction?.scores.scissors)}</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-3">{prediction?.timestamp}</div>
        </div>
      </div>
    </Root>
  );
}

export default App;
