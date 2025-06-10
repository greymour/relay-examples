import * as React from "react";
import { graphql } from "relay-runtime";
import { PreloadedQuery, useFragment, usePreloadedQuery } from "react-relay";
import LoadingSpinner from "./LoadingSpinner";
import type { SidebarQuery as SidebarQueryType, SidebarQuery$data } from "./__generated__/SidebarQuery.graphql";
import ViewerProfile from "./ViewerProfile";
import ContactsList from "./ContactsList";
import { SidebarFragment$key } from "./__generated__/SidebarFragment.graphql";

export const SidebarQuery = graphql`
  query SidebarQuery {
    ...SidebarFragment
  }
`;

const SidebarFragment = graphql`
	fragment SidebarFragment on Query {
    viewer {
      ...ViewerProfileFragment
      ...ContactsListFragment
    }
	}
`;

interface SidebarProps {
  queryRef: PreloadedQuery<SidebarQueryType>;
}

export default function Sidebar({ queryRef }: SidebarProps) {
  const sidebarQuery = usePreloadedQuery(SidebarQuery, queryRef);
  return (
    <div className="sidebar">
      <React.Suspense fallback={<LoadingSpinner />}>
        <SidebarContents fragmentRef={sidebarQuery} />
      </React.Suspense>
    </div>
  );
}


interface SidebarContentsProps {
  fragmentRef: SidebarQuery$data;
}

function SidebarContents({ fragmentRef }: SidebarContentsProps) {
  const data = useFragment<SidebarFragment$key>(SidebarFragment, fragmentRef);
  return !data?.viewer ? null : (
    <>
      <ViewerProfile viewer={data.viewer} />
      <ContactsList viewer={data.viewer} />
    </>
  );
}
