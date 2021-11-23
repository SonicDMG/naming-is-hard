import React, { useState, useEffect, useCallback } from "react";
import { getSentence } from "../api/grpc";
import { useDispatch } from "react-redux";
import { addData, reset } from "../store";
import ReactCountdownClock from "react-countdown-clock";

const SentenceLoop = () => {
  const dispatch = useDispatch();

  const [words, setWords] = useState([]);
  const [count, setCount] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [region, setRegion] = useState("us");
  const [toggle, setToggle] = useState(false);
  const [pauseTimer, setPauseTimer] = useState(false);
  const [isAlive, setIsAlive] = useState(true);

  const fetchData = useCallback(async (region) => {
    // Reset chart data state on each fetch
    dispatch(reset());

    setCount(0);
    setTotalTime(0);
    setWords([]);
    setIsLoading(true);
    setIsRunning(true);
    setPauseTimer(false);
    setIsAlive(true);
    const grpcResult = await getSentence(region);

    if ("code" in grpcResult) {
      setIsError(true);
      console.log("grpc ERROR IS: ", grpcResult);
      return;
    }

    const sentence = grpcResult.data.local.values[0].sentence;

    setWords(sentence.split(" "));

    setIsLoading(false);

    let time = grpcResult.elapsed_time;
    for (let i = 0; i < sentence.split(" ").length; i++) {
      const result = await getSentence(region);
      time = time + result.elapsed_time;
      setTotalTime(time);
      setCount(i + 1);
      dispatch(addData({ labels: i + 1, dataset: result.elapsed_time })); // Add data to chart in Footer component
    }
    setIsRunning(false);
    setPauseTimer(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData(region);
  }, [fetchData, region, toggle]);

  const timerEndCallback = useCallback((isRunning) => {
    setPauseTimer(true);
    if (isRunning) {
      setIsAlive(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isError) return <p>Error :(</p>;

  return (
    <div
      className="ui"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <label htmlFor="region-select">Choose a region:</label>
      <select
        disabled={isRunning}
        id="region-select"
        onChange={(e) => setRegion(e.target.value)}
        value={region}
      >
        <option value="us">US</option>
        <option value="emea">EMEA</option>
        <option value="apac">APAC</option>
      </select>

      <button
        disabled={isRunning}
        style={{ marginTop: "10px" }}
        onClick={() => setToggle(!toggle)}
      >
        Try again
      </button>

      {isLoading && <p>Is Loading...</p>}
      {!isLoading && (
        <>
          {isAlive ? (
            <>
              <ReactCountdownClock
                seconds={1}
                color="#fff"
                alpha={0.9}
                size={150}
                weight={20}
                onComplete={() => timerEndCallback(isRunning)}
                paused={pauseTimer}
                pausedText={isAlive ? "Alive" : "Dead"}
              />
              <div className="sentence">
                {words.map((word, index) => (
                  <span
                    style={{ margin: "3px" }}
                    key={index}
                    className={index >= count ? "hide" : ""}
                  >
                    {word}
                  </span>
                ))}
              </div>
              <div>total time: {totalTime}ms</div>
            </>
          ) : (
            <h1>YOU DIED!</h1>
          )}
        </>
      )}
    </div>
  );
};

export default SentenceLoop;
