import * as React from "react";
import styles from "./HelloWorld.module.scss";
import { IHelloWorldWebPartProps } from "../HelloWorldWebPart";
import { ListView, ListViewService } from "m2f/lib/ListView/";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/files/web";
import Slider from "react-slick";
import "./slick.scss";
import "./slick-theme.css";
import { sp } from "@pnp/sp";
import FileViewer from "react-file-viewer";
import SingleFile from "./SingleFile";

const HelloWorld: React.FunctionComponent<IHelloWorldWebPartProps> = ({
  carouselTime,
  itemsLength,
  listName,
  multiselectvalue,
  heightPdf,
}) => {
  let slider: any = React.useRef();

  React.useEffect(() => {
    console.log(listName);
  }, [listName]);

  const next = () => {
    slider.current.slickNext();
  };
  const previous = () => {
    slider.current.slickPrev();
  };

  const [items, setItems] = React.useState<any>([]);
  const [modal, openModal] = React.useState<boolean>(false);
  const [single, setSingle] = React.useState<string>("");
  // const [listViewService, setlistViewService] =
  //   React.useState<ListViewService>(null);

  // const setupListViewService = () => {
  //   const service = new ListViewService("edestest");
  //   setlistViewService(service);
  // };

  // React.useEffect(() => {
  //   setupListViewService();
  // }, []);

  // sp.web.lists.filter("BaseTemplate eq 101").get().then(res => {
  //   console.log(res)
  // })

  const getItems = () => {
    setItems([]);
    if (multiselectvalue.length !== 0) {
      setTimeout(() => {
        multiselectvalue.forEach((item) => {
          let path = item.split("/");
          sp.web
            .getFolderByServerRelativeUrl(path[3])
            .files.top(
              itemsLength === "" ||
                itemsLength === null ||
                itemsLength === undefined
                ? 10
                : itemsLength
            )
            .get()
            .then((res) => {
              res.forEach((item2) => {
                setItems((prev) => [...prev, item2]);
              });
            });
        });
      }, 1000);
    }

    // if(lists){
    //   var path = lists.split("/");
    // }

    // sp.web
    //   .getFolderByServerRelativeUrl("PdfList")
    //   .files.expand("ListItemAllFields", "Author")
    //   .top(itemsLength === "" ? 10 : itemsLength)
    //   .get()
    //   .then((res) => {
    //     setItems(res);
    //   });
  };

  React.useEffect(() => {
    getItems();
  }, [itemsLength, multiselectvalue]);

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: carouselTime * 1000,
    autoplay: true,
  };

  return (
    <>
      {modal && <SingleFile url={single} closeModal={() => openModal(false)} />}

      {/* <ListView
        listViewService={listViewService}
        columns={[
          { fieldName: "ID" },
          { fieldName: "Title" },
          { fieldName: "Author" },
          { fieldName: "TestLookup" },
        ]}
      /> */}
      {multiselectvalue?.length === undefined ||
      multiselectvalue === undefined ||
      multiselectvalue.length === 0 ? (
        <h1>Select some or one list</h1>
      ) : (
        <div
          style={{
            maxHeight:
              heightPdf === "" ||
              heightPdf === null ||
              heightPdf === undefined ||
              heightPdf === "0"
                ? "800px"
                : `${heightPdf}px`,
            overflow: "hidden",
            width: "100%",
          }}
        >
          <button
            style={{
              position: "absolute",
              top: "50%",
              left: "20px",
              zIndex: 1,
              background: "black",
              border: 0,
              outline: "none",
              height: "50px",
              width: "50px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            onClick={previous}
          >
            <svg
              onClick={previous}
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="20"
              viewBox="0 0 18 20"
              className=" prev-btn"
            >
              <path
                id="Polygon_2"
                data-name="Polygon 2"
                d="M10,0,20,18H0Z"
                transform="translate(0 20) rotate(-90)"
                fill="#fff"
              />
            </svg>
          </button>
          <button
            style={{
              position: "absolute",
              top: "50%",
              right: "20px",
              zIndex: 1,
              background: "black",
              border: 0,
              outline: "none",
              height: "50px",
              width: "50px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            onClick={next}
          >
            <svg
              onClick={next}
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="20"
              viewBox="0 0 18 20"
              className=" next-btn"
            >
              <path
                id="Polygon_1"
                data-name="Polygon 1"
                d="M10,0,20,18H0Z"
                transform="translate(18) rotate(90)"
                fill="#fff"
              />
            </svg>
          </button>
          {items.length !== 0 && (
            <Slider {...settings} ref={(c) => (slider.current = c)}>
              {items.map((item) => (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSingle(item.ServerRelativeUrl);
                    openModal(true);
                  }}
                >
                  <FileViewer
                    fileType={"pdf"}
                    filePath={`https://progesoftware.sharepoint.com/${item.ServerRelativeUrl}`}
                  />
                </div>
              ))}
            </Slider>
          )}
        </div>
      )}
    </>
  );
};

export default HelloWorld;
