import React from "react";

const chartSizeContext = React.createContext(null);

export const ChartSizeProvider = ({ children }) => {
  const aspect = 1050 / 400;

  const offset = window.innerWidth < 900 ? 0 : 0.2 * window.innerWidth;

  const [width, setWidth] = React.useState(window.innerWidth - 40 - offset);
  const [height, setHeight] = React.useState(
    Math.round((window.innerWidth - 40 - offset) / aspect)
  );

  const handleWindowResize = () => {
    let newOffset = window.innerWidth < 900 ? 0 : 0.2 * window.innerWidth;
    setWidth(window.innerWidth - 40 - newOffset);
    setHeight(Math.round((window.innerWidth - 40 - newOffset) / aspect));
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <chartSizeContext.Provider value={{ width, height }}>
      {children}
    </chartSizeContext.Provider>
  );
};

export const useChartSize = () => {
  const { width, height } = React.useContext(chartSizeContext);
  if (width == null || height == null) {
    throw new Error(
      "useChartSize() called outside of viewportContext.Provider"
    );
  }
  return { width, height };
};
