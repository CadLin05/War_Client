import { useState, useEffect } from "react";

interface props {
  value: number;
}

const Card = (props: props) => {
  const { value } = props;
  const [currentValue, setCurrentValue] = useState<number>(-1);

  useEffect(() => {
    setCurrentValue(value);
    console.log("Value changed: ", value);
  }, [value]);

  useEffect(() => {
    console.log("An empty array ran");
  }, []);

  useEffect(() => {
    console.log("No dependcies array ran");

    return () => {
      console.log("This component was unrendered");
    };
  });

  return (
    <div>
      <img src={"/cards/" + currentValue + ".png"} />
    </div>
  );
};

export default Card;
