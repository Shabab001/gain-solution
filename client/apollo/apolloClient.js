import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { useMemo } from "react";

let apolloClient;

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: "http://localhost:4000/graphql",
    }),
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  if (typeof window === "undefined") {
    return _apolloClient;
  }
  apolloClient = apolloClient ?? _apolloClient;
  return apolloClient;
};

export const useApollo = initialState => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};
