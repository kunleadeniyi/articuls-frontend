import React, { useState, useEffect } from "react";
import { DraftailEditor } from "draftail";
import { EditorState, convertFromHTML, ContentState } from "draft-js";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
import createSideToolbarPlugin from "draft-js-side-toolbar-plugin";

import "./Edit.css";
import "draft-js/dist/Draft.css";
import "draftail/dist/draftail.css";
import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import "draft-js-side-toolbar-plugin/lib/plugin.css";
import config from "../../utils/config";
import { Button, Container, Row, Col } from "react-bootstrap";
import { stateToHTML } from "draft-js-export-html";
import { useHistory, Link, useParams } from "react-router-dom";
// import Login from "../Login/Login";
import Auth from "../../utils/authenticate";

const axios = require('axios');

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

const sideToolbarPlugin = createSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;

const plugins = [inlineToolbarPlugin, sideToolbarPlugin];

function Edit(props) {
  
  let {articleId} = useParams();
  const [titleState, setTitleState] = useState(EditorState.createEmpty());
  const [bodyState, setBodyState] = useState(EditorState.createEmpty());
  
  const [currentArticle, setCurrentArticle] = useState({});

  useEffect(() => {
    async function getArticle() {
      const response = await axios.get(`${config().baseUrl}/articles/${articleId}`, config().headers)
      setCurrentArticle(response.data)
      
      const h = convertFromHTML(response.data.title)
      const j = convertFromHTML(response.data.body)
      
      const t1 = ContentState.createFromBlockArray(
        h.contentBlocks,
        h.entityMap,
      )
      const t2 = ContentState.createFromBlockArray(
        j.contentBlocks,
        j.entityMap,
      )
      setTitleState(EditorState.createWithContent(t1))
      setBodyState(EditorState.createWithContent(t2))  
    }
    getArticle();

  }, [articleId])

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

  const edit = (e) => {
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
    .put(`${config().baseUrl}/articles/${articleId}`, request, config().headers)
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
          <InlineToolbar />
          <SideToolbar />
        </div>
        <div>
          <DraftailEditor
            editorState={bodyState}
            onChange={changeBodyState}
            placeholder="Tell your story..."
            plugins={plugins}
          />
          <InlineToolbar />
          <SideToolbar />
        </div>
        <Button onClick={edit} className='utility-button'>Save</Button>
      </Container>
    </div>
  );
}

export default Edit;
