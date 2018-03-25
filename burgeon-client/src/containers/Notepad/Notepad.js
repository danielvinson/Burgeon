import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

import BlockStyleControls from './BlockStyleControls.js';
import InlineStyleControls from './InlineStyleControls.js';

import './Notepad.css';

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

class Notepad extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: null };
    
    this.focus = () => this.refs.editor.focus();
    
    this.onChange = (editorState) => this.setState({editorState});

    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    this.getBlockStyle = this._getBlockStyle.bind(this);
    this.handleSaveNotepad = this._handleSaveNotepad.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    // Check if we have a saved Notepad and load it, else create an empty one
    const taskId = nextProps.taskId;
    console.log(taskId);

    if (taskId && (taskId != this.state.currentTask)){
      this.props.reloadTask(taskId).then(() => {
        
        const task = this.props.tasks[taskId];
        console.log(task);
        
        let editorState = null;
        if (task.notepad && task.notepad != ''){
          const contentState = convertFromRaw(JSON.parse(task.notepad));
          editorState = EditorState.createWithContent(contentState);
          console.log('editor loaded');
        } else {
          editorState = EditorState.createEmpty();
          console.log('empty editor created');
        }
        this.setState({editorState: editorState, currentTask: taskId });
      });
    }
  }
  
  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
  
  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4, /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  _getBlockStyle(block) {
    switch (block.getType()) {
      case 'blockquote': return 'RichEditor-blockquote';
      default: return null;
    }
  }
  
  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }
  
  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }
  
  _handleSaveNotepad() {
    console.log('test');
    console.log(this.state.editorState);
    const editorState = this.state.editorState;
    const contentState = editorState.getCurrentContent();
    const contentString = JSON.stringify(convertToRaw(contentState));
    this.props.updateNotepad(this.state.currentTask, contentString).then(() => {
      console.log('content saved');
    });
  }
  
  
  render() {
    const {editorState} = this.state;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    if (editorState){
      
      var contentState = editorState.getCurrentContent();
      if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
          className += ' RichEditor-hidePlaceholder';
        }
      }
      
    }

    return (
      <div className="Notepad">
        {editorState ? (
        <div className="RichEditor-root">
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <div 
            className="saveButton" 
            onClick={this.handleSaveNotepad}
          >
            <span>Save Changes</span>
          </div>
          <div className={className} onClick={this.focus}>
            <Editor
              blockStyleFn={this.getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={this.mapKeyToEditorCommand}
              onChange={this.onChange}
              placeholder="Take some notes..."
              ref="editor"
              spellCheck={true}
            />
          </div>
        </div>
        ) : (<div>Loading...</div>)}
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user,
  tracks: state.tracks,
  goals: state.goals,
  tasks: state.tasks
});

const mapDispatch = dispatch => ({
  createAlert: data => dispatch.alerts.create(data),
  
  reloadTask: id => dispatch.tasks.reloadTask({'task_id': id}),
  updateNotepad: (task_id, content) => dispatch.tasks.updateTask({'notepad': content, 'task_id': task_id})
});

export default connect(mapState, mapDispatch)(Notepad);
