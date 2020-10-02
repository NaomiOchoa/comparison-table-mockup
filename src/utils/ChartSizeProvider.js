import React from "react";

const chartSizeContext = React.createContext(null);

export const ChartSizeProvider = ({ children }) => {
  const aspect = 1050 / 400;

  const [width, setWidth] = React.useState(window.innerWidth - 20);
  const [height, setHeight] = React.useState(
    Math.round((window.innerWidth - 20) / aspect)
  );

  const handleWindowResize = () => {
    setWidth(window.innerWidth - 20);
    setHeight(Math.round((window.innerWidth - 20) / aspect));
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