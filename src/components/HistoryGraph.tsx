import {LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer} from "recharts";
import config from "../../configuration.json";
import * as React from 'react'
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import dataToLine from "@/utils/dataToLine";

const COLORS = (config.graphs.colors);

const totalColour = "#941C2F"

// TODO typescript-ify
function HistoryGraph ({data, height}: {data: any, height: number}) {
    const lines = Object.keys(data[data.length - 1]).map((version, index) => (
        version !== "date" ?
        <Line
            key={version}
            type={"monotone"}
            dataKey={version}
            stroke={index > 0 ? COLORS[index - 1 % COLORS.length] : totalColour}
            strokeWidth={2}
            dot={false}
            connectNulls
        /> : undefined
    ))

    return (
      <ResponsiveContainer height={height} width={"100%"}>
      <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis interval={7} dataKey="name"  />
            <YAxis />
            <Tooltip />
            <Legend />
          {lines}
        </LineChart>
      </ResponsiveContainer>
    )
}

export default function History({history}: {history: any}) {
  const [containerHeight, setContainerHeight] = React.useState<number>(0);
  const container = React.useRef(null);
  const titleElement = React.useRef(null);

  React.useEffect(() => {
    const setHeight = () => {
      setContainerHeight(
        container.current?.parentElement?.offsetHeight - titleElement.current?.offsetHeight - 20
        // Bit of a hack to get the height of the container without thè words to put the graph in
      )
    }

    setHeight()

    addEventListener('resize', setHeight);
    return () => {
      removeEventListener('resize', setHeight);
    }
  }, [setContainerHeight, container])

  return (
    <>
      <Box ref={titleElement} sx={{display: 'flex', justifyContent: 'center'}}>
        <Typography level={"h3"}>
          30 day version history
        </Typography>
      </Box>
      <Box ref={container}>
        <HistoryGraph data={dataToLine(history)} height={containerHeight}/>
      </Box>
    </>
  )
}