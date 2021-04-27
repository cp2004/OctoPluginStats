import {ResponsiveContainer, PieChart, Pie, Tooltip, Legend, Cell} from "recharts";
import Typography from "@material-ui/core/Typography";

import config from "../../configuration.mjs";

const COLORS = config.graphs.colors;

const textFormatter = (value) => <span>v{value}</span>

const tooltipFormatter = (value, name) => [value, "v" + name]

export default function Chart (props) {
    const {data} = props
    return (
        <>
            <Typography variant={"h6"} align={"center"}>
                Seen Versions
            </Typography>
            <ResponsiveContainer width={"100%"} aspect={16/9}>
                <PieChart >
                    <Pie label paddingAngle={0.7} data={data} dataKey={"value"} nameKey={"version"} isAnimationActive={false} >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={tooltipFormatter}/>
                    <Legend formatter={textFormatter}/>
                </PieChart>
            </ResponsiveContainer>
        </>
    )
}
