import {LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer} from "recharts";
import {Typography} from "@mui/material";
import config from "../../configuration.json";

const COLORS = (config.graphs.colors);

const totalColour = "#941C2F"

export default function History (props) {
    const {data} = props;
    const lines = Object.keys(data[data.length - 1]).map((version, index) => (
        version !== "date"
            ? <Line
                key={version}
                type={"monotone"}
                dataKey={version}
                stroke={index > 0 ? COLORS[index - 1 % COLORS.length] : totalColour}
                strokeWidth={2}
                dot={false}
                connectNulls
            />
            : undefined))

    return (
        <>
            <Typography variant={"h5"} align={"center"} >Version History (30 Days)</Typography>
            <ResponsiveContainer width={"100%"} aspect={16/9}>
                <LineChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis interval={7} dataKey="date"  />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {lines}
                </LineChart>
            </ResponsiveContainer>
        </>
    )
}