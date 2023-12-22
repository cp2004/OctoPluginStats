import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
  Pie,
  Cell,
  PieChart
} from "recharts";
import config from "../../configuration.json";
import * as React from 'react'
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import dataToPie from "@/utils/dataToPie";

const COLORS = (config.graphs.colors);

const textFormatter = (value: number) => <span>v{value}</span>
const tooltipFormatter = (value: number, name: string) => [value, "v" + name]

function VersionGraph ({data, height}: {data: any, height: number}) {
  return (
    <ResponsiveContainer height={height} width={"100%"}>
      <PieChart >
        <Pie label paddingAngle={0.7} data={data} dataKey={"value"} nameKey={"version"} isAnimationActive={false} >
          {data.map((entry, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={tooltipFormatter}/>
        <Legend formatter={textFormatter}/>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default function Versions({title, versions, total}: {title: string, versions: any, total: number}) {
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
      <Box ref={titleElement} sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        <Typography level="h2">
          {title}
        </Typography>
        <Typography level={"title-lg"}>
          {total} instances
        </Typography>
      </Box>
      <Box ref={container}>
        <VersionGraph data={dataToPie(versions)} height={containerHeight}/>
      </Box>
    </>
  )
}