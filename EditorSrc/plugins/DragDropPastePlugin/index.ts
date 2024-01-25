import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { DRAG_DROP_PASTE } from "@lexical/rich-text";
import { isMimeType, mediaFileReader } from "@lexical/utils";
import { COMMAND_PRIORITY_LOW } from "lexical";
import { useEffect } from "react";

import { INSERT_IMAGE_COMMAND } from "../ImagesPlugin";
import axios from "axios";
import ENV from "../../../src/utils/env";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../../../src/redux/slice/errorSlice";
import { setImageList } from "../../../src/redux/slice/editorSlice";

const ACCEPTABLE_IMAGE_TYPES = [
  "image/",
  "image/heic",
  "image/heif",
  "image/gif",
  "image/webp",
];

export default function DragDropPaste(): null {
  const [editor] = useLexicalComposerContext();
  const dispatch = useDispatch();
  useEffect(() => {
    return editor.registerCommand(
      DRAG_DROP_PASTE,
      (files) => {
        (async () => {
          dispatch(setGlobalLoading(true));
          const filesResult = await mediaFileReader(
            files,
            [ACCEPTABLE_IMAGE_TYPES].flatMap((x) => x)
          );
          for (const { file, result } of filesResult) {
            if (isMimeType(file, ACCEPTABLE_IMAGE_TYPES)) {
              console.log(file, result);
              const formData = new FormData();
              formData.append("image", files[0]);
              try {
                const response = await axios.post<{
                  message: string;
                  url: string;
                }>(`${ENV.baseUrl}/image`, formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                });
                const data = await response.data;
                dispatch(setImageList(data.url));
                editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                  altText: file.name,
                  src: data.url,
                });
              } catch (error) {
                console.log("image upload error", error);
              } finally {
                dispatch(setGlobalLoading(false));
              }
            }
          }
        })();
        return true;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [dispatch, editor]);
  return null;
}
