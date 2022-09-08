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
  lineLenLimit = 65;

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
  }/*
  const handleBlkOverflow = curBlk => {
    
    let blkArr = contentState.getBlockMap().toArray();
    let blkIdx = -1;
    let lwfc; //Last word's first char in block
    let newCursorOffset;
    let newCursorBlkKey;

    while(blkArr[++blkIdx] !== curBlk);

    //Trav the rest of the blocks    
    while(blkIdx < blkArr.length && blkArr[blkIdx].text.length >= lineLenLimit) {

      lwfc = lineLenLimit;
      while(--lwfc >= 0 && blkArr[blkIdx].text[lwfc] !== ' ');
    
      //If at the last block and is full, add another block
      let newLineRes;
      if(blkIdx === blkArr.length - 1) {
        newLineRes = appendNewLine();
        contentState = newLineRes.newState.getCurrentContent();
        blkArr = contentState.getBlockMap().toArray();
      }

      //If at the starting block, store the info to move the cursor
      if(blkArr[blkIdx] === curBlk) {
        newCursorOffset = blkArr[blkIdx].text.length - lwfc;
        newCursorBlkKey = blkArr[blkIdx+1].key;
      }

      //Since the entire line is a word, add the last char to beginning of 
      //next line with a space after it
      if(lwfc === -1) {
        contentState = interBlkTxtMove(
          blkArr[blkIdx].key, 
          blkArr[blkIdx].text.length-1, 
          blkArr[blkIdx].text.length,
          blkArr[++blkIdx].key, 0, 0
        );
        newCursorOffset = 1;
      } else {
        //Move overflow text to next block
        contentState = interBlkTxtMove(
          blkArr[blkIdx].key, lwfc, blkArr[blkIdx].text.length,
          blkArr[++blkIdx].key, 0, 0
        );
      }

      if(newLineRes) break; //Stop if new block appended
      blkArr = contentState.getBlockMap().toArray();
    }
    return updateCursor(EditorState.createWithContent(contentState),
      newCursorBlkKey,
      newCursorOffset,
      true
    );
  }*/
  //Inserts text into the block at the selection
  //Postcondition: Changes the contentState
  const manualTxtIns = (txt) => {
    const selKey =  selection.getEndKey();
    const curBlk = contentState.getBlockForKey(selKey);
    contentState = Modifier.replaceText(
      contentState,
      selection,
      txt
    );
    
    //Update cursor
    return updateCursor(EditorState.createWithContent(contentState),
      curBlk.key,
      selection.getEndOffset() + txt.length,
      true
    );
  }
  /*
  //Sets the line map in the content block
  const setCustomMap = (blk, value) => {
    const newBlk = new ContentBlock({
      ...blk.toJS(),
      lineMap: value
    });
    contentState = contentState.set('blockMap', 
      contentState.getBlockMap().set(blk.key, newBlk));
    return newBlk;
  }
  //Postcondition: Returns the line map in the content block
  //Returns undefined if no lineMap exists
  const getLineMap = blk => {
    let contBlk = contentState
      .getBlockForKey(blk.key)
      ._map._root.entries;
    for(let i = contBlk.length - 1; i >= 0; i--)
      if(contBlk[i][0] === 'lineMap')
        return contBlk[i][1];
    return undefined;
  }*/
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
    console.log("Wrapping words ", txt);
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
    
    //Update cursor
    return updateCursor(EditorState.createWithContent(contentState),
      blk.key,
      selection.getEndOffset(),
      true
    );
  }

  const handleBeforeInput = (char) => {
    const selKey =  selection.getEndKey();
    let curBlk = contentState.getBlockForKey(selKey);

    let newEditState = manualTxtIns(char);
    contentState = newEditState.getCurrentContent();
    console.log("Before ", selection.getEndOffset());
    selection = newEditState.getSelection();
    console.log("After ", selection.getEndOffset());
    curBlk = contentState.getBlockForKey(selKey);
    setEditorState(wrapBlkTxt(curBlk, lineLenLimit));
    return true;
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