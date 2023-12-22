"use client"
import * as React from 'react';
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import TwoSidedLayout from "@/components/TwoSidedLayout";
import HistoryGraph from "@/components/HistoryGraph";
import stats from "@/data/stats.json";
import config from "../../configuration.json"
import Versions from "@/components/VersionGraph";


export default function Index() {
  const entries = Object.keys(stats).map(plugin =>
      <TwoSidedLayout
        key={plugin}
        left={<Versions title={config.plugins[plugin]} versions={stats[plugin].versions} total={stats[plugin].total} />}
        right={<HistoryGraph history={stats[plugin].history} />}
      />
  )

  return (
    <>
      {entries}
    </>
  );
}
