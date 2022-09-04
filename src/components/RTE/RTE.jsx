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

const RTE = ({ lineLimit, lineLenLimit }) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty(),);
  const editor = React.useRef();
  lineLimit = 5;
  lineLenLimit = 10;

  let className = 'RichEditor-editor';
  let contentState = editorState.getCurrentContent();
  let selection = editorState.getSelection();

  const appendNewLine = () => {
    let lblock = contentState.getLastBlock();
    contentState = Modifier.splitBlock(contentState,
      new SelectionState({
        anchorKey: lblock.key,
        focusKey: lblock.key,
        anchorOffset: lblock.text.length,
        focusOffset: lblock.text.length,
      })  
    );

    return {newState: EditorState.createWithContent(contentState), 
      nxtBlkKey: contentState.getLastBlock().key};
  }
  const updateSelection = (editorState, nxtBlkKey) => {
    const newSel = new SelectionState({
      anchorKey: nxtBlkKey,
      anchorOffset: 0,
      focusKey: nxtBlkKey,
      focusOffset: 0
    });
    return EditorState.forceSelection(
      editorState,
      newSel
    );
  }
  const handleBlkOverflow = (curBlk, insTxt) => {
    //Check if inserting space at end of line
    if(insTxt === ' ' && selection.getEndOffset() === curBlk.text.length) 
      return editorState;

    let blkArr = contentState.getBlockMap().toArray();
    let blkIdx = 0;
    let lwfc;

    //Trav the rest of the blocks
    for(blkIdx; blkIdx < blkArr.length; blkIdx++)
      if(blkArr[blkIdx] === curBlk) break;
    
    for(blkIdx; blkIdx < blkArr.length; blkIdx++) {
      //Get the last word's first char in block
      lwfc = lineLenLimit;
      for(lwfc; lwfc >= 0; lwfc--)
        if(blkArr[blkIdx].text[lwfc] === ' ') break;

      //Since the entire line is a word, add the insTxt to beginning of 
      //next line with a space after it
      if(lwfc === 0) console.log("a");
    
      //If at the last block and is full, add another block
      let newLineRes;
      if(blkIdx === blkArr.length - 1 && blkArr[blkIdx].text.length >= lineLenLimit) {
        newLineRes = appendNewLine();
        contentState = newLineRes.newState.getCurrentContent();
        blkArr = contentState.getBlockMap().toArray();
      }

      //Remove word from current block
      contentState = Modifier.replaceText(
        contentState,
        new SelectionState({
          anchorKey: blkArr[blkIdx].key,
          focusKey: blkArr[blkIdx].key,
          anchorOffset: lwfc,
          focusOffset: lineLenLimit,
        }),
        ""
      );

      //Insert word to next block
      contentState = Modifier.insertText(
        contentState,
        new SelectionState({
          anchorKey: blkArr[blkIdx+1].key,
          focusKey: blkArr[blkIdx+1].key,
          anchorOffset: 0,
          focusOffset: 0
        }),
        blkArr[blkIdx].text.slice(lwfc, lineLenLimit)
      );

      if(newLineRes) break;
      blkArr = contentState.getBlockMap().toArray();
    }
    return EditorState.createWithContent(contentState);
  }
  const handleBeforeInput = (char) => {
    //Get block from selection
    const selKey =  selection.getEndKey();
    const curBlk = contentState.getBlockForKey(selKey);
    if(curBlk.text.length >= lineLenLimit) {
      setEditorState(handleBlkOverflow(curBlk, char));
      return true;
    }
    return false;
  }
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
          handleBeforeInput={handleBeforeInput}
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