import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../apollo/apolloClient";
import Layout from "../components/layout/Layout.js";
import "antd/dist/antd.css";

function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
