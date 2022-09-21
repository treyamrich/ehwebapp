import React, { useState } from 'react';
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
  //Postcondition: Changes the contentState
  //Inserts text in the block at the selection
  const manualTxtIns = (txt, replaceSel, newOffset) => {

    const curBlk = contentState.getBlockForKey(selection.getStartKey());
    
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
  //sel must have anchorKey before focusKey
  //Postcondition: Deletes selection foward
  const delSelection = (sel=null) => {
    if(sel) selection = sel;
    if(selection.isCollapsed()) return;
    let curBlk = contentState.getBlockForKey(selection.getStartKey());
    
    contentState = Modifier.removeRange(contentState, selection, 'forward');
    let newEditState = updateCursor(
      EditorState.createWithContent(contentState),
      curBlk.key,
      selection.getStartOffset(),
      true
    );
    setEditorState(wordWrap(newEditState));
  }
  const appendNewBlk = () => {
    let lblock = contentState.getLastBlock();
    contentState = Modifier.splitBlock(
      contentState,
      new SelectionState({
        anchorKey: lblock.key,
        focusKey: lblock.key,
        anchorOffset: lblock.text.length,
        focusOffset: lblock.text.length
      })
    );
    return {
      newState: EditorState.createWithContent(contentState),
      nxtBlkKey: contentState.getLastBlock().key
    }
  }
  //Precondition: The newBlkArr must contain enough new blks
  //after the curBlk, after handling overflow
  const calcWrappedCursor = (overflowAmt, curBlk, newBlkArr) => {
    let newSelBlkKey;
    let newSelOffset;
    let amtBlksToMv = 1;
    let blkIdx = 0;

    if(selection.isCollapsed()) {
      //If cursor was to the left of the line break, don't update
      if(selection.getEndOffset() <= lineLenLimit) {
        newSelOffset = selection.getEndOffset();
        newSelBlkKey = curBlk.key;
      } else {
        newSelOffset = overflowAmt % lineLenLimit;
        amtBlksToMv += Math.floor(overflowAmt / lineLenLimit);

        //Find curBlk
        for(blkIdx; blkIdx < newBlkArr.length; blkIdx++)
          if(newBlkArr[blkIdx].key === curBlk.key) break;
  
        //Advance blk idx
        while(amtBlksToMv > 0 && blkIdx < newBlkArr.length) {
          blkIdx++;
          amtBlksToMv--;
        }
        
        newSelBlkKey = newBlkArr[blkIdx].key;
      }
    }
    else {
      newSelOffset = selection.getStartOffset();
      newSelBlkKey = selection.getStartKey();
    }
    return {
      key: newSelBlkKey,
      offset: newSelOffset
    }
  } 
  const wordWrap = newEditState => {
    
    //Update local state variables
    contentState = newEditState.getCurrentContent();
    selection = newEditState.getSelection();

    const curBlk = contentState.getBlockForKey(selection.getStartKey());
    let leftLineEnd; //Index to split line
    let blkArr = contentState.getBlocksAsArray();
    let blkIdx = 0; //Index to traverse blkArr
    
    //Store overflow amt on first iter
    let overflowAmt;
    
    //Get the blkIdx to the curBlk
    for(blkIdx; blkIdx < blkArr.length; blkIdx++)
      if(blkArr[blkIdx].key === curBlk.key) break;

    //Propagate overflow to sucessor blks
    //The loop length may grow as new blks are added
    while(blkIdx < blkArr.length && blkArr[blkIdx].text.length > lineLenLimit) {
      
      //If at last block add new blk
      if(blkIdx === blkArr.length - 1) {
        let newLineRes = appendNewBlk();
        contentState = newLineRes.newState.getCurrentContent();
        blkArr = contentState.getBlocksAsArray();
      }

      //Find the left most whitespace from the line len lim
      leftLineEnd = lineLenLimit;
      for(leftLineEnd; leftLineEnd >= 0; leftLineEnd--)
        if(blkArr[blkIdx].text[leftLineEnd] === ' ') break;
      
      //Set to either the line limit or after the whitespace
      leftLineEnd = leftLineEnd < 0 ? lineLenLimit : leftLineEnd + 1;
  
      //If at first block save the overflowAmt for calculating cursor position
      if(blkArr[blkIdx].key === curBlk.key) {
        overflowAmt = selection.getEndOffset() - leftLineEnd;
      }

      //Move overflow to next block
      contentState = Modifier.moveText(
        contentState,
        new SelectionState({
          anchorKey: blkArr[blkIdx].key,
          focusKey: blkArr[blkIdx].key,
          anchorOffset: leftLineEnd,
          focusOffset: blkArr[blkIdx].text.length
        }),
        new SelectionState({
          anchorKey: blkArr[blkIdx+1].key,
          focusKey: blkArr[blkIdx+1].key,
          anchorOffset: 0,
          focusOffset: 0
        })
      );
      
      blkArr = contentState.getBlocksAsArray();
      blkIdx++;
    }
    
    let wrappedCursor = calcWrappedCursor(overflowAmt, curBlk, blkArr);

    return updateCursor(
      EditorState.createWithContent(contentState),
      wrappedCursor.key,
      wrappedCursor.offset,
      true  
    );
  }
  
  const myHandleInput = txt => {

    const curBlk = contentState.getBlockForKey(selection.getStartKey());

    //If selection doesn't span multiple blks
    if(selection.getStartKey() === selection.getEndKey()) {
      //Account for txt replacement; check if wordWrap unnecessary
      let remLen = lineLenLimit - curBlk.text.length;
      let replTxtLen = selection.getEndOffset() - selection.getStartOffset();
      remLen += replTxtLen;
      if(txt.length <= remLen) return false;
    }

    //Insert the txt manually
    let newOffset = selection.isCollapsed() ?
        selection.getEndOffset() + txt.length :
        selection.getStartOffset() + txt.length;
    let newEditorState = manualTxtIns(
      txt, 
      selection, 
      newOffset
    );
    
    setEditorState(wordWrap(newEditorState, txt));
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
    const curBlk = contentState.getBlockForKey(selection.getEndKey());
    
    switch(e.keyCode) {
      case 9: { //TAB
        const newEditorState = RichUtils.onTab(e, editorState, 4);
        if(newEditorState !== editorState) {
          setEditorState(newEditorState);
        }
        return;
      }
      case 8: { //Backspace
        e.preventDefault();
        let prevBlk = contentState.getBlockBefore(curBlk.key);

        if(!selection.isCollapsed()) {
          delSelection();
        }
        //Delete line if not first line
        else if(selection.getStartOffset() === 0 &&
          prevBlk
        ) {
          //Check if an extra whitespace exists at prev block
          let anchOffset = prevBlk.text.length > lineLenLimit ?
            prevBlk.text.length - 1 : prevBlk.text.length;
          delSelection(new SelectionState({
            anchorKey: prevBlk.key,
            focusKey: curBlk.key,
            focusOffset: 0,
            anchorOffset: anchOffset
          }));
        }
        else if(selection.getEndOffset() > 0) {
          //Del char before sel offset if offset > 0
          let newOffset = selection.getEndOffset() - 1;
          let replaceSel = new SelectionState({
            anchorKey: curBlk.key,
            focusKey: curBlk.key,
            focusOffset: selection.getEndOffset(),
            anchorOffset: newOffset
          });
          setEditorState(manualTxtIns("", replaceSel, newOffset));
        }
        return;
      }
      case 46: { //Delete
        e.preventDefault();
        let nextBlk = contentState.getBlockAfter(curBlk.key);

        if(!selection.isCollapsed()) {
          delSelection();
        }
        //Delete line if at end of line and not last line
        else if(selection.getEndOffset() === curBlk.text.length && 
          nextBlk
        ) {
          
          delSelection(new SelectionState({
            anchorKey: curBlk.key,
            focusKey: nextBlk.key,
            focusOffset: 0,
            anchorOffset: curBlk.text.length
          }));
        } 
        else if(selection.getEndOffset() < curBlk.text.length) {
          //Del char after sel offset
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
        }
        return;
      }
    }
    if(e.ctrlKey) {
      switch(e.keyCode) {
        case 88: { //Cut op: ctrl + x
          let selTxt = window.getSelection().toString();
          //Remove newlines from selection
          console.log('before', selTxt)
          selTxt = selTxt.split('\n');
          console.log('after', selTxt);
          navigator.clipboard.writeText(window.getSelection().toString());
          delSelection();
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
          handleDrop={()=>true}
        />
        {!contentState.hasText() && (
          <div className="RE-ph-container">
            <div className="RE-ph">Write your creative message here...</div>
          </div>
        )}
      </div>
      <div className="text-right">
        <p className="text-sm mt-3" 
          style= {{
            color: contentState.getBlockMap().size > lineLimit ? '#f54949' :
            '#C39F7F'
        }}>
          Lines: {contentState.getBlockMap().size}{`${lineLimit ? ' / ' + lineLimit : ''}`}
        </p>
      </div>
    </div>
    </div>
  );
}

export default RTE;