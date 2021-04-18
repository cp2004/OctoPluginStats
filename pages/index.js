import * as React from 'react';
import Layout from "../components/Layout";

import PluginStats from "../components/PluginStats"

import stats from "../data/stats.json"
import config from "../configuration"

export default function Index() {
        return (
        <Layout>
            <PluginStats stats={stats} plugins={config.plugins} />
        </Layout>
    );
}
