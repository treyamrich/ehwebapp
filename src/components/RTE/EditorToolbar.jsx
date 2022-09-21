import React, { useState, useEffect } from 'react'
import { GoListUnordered, GoListOrdered } from 'react-icons/go';
import { GrTextAlignCenter, GrTextAlignRight, GrTextAlignLeft } from 'react-icons/gr';
import { RiFontSize } from 'react-icons/ri'
import { BsTypeBold, BsTypeItalic, BsTypeUnderline } from 'react-icons/bs';

import './rte.css';

const ICON_SIZE = 20;
const FONT_SIZES = [
    {className: 'TEXT', label: 'Text'},
    {className: 'SUBHEAD', label: 'Sub Header'},
    {className: 'HEADER', label: 'Header'}
];

const INLINE_STYLES = [
  {label: 'bold', icon: <BsTypeBold size={ICON_SIZE}/>, style: 'BOLD'},
  {label: 'italic', icon: <BsTypeItalic size={ICON_SIZE}/>, style: 'ITALIC'},
  {label: 'underline', icon: <BsTypeUnderline size={ICON_SIZE}/>, style: 'UNDERLINE'}
];
const BLOCK_TYPES = [
  {label: 'ul', icon: <GoListUnordered size={ICON_SIZE}/>, style: 'unordered-list-item'},
  {label: 'ol', icon: <GoListOrdered size={ICON_SIZE}/>, style: 'ordered-list-item'},
  {label: 'al', icon: <GrTextAlignLeft size={ICON_SIZE}/>, style: 'left'},
  {label: 'ac', icon: <GrTextAlignCenter size={ICON_SIZE}/>, style: 'center', applyInitial: true},
  {label: 'ar', icon: <GrTextAlignRight size={ICON_SIZE}/>, style: 'right'}
];

const StyleButton = ({ onToggle, icon, active, style, applyInitial, stopApplyInit }) => {
  let className = 'RichEditor-styleButton';
  if (active) {
    className += ' RichEditor-activeButton';
  }
  const handleClick = e => {
    e.preventDefault();
    onToggle(style);
  }
  useEffect(()=>{
    if(applyInitial) {
        onToggle(style);
        stopApplyInit();
    }
  }, []);
  return (
    <span className={className} onMouseDown={handleClick}>
        {icon}
    </span>
  )
}

const InlineStyleControls = ({ editorState, onToggle }) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
      <div className="RichEditor-controls inline">
      {INLINE_STYLES.map((type) =>
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            icon={type.icon}
            onToggle={onToggle}
            style={type.style}
          />
      )}
      </div>
  );
};

const BlockStyleControls = ({ editorState, onToggle, autoTxtCenter, setAutoTxtCenter }) => {
  const selection = editorState.getSelection();
  const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

  return (
      <div className="RichEditor-controls inline">
      {BLOCK_TYPES.map((type) =>
          <StyleButton
            key={type.label}
            active={type.style === blockType}
            icon={type.icon}
            onToggle={onToggle}
            style={type.style}
            applyInitial={type.applyInitial && autoTxtCenter}
            stopApplyInit={()=>setAutoTxtCenter(false)}
          />
      )}
      </div>
  );
};

const FontSizeSelector = ({ editorState, changeFontSize, onToggle }) => {
    const currentStyle = editorState.getCurrentInlineStyle();
    const [showFSMenu, setShowFSMenu] = useState(false);
    const [hasFontChanged, setHasFontChanged] = useState(false);

    const setFontSize = (e, fontClass) => {
        e.preventDefault();
        //Remove the existing font
        let none = true;
        for(let i = 0; i < FONT_SIZES.length; i++) {
            if(currentStyle.has(FONT_SIZES[i].className)) {
                changeFontSize(FONT_SIZES[i].className, fontClass);
                none = false;
                break;
            }
        }
        //Select font without swapping if no fonts currently applied
        if(none) onToggle(fontClass);
        if(!hasFontChanged) setHasFontChanged(true);
    }
    //Close the drop down menu after any click
    useEffect(()=> {
        if(!showFSMenu) return;

        const handleAnyClick = e => {
            e.preventDefault();
            setShowFSMenu(false);
        }
        document.addEventListener("mousedown", handleAnyClick);
        return () => {
            document.removeEventListener("mousedown", handleAnyClick)
        }
    }, [showFSMenu]);
    return (
        <div className="font-size-dropdown RichEditor-styleButton">
            <button 
                className={showFSMenu ? "RichEditor-activeButton" : ""}
                onMouseDown={e => {
                e.preventDefault(); 
                setShowFSMenu(prevVal => !prevVal)}
                }><RiFontSize size={ICON_SIZE}/></button>
        {showFSMenu && (
            <div className="font-size-menu">
            {FONT_SIZES.map((fontSize, idx) => {
                let disabled = !hasFontChanged && idx === 0 || 
                    currentStyle.has(fontSize.className);
                return (
                    <div className="font-size-option" 
                        style={disabled ? 
                            {color: '#ddd'} : null
                        }
                        key={`fs-${idx}`}
                        onMouseDown={disabled ? 
                            () => setShowFSMenu(false) :
                            e => setFontSize(e, fontSize.className)}
                    >
                    { fontSize.label }
                    </div>
            )})}
            </div>
        )}
        </div>
    );
}
const EditorToolbar = ({ editorState, toggleBlockType, toggleInlineStyle, changeFontSize, autoTxtCenter, setAutoTxtCenter }) => {
    
    return (
        <div>
            <InlineStyleControls 
                editorState={editorState}
                onToggle={toggleInlineStyle}
            />
            <FontSizeSelector
                editorState={editorState}
                onToggle={toggleInlineStyle}
                changeFontSize={changeFontSize}
            />
            <BlockStyleControls 
                editorState={editorState}
                onToggle={toggleBlockType}
                autoTxtCenter={autoTxtCenter}
                setAutoTxtCenter={setAutoTxtCenter}
            />
        </div>
    );
}

export default EditorToolbar