import React from 'react'
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';

const WriteMsg = () => {
  return (
    <div>
      <RichTextEditorComponent height={450}>
        <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
    </RichTextEditorComponent>
    </div>
  )
}

export default WriteMsg