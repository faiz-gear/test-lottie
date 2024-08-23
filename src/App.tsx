import { useRef, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Lottie, {
  LottieRefCurrentProps,
  useLottie,
  useLottieInteractivity,
} from 'lottie-react';
import mailAnimation from './assets/mailAnimation.json';
import treeGrowingAnimation from './assets/treeGrowingAnimation.json';

const style = {
  height: 300,
  border: 3,
  borderStyle: 'solid',
  borderRadius: 7,
};

const options = {
  animationData: treeGrowingAnimation,
  loop: false,
};

const TreeGrowing = () => {
  const lottieObj = useLottie(options, style);
  const Animation = useLottieInteractivity({
    lottieObj,
    mode: 'scroll',
    actions: [
      {
        // 如果是0-1, 代表容器从刚开始可见到完全不可见时触发
        // 如果是其他范围,如[04, 0.8], 代表整个容器滚动到0.4-0.8这个区间时触发
        visibility: [0, 1],
        //  seek 显示某一帧
        type: 'seek',
        frames: [0, 100],
      },
    ],
  });

  return Animation;
};

function App() {
  const [count, setCount] = useState(0);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const toggleIsPlaying = () => {
    setIsPlaying(!isPlaying);
    if (lottieRef.current) {
      if (isPlaying) {
        lottieRef.current.pause();
      } else {
        lottieRef.current.play();
      }
    }
  };

  return (
    <div
      style={{
        height: '200vh',
      }}
    >
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <Lottie
          lottieRef={lottieRef}
          animationData={mailAnimation}
          loop={true}
          style={{
            width: 200,
          }}
        />
        <button onClick={toggleIsPlaying}>切换</button>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <TreeGrowing />
    </div>
  );
}

export default App;
