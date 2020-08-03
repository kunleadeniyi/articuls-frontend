import React, { useState } from "react";
import { DraftailEditor } from "draftail";
import { EditorState } from "draft-js";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
import createSideToolbarPlugin from "draft-js-side-toolbar-plugin";

import "./Create.css";
import "draft-js/dist/Draft.css";
import "draftail/dist/draftail.css";
import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import "draft-js-side-toolbar-plugin/lib/plugin.css";
import config from "../../utils/config";
import { Button, Container, Row, Col } from "react-bootstrap";
import { stateToHTML } from "draft-js-export-html";
import { useHistory, Link } from "react-router-dom";
// import Login from "../Login/Login";
import Auth from "../../utils/authenticate";

const axios = require('axios');

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

const sideToolbarPlugin = createSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;

const plugins = [inlineToolbarPlugin, sideToolbarPlugin];

function Create(props) {
  const [titleState, setTitleState] = useState(EditorState.createEmpty());
  const [bodyState, setBodyState] = useState(EditorState.createEmpty());

  const [titleEditorContentHtml, setTitleEditorContentHtml] = useState(``);
  const [bodyEditorContentHtml, setBodyEditorContentHtml] = useState(``);

  let history = useHistory()

  function changeTitleState(state) {
    setTitleState(state);
    setTitleEditorContentHtml(stateToHTML(state.getCurrentContent()));
    // console.log(titleEditorContentHtml);
  }

  function changeBodyState(state) {
    setBodyState(state);
    setBodyEditorContentHtml(stateToHTML(state.getCurrentContent()));
    // console.log(contentState.getPlainText('.'));
  }

  function resetState() {
    setTitleEditorContentHtml(null)
    setBodyEditorContentHtml(null)
  };

  const save = (e) => {
    e.preventDefault()
    if (!titleState.getCurrentContent().hasText()) {
        return alert('Fill title field.')
    }
    if (!bodyState.getCurrentContent().hasText()) {
        return alert('Tell your story.')
    }
    
    const request = {
        title: titleEditorContentHtml,
        body: bodyEditorContentHtml
    }

    axios
    .post(`${config().baseUrl}/articles`, request, config().headers)
    .then(res => {
        // console.log(res);
        history.push(`/home/${res.data._id}`)
    })
    .catch(err => {
        console.log(err.message)
        resetState()
    })
  }

  const logout = () => {
    Auth.signout()
    localStorage.removeItem('token')
    history.push('/home')
  }

  return (
    <div>
      <Container fluid style={{padding: "2% 5%"}}> 
          {/* Show Login button if user is not logged in {!Auth.getAuth()=undefined}  */}
          <Row>
              <Col xs={4} md={4}><Link to={"/home"}><h1 style={{color:'black'}} className='title'>Articuls</h1></Link></Col>
              <Col xs={{ span: 8, offset: 0 }} md={{ span: 4, offset: 4 }}>
                  <Button className="float-sm-right" style={{'margin':"5px", float:'right'}} onClick={logout}>Logout</Button>
              </Col>
          </Row>
      </Container>
      <Container fluid>
        <div className="App">
          <DraftailEditor
            editorState={titleState}
            onChange={changeTitleState}
            placeholder="errr ...Title?"
            plugins={plugins}
          />
          {/* <InlineToolbar />
          <SideToolbar /> */}
        {/* </div>
        <div> */}
          <DraftailEditor
            editorState={bodyState}
            onChange={changeBodyState}
            placeholder="Tell your story..."
            plugins={plugins}
          />
          <InlineToolbar />
          <SideToolbar />
        </div>
        <Button onClick={save} className='utility-button'>Publish!</Button>
      </Container>
    </div>
  );
}

export default Create;
