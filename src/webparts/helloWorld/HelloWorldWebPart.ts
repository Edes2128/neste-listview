import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
} from "@microsoft/sp-property-pane";
import {
  BaseClientSideWebPart,
  WebPartContext,
} from "@microsoft/sp-webpart-base";
import { PropertyFieldMultiSelect } from "@pnp/spfx-property-controls/lib/PropertyFieldMultiSelect";

// import { IDropdownOption } from "@fluentui/react/lib/components/Dropdown";
import { IDropdownOption } from "office-ui-fabric-react/lib/components/Dropdown";
import { update, get } from "@microsoft/sp-lodash-subset";
import * as strings from "HelloWorldWebPartStrings";
import HelloWorld from "./components/HelloWorld";
import { setup as pnpSetup } from "@pnp/common";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/files";
import "@pnp/sp/folders";
export interface IHelloWorldWebPartProps {
  carouselTime: number;
  context: WebPartContext;
  weburl: string;
  listOptions: any;
  itemsLength: any;
  listName: any[];
  multiselectvalue: string[];
  heightPdf: string;
}
export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IHelloWorldWebPartProps> =
      React.createElement(HelloWorld, {
        carouselTime: this.properties.carouselTime,
        context: this.context,
        weburl: this.context.pageContext.web.absoluteUrl,
        listOptions: this.properties.listOptions,
        itemsLength: this.properties.itemsLength,
        listName: this.properties.listName,
        multiselectvalue: this.properties.multiselectvalue,
        heightPdf: this.properties.heightPdf,
      });
    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return super.onInit().then((_) => {
      pnpSetup({
        spfxContext: this.context,
      });
    });
  }

  protected getItems(): void {
    sp.web.folders.get().then((res) => {
      this.properties.listOptions = res.map((item) => {
        return { key: item.ServerRelativeUrl, text: item.Name };
      });
    });
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    sp.web.folders.get().then((res) => {
      this.properties.listOptions = res.map((item) => {
        return { key: item.ServerRelativeUrl, text: item.Name };
      });
    });

    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("heightPdf", {
                  label: strings.HeightPDF,
                }),
                PropertyPaneTextField("carouselTime", {
                  label: strings.CarouselTime,
                }),
                PropertyPaneTextField("itemsLength", {
                  label: strings.ItemsNumber,
                }),
                PropertyFieldMultiSelect("multiselectvalue", {
                  key: "multiselectvalue",
                  label: "Select Document Libraries",
                  options: this.properties.listOptions,
                  selectedKeys: this.properties.multiselectvalue,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
