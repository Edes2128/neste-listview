import * as React from "react";
import styles from "./HelloWorld.module.scss";
import { IHelloWorldWebPartProps } from "../HelloWorldWebPart";
import { ListView, ListViewService } from "m2f/lib/ListView/";
import { sp, Web, IWeb } from "@pnp/sp/presets/all";

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
const HelloWorld: React.FunctionComponent<IHelloWorldWebPartProps> = ({
  description,
  weburl,
}) => {
  const [listViewService, setlistViewService] =
    React.useState<ListViewService>(null);

  const setupListViewService = () => {
    const service = new ListViewService("edestest");
    setlistViewService(service);
  };

  React.useEffect(() => {
    setupListViewService();
  }, []);

  return (
    <>
      <ListView
        listViewService={listViewService}
        columns={[{ fieldName: "ID" }, { fieldName: "Title" }]}
      />
    </>
  );
};

export default HelloWorld;
