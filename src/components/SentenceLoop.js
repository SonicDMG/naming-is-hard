import { useState, useEffect, useCallback } from "react";
import { getSentence } from "../api/grpc";

const SentenceLoop = () => {
  const [words, setWords] = useState([]);
  const [count, setCount] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const grpcResult = await getSentence();

    if ("code" in grpcResult) {
      setIsError(true);
      console.log("grpc ERROR IS: ", grpcResult);
      return;
    }

    const sentence = grpcResult.data.local.values[0].sentence;
    console.log(sentence);

    setWords(sentence.split(" "));

    setIsLoading(false);

    let time = 0;
    for (let i = 0; i < sentence.split(" ").length; i++) {
      const result = await getSentence();
      time = time + result.elapsed_time;
      setTotalTime(time);
      setCount(i + 1);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) return <p>Is Loading...</p>;
  if (isError) return <p>Error :(</p>;

  return (
    <>
      <div className="sentence">
        {words.map((word, index) => (
          <span
            style={{ margin: "3px" }}
            key={index}
            className={index > count ? "hide" : ""}
          >
            {word}
          </span>
        ))}
      </div>
      <div>total time: {totalTime}</div>
      <div>count: {count}</div>
    </>
  );
};

export default SentenceLoop;
