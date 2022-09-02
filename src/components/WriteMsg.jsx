import React from 'react'
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';

const WriteMsg = () => {
  const handleType = () => {
    console.log('hi')
  }
  return (
    <div>
      <RichTextEditorComponent height={450} onChange={handleType}>
        <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
      </RichTextEditorComponent>
    </div>
  )
}

export default WriteMsg