import * as React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
// APP
import Layout from "../components/layout";
import Seo from "../components/seo";

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <h1>Hello Creative Coder</h1>
    <p>Let's go to jump in a generative world of P5JS!</p>
    <p>Template P5JS / Gatsby</p>
    <p>version 0.0.1</p>
  </Layout>
);

export default IndexPage;
