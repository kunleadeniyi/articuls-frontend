import React, { useState } from "react";
import { DraftailEditor } from "draftail";
import { EditorState } from "draft-js";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
import createSideToolbarPlugin from "draft-js-side-toolbar-plugin";

import "./AddComment.css";
import "draft-js/dist/Draft.css";
import "draftail/dist/draftail.css";
import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import "draft-js-side-toolbar-plugin/lib/plugin.css";
import config from "../../utils/config";
import { Button, Container } from "react-bootstrap";
// import { stateToHTML } from "draft-js-export-html";
import { useHistory, useParams } from "react-router-dom";
// import Login from "../Login/Login";
import Auth from "../../utils/authenticate";

const axios = require('axios');

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

const sideToolbarPlugin = createSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;

const plugins = [inlineToolbarPlugin, sideToolbarPlugin];

function AddComment(props) {
  const {articleId} = useParams()

  const [bodyState, setBodyState] = useState(EditorState.createEmpty());

  let history = useHistory()

  function changeBodyState(state) {
    setBodyState(state);
  }

  function resetState() {
    setBodyState(EditorState.createEmpty())
  };

  const save = (e) => {
    e.preventDefault()
    if (!bodyState.getCurrentContent().hasText()) {
        return alert('Cannot create empty comment')
    }

    if (!Auth.getAuth()) {
      return alert('Log in to create comment')
    }
    
    const request = {
        body: bodyState.getCurrentContent().getPlainText()
    }
    
    axios
    .post(`${config().baseUrl}/articles/${articleId}/comments`, request, config().headers)
    .then(res => {
        history.go()
    })
    .catch(err => {
        console.log(err.message)
        resetState()
    })
  }


  return (
    <div>
      <Container fluid>
        <div>
          <DraftailEditor
            editorState={bodyState}
            onChange={changeBodyState}
            placeholder="Add Comment..."
            plugins={plugins}
          />
          <InlineToolbar />
          <SideToolbar />
          <Button variant="outline-info" onClick={save} className='utility-button'>Post Comment</Button>
        </div>
      </Container>
    </div>
  );
}

export default AddComment;
