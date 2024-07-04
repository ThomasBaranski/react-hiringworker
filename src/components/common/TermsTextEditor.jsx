import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from "draft-convert";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";
import {
  useEditTermMutation,
  usePrivacyQuery,
} from "../../redux/services/term&condition.service";

const TermTextEditor = () => {
  const { data, isFetching } = usePrivacyQuery();
  const [editTerm, { isLoading }] = useEditTermMutation();
  const [convertedContent, setConvertedContent] = useState();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  function onEditorStateChange(state) {
    setEditorState(state);
    convertContentToHTML();
  }
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };
  useEffect(() => {
    setConvertedContent(data?.[0]?.terms_and_condition);
    setEditorState(
      EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(data?.[0]?.terms_and_condition)
        )
      )
    );
  }, [data]);
  async function handleEdittorSave() {
    await editTerm([
      data?.[0]?.id,
      {
        terms_and_condition: convertedContent,
      },
    ]);
    toast.success("Terms and Policy edited successfuly");
  }
  return (
    <>
      <Box border="1px solid #000" paddingX>
        <Editor
          // defaultEditorState={values.description}
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            options: [
              "inline",
              "blockType",
              "fontSize",
              "list",
              "textAlign",
              "history",
            ],
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <LoadingButton
          onClick={handleEdittorSave}
          loading={isLoading}
          variant="contained"
          sx={{
            width: {
              sm: "300px",
              height: "60px",
              borderRadius: "16px",
              fontSize: "24px",
              fontWeight: "700",
            },
          }}
        >
          Save
        </LoadingButton>
      </Box>
    </>
  );
};

export default TermTextEditor;
