import { useEffect } from "react";
import * as echarts from "echarts";

const useEChart = (ref, getOption, deps = []) => {
  useEffect(() => {
    if (!ref.current) return;

    if (echarts.getInstanceByDom(ref.current)) {
      echarts.dispose(ref.current);
    }

    const instance = echarts.init(ref.current);
    instance.setOption(getOption());

    const resizeHandler = () => instance.resize();
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      instance.dispose();
    };
  }, deps);
};

export default useEChart;
