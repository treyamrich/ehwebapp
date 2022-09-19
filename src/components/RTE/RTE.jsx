import React, { useEffect, useState } from 'react';
import { Editor, EditorState, EditorBlock, getDefaultKeyBinding, RichUtils, Modifier, SelectionState, ContentBlock } from 'draft-js';
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

  const updateCursor = (editorState, blkKey, offset, isForced) => {
    const newSel = new SelectionState({
      anchorKey: blkKey,
      anchorOffset: offset,
      focusKey: blkKey,
      focusOffset: offset
    });
    return isForced ? EditorState.forceSelection(
      editorState,
      newSel
    ) : EditorState.acceptSelection(
      editorState,
      newSel
    );
  }
  //Inserts text into the block at the selection
  //Precondition: the selection state must not span multiple blocks
  //Postcondition: Changes the contentState
  //Inserts text in the block at the selection
  const manualTxtIns = (txt, replaceSel, newOffset) => {

    const selKey =  selection.getEndKey();
    const curBlk = contentState.getBlockForKey(selKey);
    
    contentState = Modifier.replaceText(
      contentState,
      replaceSel,
      txt
    );

    //Update cursor
    return updateCursor(EditorState.createWithContent(contentState),
      curBlk.key,
      newOffset,
      true
    );
  }
  //Precondition: Selection must be non-collapsed
  //Selection must not span multiple blocks
  const deleteTxt = () => {
    if(selection.isCollapsed()) return;
    const selKey =  selection.getEndKey();
    let curBlk = contentState.getBlockForKey(selKey);
    let remSel = new SelectionState({
      anchorKey: curBlk.key,
      focusKey: curBlk.key,
      anchorKey: selection.getStartOffset(),
      focusKey: selection.getEndOffset()
    });
    contentState = Modifier.removeRange(contentState, remSel, 'backward');
    setEditorState(EditorState.createWithContent(contentState));
  }
  const trimWhtSpc = (trimBeg, trimEnd, inStr) => {
    var start = trimBeg ? -1 : 0;
    let end = trimEnd ? inStr.length : inStr.length-1;
  
    if(trimBeg) {
      while(++start < inStr.length && inStr[start] == ' ');
    }
    if(trimEnd) {
      while(--end >= 0 && inStr[end] == ' ');
    }
    return inStr.slice(start, end+1);
  }
  const wordWrap = (txt, width) => {
    if(txt.length <= width) {
      return txt;
    } else {
      let lwfc = width+1;
      while(--lwfc >= 0 && txt[lwfc] !== ' ');
  
      //If no spaces use the width as idx
      let lineSplitIdx = lwfc < 0 ? width : lwfc;
      //Split line
      let leftLine = txt.slice(0, lineSplitIdx);
      let rightLine = txt.slice(
        lineSplitIdx === width ? lineSplitIdx : lineSplitIdx + 1,
        txt.length
      );
      rightLine = trimWhtSpc(true, false, rightLine);
      return leftLine + '\n' + wordWrap(rightLine, width);
    }
  }
  /*MAYBE ADD A PASTE/IMPORT TEXT FEATURE
  const wrapBlkTxt = blk => {
    //Remove new lines
    let blkTxt = "";
    for(let i = 0; i < blk.text.length; i++) {
      if(blk.text[i] !== '\n')
        blkTxt += blk.text[i];
      else
        blkTxt += ' ';
    }
    let wrapTxt = wordWrap(blkTxt, lineLenLimit);
    
    contentState = Modifier.replaceText(
      contentState,
      new SelectionState({
        anchorKey: blk.key,
        anchorOffset: 0,
        focusKey: blk.key,
        focusOffset: blk.text.length
      }),
      wrapTxt
    );
    
    //Account for any newlines added from breaking on the width
    let txtLenDiff = wrapTxt.length - blk.text.length;

    //Update cursor
    return updateCursor(EditorState.createWithContent(contentState),
      blk.key,
      selection.getEndOffset() + txtLenDiff,
      true
    );
  }*/

  const myHandleInput = text => {

    const selKey =  selection.getEndKey();
    let curBlk = contentState.getBlockForKey(selKey);

    if(selection.getStartKey() !== selection.getEndKey())
      return true;

    if(curBlk.text.length + text.length < lineLenLimit) 
      return false;

    //If pasting, try pasting part of the text
    let remLen = lineLenLimit - curBlk.text.length;
    let replTxtLen = selection.getEndOffset() - selection.getStartOffset();
    remLen += replTxtLen;
    if(remLen >= 0) {
      let newOffset = selection.isCollapsed() ?
        selection.getEndOffset() + text.length :
        selection.getStartOffset() + text.length;

      setEditorState(
        manualTxtIns(
          text.slice(0, Math.min(remLen+1, text.length)),
          selection,
          newOffset
      ));
    }
    
    return true;
  }
  const handleBeforeInput = char => {
    return myHandleInput(char);
  }
  const handlePastedText = txt => {
    return myHandleInput(txt);
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
    const selKey =  selection.getEndKey();
    let curBlk = contentState.getBlockForKey(selKey);
    
    switch(e.keyCode) {
      case 9: { //TAB
        const newEditorState = RichUtils.onTab(e, editorState, 4);
        if(newEditorState !== editorState) {
          setEditorState(newEditorState);
        }
        return;
      }
      case 13: { //Enter
        if(contentState.getBlockMap().size === lineLimit) return;
        break;
      }
      case 8: { //Backspace
        e.preventDefault();
        if(selection.getStartKey() !== selection.getEndKey() ||
          selection.getEndOffset() === 0
        )
          return;
        if(!selection.isCollapsed()) {
          deleteTxt();
          return;
        }
        let newOffset = selection.getEndOffset() - 1;
        let replaceSel = new SelectionState({
          anchorKey: curBlk.key,
          focusKey: curBlk.key,
          focusOffset: selection.getEndOffset(),
          anchorOffset: newOffset
        });
        setEditorState(manualTxtIns("", replaceSel, newOffset));
        return;
      }
      case 46: { //Delete
        e.preventDefault();
        if(selection.getStartKey() !== selection.getEndKey())
          return;
        if(!selection.isCollapsed()) {
          deleteTxt();
          return;
        }
        let replaceSel = new SelectionState({
          anchorKey: curBlk.key,
          focusKey: curBlk.key,
          focusOffset: selection.getEndOffset() + 1,
          anchorOffset: selection.getStartOffset()
        });
        setEditorState(manualTxtIns(
          "", 
          replaceSel, 
          selection.getStartOffset()
        ));
        return;
      }
    }
    if(e.ctrlKey) {
      switch(e.keyCode) {
        case 88: { //Cut op: ctrl + x
          if(selection.getStartKey() !== selection.getEndKey()) {
            e.preventDefault();
            return;
          }
          deleteTxt();
          return;
        }
      }
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
    <div className="RTE-container">
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
          handlePastedText={handlePastedText}
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
    </div>
  );
}

export default RTE;