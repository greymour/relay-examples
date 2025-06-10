import * as React from "react";
import { type PreloadedQuery, usePaginationFragment, usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";
import InfiniteScrollTrigger from "./InfiniteScrollTrigger";
import Story from "./Story";
import type { NewsfeedQuery as NewsfeedQueryType } from "./__generated__/NewsfeedQuery.graphql";

export const NewsfeedQuery = graphql`
  query NewsfeedQuery {
    ...NewsfeedFragment
  }
`;

const NewsfeedFragment = graphql`
	fragment NewsfeedFragment on Query
  @refetchable(queryName: "NewsfeedRefetchQuery")
  @argumentDefinitions(
    cursor: { type: "String" }
    count: { type: "Int", defaultValue: 3 }
  )
  {
    viewer {
      newsfeedStories(after: $cursor, first: $count)
      @connection(key: "NewsfeedFragment_newsfeedStories")
      {
        edges {
          node {
            id
            ...StoryFragment
          }
        }
      }
    }
	}
`;

interface Props {
  queryRef: PreloadedQuery<NewsfeedQueryType>;
}

export default function Newsfeed({ queryRef }: Props) {
  const newsfeedQuery = usePreloadedQuery(NewsfeedQuery, queryRef);
  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment(NewsfeedFragment, newsfeedQuery);

  const onEndReached = () => {
    loadNext(1);
  }

  return (
    <div className="newsfeed">
      {data?.viewer?.newsfeedStories.edges?.map(storyEdge => <Story key={storyEdge.node.id} story={storyEdge.node} />)}
      <InfiniteScrollTrigger
        onEndReached={onEndReached}
        hasNext={hasNext}
        isLoadingNext={isLoadingNext}
      />
    </div>
  );
}
