import * as React from "react";
import RelayEnvironment from "../relay/RelayEnvironment";
import Newsfeed from "./Newsfeed";
import LoadingSpinner from "./LoadingSpinner";
import Sidebar from "./Sidebar";
import { graphql } from "relay-runtime";
import { useQueryLoader } from "react-relay";
import type { AppQuery as AppQueryType } from "./__generated__/AppQuery.graphql";

const AppQuery = graphql`
  query AppQuery {
   ...NewsfeedFragment
   ...SidebarFragment
  }
`;

export default function App(): React.ReactElement {
  return (
    <RelayEnvironment>
      <React.Suspense
        fallback={
          <div className="app-loading-spinner">
            <LoadingSpinner />
          </div>
        }
      >
        <div className="app">
          <Page />
        </div>
      </React.Suspense>
    </RelayEnvironment>
  );
}

const Page = () => {
  const [appQueryRef, loadAppQuery] = useQueryLoader<AppQueryType>(AppQuery);
  React.useEffect(() => {
    loadAppQuery({});
    return () => {
      // appQueryRef && !appQueryRef.isDisposed ?.dispose();
    }
  }, []);
  console.log('Page data: ', appQueryRef);
  return !appQueryRef ? null : (
    <>
      <Newsfeed queryRef={appQueryRef} />
      <Sidebar queryRef={appQueryRef} />
    </>
  );
}
