import * as React from "react";
import { ConnectionHandler, graphql } from "relay-runtime";
import { useFragment, useMutation } from "react-relay";

import type { StoryCommentsComposerFragment$key } from "./__generated__/StoryCommentsComposerFragment.graphql";

const { useState } = React;

export type Props = {
  story: StoryCommentsComposerFragment$key;
};

const StoryCommentsComposerFragment = graphql`
  fragment StoryCommentsComposerFragment on Story {
    id
  }
`;

const StoryCommentsComposerPostMutation = graphql`
	mutation StoryCommentsComposerPostMutation(
    $id: ID!,
    $text: String!,
    $connections: [ID!]!,
	) {
    postStoryComment(id: $id, text: $text) {
      commentEdge
        @prependEdge(connections: $connections)
      {
        node {
          id
          text
        }
      }
    }
	}
`;


export default function StoryCommentsComposer({ story }: Props) {
  const data = useFragment(StoryCommentsComposerFragment, story);
  const [text, setText] = useState("");
  const [commitMutation, isMutationInFlight] = useMutation(StoryCommentsComposerPostMutation);

  function onPost() {
    setText(''); // Reset the UI
    const connectionID = ConnectionHandler.getConnectionID(data.id, 'StoryCommentsSectionFragment_comments');
    commitMutation({
      variables: {
        id: data.id,
        text,
        connections: [connectionID],
      },
    });
  }
  return (
    <div className="commentsComposer">
      <TextComposer text={text} onChange={setText} onReturn={onPost} disabled={isMutationInFlight} />
      <PostButton onClick={onPost} disabled={isMutationInFlight || text === ''} />
    </div>
  );
}

function TextComposer({
  text,
  onChange,
  onReturn,
  disabled = false,
}: {
  text: string;
  onChange: (newValue: string) => void;
  onReturn: () => void;
  disabled?: boolean;
}) {
  return (
    <input
      value={text}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          onReturn();
        }
      }}
      disabled={disabled}
    />
  );
}

function PostButton({ onClick, disabled = false }: { onClick: () => void, disabled?: boolean }) {
  return <button onClick={onClick} disabled={disabled}>Post</button>;
}
