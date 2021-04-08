import React from "react";

import Layout from "../Layout";

export default function Page (props) {
    return (
        <Layout>
            {props.children}
        </Layout>
    )
}