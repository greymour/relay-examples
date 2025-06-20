/**
 * @generated SignedSource<<4527e6308988e52ac6a831acd3d2bd06>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SidebarFragment$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"ContactsListFragment" | "ViewerProfileFragment">;
  } | null | undefined;
  readonly " $fragmentType": "SidebarFragment";
};
export type SidebarFragment$key = {
  readonly " $data"?: SidebarFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SidebarFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SidebarFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Viewer",
      "kind": "LinkedField",
      "name": "viewer",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ViewerProfileFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ContactsListFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "b4a08346270dc78c3f03164eecaaeea6";

export default node;
