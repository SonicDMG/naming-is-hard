import React, { useState, useEffect, useCallback } from "react";
import { getSentence } from "../api/grpc";
import { useDispatch } from "react-redux";
import { addData, reset } from "../store";

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

  const fetchData = useCallback(async () => {
    // Reset chart data state on each fetch
    dispatch(reset());

    setCount(0);
    setTotalTime(0);
    setWords([]);
    setIsLoading(true);
    setIsRunning(true);
    const grpcResult = await getSentence(region);

    if ("code" in grpcResult) {
      setIsError(true);
      console.log("grpc ERROR IS: ", grpcResult);
      return;
    }

    const sentence = grpcResult.data.local.values[0].sentence;
    console.log(sentence);

    setWords(sentence.split(" "));

    setIsLoading(false);
    console.time("time");
    let time = grpcResult.elapsed_time;
    for (let i = 0; i < sentence.split(" ").length; i++) {
      const result = await getSentence(region);
      time = time + result.elapsed_time;
      setTotalTime(time);
      setCount(i + 1);
      dispatch(addData({ labels: i + 1, dataset: result.elapsed_time })); // Add data to chart in Footer component
    }
    console.timeEnd("time");
    setIsRunning(false);
  }, [region, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData, region, toggle]);

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
      )}
    </div>
  );
};

export default SentenceLoop;
