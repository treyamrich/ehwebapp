import React, { useEffect, useState } from 'react';
import { Editor, EditorState, EditorBlock, getDefaultKeyBinding, RichUtils, Modifier, SelectionState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './rte.css';
import EditorToolbar from './EditorToolbar';

const Line = props => {
  const { block, contentState } = props;
  const lineNumber = contentState
    .getBlockMap()
    .toList()
    .findIndex(item => item.key === block.key) + 1;
    return (
      <div className="RE-line" data-line-number={lineNumber}>
        <div>
          <EditorBlock {...props} />
        </div>
      </div>
    );
}

const blockRendererFn = () => ({
  component: Line,
});

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
  HEADER: {
    fontSize: 28
  },
  SUBHEAD: {
    fontSize: 24
  },
  TEXT: {
    fontSize: 16
  }
};
const getBlockStyle = block => {
  switch(block.getType()) {
    case 'center': return 'RE-align-center';
    case 'left': return 'RE-align-left';
    case 'right': return 'RE-align-right';
    default: return null;
  }
}

const RTE = ({ lineLimit }) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty(),);
  const editor = React.useRef();
  lineLimit = 5;

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return true;
    }
    return false;
  }
  const mapKeyToEditorCommand = e => {
    if(e.keyCode === 9) { //TAB
      const newEditorState = RichUtils.onTab(e, editorState, 4);
      if(newEditorState !== editorState) {
        setEditorState(newEditorState);
      }
      return;
    } else if(e.keyCode === 13) { //Enter
      if(contentState.getBlockMap().size === lineLimit) return;
    }
    return getDefaultKeyBinding(e);
  }
  const toggleBlockType = blockType => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  }
  const toggleInlineStyle = inlineStyle => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  }
  const changeFont = (prevFont, newFont) => {
    const removeState = RichUtils.toggleInlineStyle(editorState, prevFont);
    const newState = RichUtils.toggleInlineStyle(removeState, newFont);
    setEditorState(newState);
  }
  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.
  let className = 'RichEditor-editor';
  const selection = editorState.getSelection();
  let contentState = editorState.getCurrentContent();

  

  useEffect(()=> console.log(contentState.getBlockMap()), [editorState]);
  return (
    <div className="RichEditor-root">
      <EditorToolbar
        editorState={editorState}
        toggleBlockType={toggleBlockType}
        toggleInlineStyle={toggleInlineStyle}
        changeFont={changeFont}
      />
      <div className={className} onClick={()=>editor.current.focus()}>
        <Editor 
          editorState={editorState} 
          onChange={setEditorState}
          spellCheck={true}
          ref={editor}
          blockStyleFn={getBlockStyle}
          blockRendererFn={blockRendererFn}
          customStyleMap={styleMap}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
        />
        {!contentState.hasText() && (
          <div className="RE-ph-container">
            <div className="RE-ph">Write your creative message here...</div>
          </div>
        )}
      </div>
      <div className="text-right">
        <p className="text-sm mt-3" style={{color: '#C39F7F'}}>
          Lines: {contentState.getBlockMap().size}{`${lineLimit ? ' / ' + lineLimit : ''}`}
        </p>
      </div>
    </div>
  );
}

export default RTE;