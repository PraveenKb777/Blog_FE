import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useSharedHistoryContext } from "./context/SharedHistoryContext";
import AutoEmbedPlugin from "./plugins/AutoEmbedPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import CodeActionMenuPlugin from "./plugins/CodeActionMenuPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import ComponentPickerPlugin from "./plugins/ComponentPickerPlugin";
import DragDropPaste from "./plugins/DragDropPastePlugin";
import DraggableBlockPlugin from "./plugins/DraggableBlockPlugin";
import EmojisPlugin from "./plugins/EmojisPlugin";
import FigmaPlugin from "./plugins/FigmaPlugin";
import FloatingLinkEditorPlugin from "./plugins/FloatingLinkEditorPlugin";
import FloatingTextFormatToolbarPlugin from "./plugins/FloatingTextFormatToolbarPlugin";
import ImagesPlugin from "./plugins/ImagesPlugin";
import InlineImagePlugin from "./plugins/InlineImagePlugin";
import KeywordsPlugin from "./plugins/KeywordsPlugin";
import LinkPlugin from "./plugins/LinkPlugin";
import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import { MaxLengthPlugin } from "./plugins/MaxLengthPlugin";
import PollPlugin from "./plugins/PollPlugin";
import SpeechToTextPlugin from "./plugins/SpeechToTextPlugin";
import TabFocusPlugin from "./plugins/TabFocusPlugin";
import { CAN_USE_DOM } from "./shared/src/canUseDOM";
// import TableCellActionMenuPlugin from "./plugins/TableActionMenuPlugin";
// import TableCellResizer from "./plugins/TableCellResizer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React from "react";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import TwitterPlugin from "./plugins/TwitterPlugin";
import YouTubePlugin from "./plugins/YouTubePlugin";
import ContentEditable from "./ui/ContentEditable";

import { useDispatch, useSelector } from "react-redux";
import { setTitle } from "../src/redux/slice/publishSlice";
import { RootState } from "../src/redux/store/store";
import AutocompletePlugin from "./plugins/AutocompletePlugin";

export default function Editor(): JSX.Element {
  const dispatch = useDispatch();

  const { historyState } = useSharedHistoryContext();
  const placeholder = null;
  // <Placeholder>{text}</Placeholder>;
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);
  const [isSmallWidthViewport, setIsSmallWidthViewport] =
    useState<boolean>(false);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport =
        CAN_USE_DOM && window.matchMedia("(max-width: 1025px)").matches;

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport);
      }
    };
    updateViewPortWidth();
    window.addEventListener("resize", updateViewPortWidth);

    return () => {
      window.removeEventListener("resize", updateViewPortWidth);
    };
  }, [isSmallWidthViewport]);

  const TitlePlugin = () => {
    const [editor] = useLexicalComposerContext();
    const onChangeTitleInput = (e: ChangeEvent<HTMLTextAreaElement>): void => {
      e.preventDefault();
      dispatch(setTitle(e.target.value));
    };

    const onKeyTitleDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter") {
        const activeElement = document.activeElement;
        const rootElement = editor.getRootElement();
        if (
          rootElement !== null &&
          (activeElement === null || !rootElement.contains(activeElement))
        ) {
          // Note: preventScroll won't work in Webkit.
          rootElement.focus({
            preventScroll: true,
          });
        }
      }
    };
    const { title } = useSelector((state: RootState) => state.publishReducer);
    console.log(title);
    return (
      <textarea
        placeholder="Title"
        value={title}
        className="title_input PlaygroundEditorTheme__h1"
        onChange={onChangeTitleInput}
        onKeyDown={onKeyTitleDown}
      />
    );
  };

  return (
    <>
      <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
      <TitlePlugin />
      <div className={`editor-container `}>
        {/* <MaxLengthPlugin maxLength={5000} /> */}
        <DragDropPaste />
        <AutoFocusPlugin />
        <ClearEditorPlugin />
        <ComponentPickerPlugin />
        {/* <EmojiPickerPlugin /> */}
        <AutoEmbedPlugin />

        {/* <MentionsPlugin /> */}
        <EmojisPlugin />
        <HashtagPlugin />
        <KeywordsPlugin />
        <SpeechToTextPlugin />
        <AutoLinkPlugin />
        <HistoryPlugin externalHistoryState={historyState} />

        <RichTextPlugin
          contentEditable={
            <div className="editor-scroller">
              <div
                className="editor"
                style={{ paddingTop: "20px" }}
                ref={onRef}
              >
                <ContentEditable />
              </div>
            </div>
          }
          placeholder={placeholder}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <CodeHighlightPlugin />
        <ListPlugin />
        <CheckListPlugin />
        <ListMaxIndentLevelPlugin maxDepth={7} />
        {/* <TablePlugin
          hasCellMerge={tableCellMerge}
          hasCellBackgroundColor={tableCellBackgroundColor}
        /> */}
        {/* <TableCellResizer /> */}
        <ImagesPlugin />
        <InlineImagePlugin />
        <LinkPlugin />
        {/* <PollPlugin /> */}
        <TwitterPlugin />
        <YouTubePlugin />
        <FigmaPlugin />
        <HorizontalRulePlugin />
        <TabFocusPlugin />
        <TabIndentationPlugin />

        {floatingAnchorElem && !isSmallWidthViewport && (
          <>
            <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
            {/* <CodeActionMenuPlugin anchorElem={floatingAnchorElem} /> */}
            <FloatingLinkEditorPlugin
              anchorElem={floatingAnchorElem}
              isLinkEditMode={isLinkEditMode}
              setIsLinkEditMode={setIsLinkEditMode}
            />
            <FloatingTextFormatToolbarPlugin anchorElem={floatingAnchorElem} />
          </>
        )}
        {/* <AutocompletePlugin /> */}
        {/* <div>{true && <TableOfContentsPlugin />}</div> */}
      </div>
    </>
  );
}
