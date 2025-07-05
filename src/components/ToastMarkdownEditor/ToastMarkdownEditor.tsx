import { useRef } from 'react'
import { Editor, Editor as ToastEditorInstance } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import type { ToastMarkdownEditorProps } from '@cknTypes/types'

export const ToastMarkdownEditor = ({ initialValue = '', onChange, title }: ToastMarkdownEditorProps) => {
  // Ref type is React.RefObject<ToastEditorInstance>
  const editorRef = useRef<ToastEditorInstance>(null)

  const handleChange = () => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance()
      const markdown = editorInstance.getMarkdown()
      if (onChange) onChange(markdown)
    }
  }

  // See https://github.com/nhn/tui.editor/blob/master/docs/en/toolbar.md

  const toolbarItemsX = [
    // Group 1: Headings and text styles
    [
      {
        name: 'heading',
        command: 'heading',
        tooltip: 'Heading',
        text: 'H',
        className: 'toastui-toolbar-heading',
        style: { fontWeight: 'bold', fontSize: '16px', color: '#357edd' }
      },
      {
        name: 'bold',
        command: 'bold',
        tooltip: 'Bold (Ctrl+B)',
        text: 'B',
        className: 'toastui-toolbar-bold',
        style: { fontWeight: '900', color: '#222' }
      },
      {
        name: 'italic',
        command: 'italic',
        tooltip: 'Italic (Ctrl+I)',
        text: 'I',
        className: 'toastui-toolbar-italic',
        style: { fontStyle: 'italic', color: '#555' }
      },
      {
        name: 'strike',
        command: 'strike',
        tooltip: 'Strikethrough',
        text: 'S',
        className: 'toastui-toolbar-strike',
        style: { textDecoration: 'line-through', color: '#999' }
      }
    ],

    // Group 2: Lists and blockquotes
    [
      // {
      //   name: 'ul',
      //   command: 'ul',
      //   tooltip: 'Bullet List',
      //   text: '• List',
      //   className: 'toastui-toolbar-ul',
      //   style: { color: '#007acc' }
      // },
      // {
      //   name: 'ol',
      //   command: 'ol',
      //   tooltip: 'Numbered List',
      //   text: '1. List',
      //   className: 'toastui-toolbar-ol',
      //   style: { color: '#007acc' }
      // },
      // {
      //   name: 'task',
      //   command: 'task',
      //   tooltip: 'Task List',
      //   text: '☐ Task',
      //   className: 'toastui-toolbar-task',
      //   style: { color: '#007acc' }
      // },
      // {
      //   name: 'quote',
      //   command: 'quote',
      //   tooltip: 'Blockquote',
      //   text: '"',
      //   className: 'toastui-toolbar-quote',
      //   style: { fontStyle: 'italic', color: '#666' }
      // }
    ],

    // Group 3: Code and tables
    [
      {
        name: 'code',
        command: 'code',
        tooltip: 'Inline Code',
        text: '</>',
        className: 'toastui-toolbar-code',
        style: { fontFamily: 'monospace', color: '#d14' }
      },
      {
        name: 'codeblock',
        command: 'codeblock',
        tooltip: 'Code Block',
        text: 'Code Block',
        className: 'toastui-toolbar-codeblock',
        style: { fontFamily: 'monospace', color: '#d14' }
      },
      {
        name: 'table',
        command: 'table',
        tooltip: 'Insert Table',
        text: 'Tbl',
        className: 'toastui-toolbar-table',
        style: { color: '#555' }
      }
    ],

    // Group 4: Links and media
    [
      {
        name: 'link',
        command: 'link',
        tooltip: 'Insert Link',
        text: 'Link',
        className: 'toastui-toolbar-link',
        style: { color: '#007acc', textDecoration: 'underline' }
      },
      {
        name: 'image',
        command: 'image',
        tooltip: 'Insert Image',
        text: 'Img',
        className: 'toastui-toolbar-image',
        style: { color: '#a52a2a' }
      }
    ],

    // Group 5: Scroll sync toggle
    [
      {
        name: 'scrollSync',
        command: 'scrollSync',
        tooltip: 'Toggle Scroll Sync',
        text: 'Sync',
        className: 'toastui-toolbar-scrollsync',
        style: { color: '#444' }
      }
    ]
  ]

  // const toolbarItems = [
  //   [
  //   {
  //     name: 'heading',
  //     tooltip: 'heading',
  //     command: 'heading',
  //     text: 'H',      
  //     className: 'toastui-editor-toolbar-icons-custom',
  //     style: { fontStyle: 'regular' },
  //   },
  //   {
  //     name: 'italic',
  //     tooltip: 'italic',
  //     command: 'italic',
  //     text: 'I',      
  //     className: 'toastui-editor-toolbar-icons-custom',
  //     style: { fontStyle: 'italic' },
  //   },
  //   {
  //     name: 'bold',
  //     tooltip: 'bold',
  //     command: 'bold',
  //     text: 'B',
  //     className: 'toastui-editor-toolbar-icons-custom',
  //   }      
  //   ], // group 1
  // ]

  const toolbarItems = [
  // [
    // { name: 'heading', command: 'heading', tooltip: 'Heading', className: 'toastui-editor-toolbar-icons-custom' },
    // { name: 'bold', command: 'bold', tooltip: 'Bold', className: 'toastui-editor-toolbar-icons-custom'  },
    // { name: 'italic', command: 'italic', tooltip: 'Italic', className: 'toastui-editor-toolbar-icons-custom'  },
    // { name: 'ul', command: 'ul', tooltip: 'List', className: 'toastui-editor-toolbar-icons-custom'  }
  // ],
  ['heading', 'bold', 'italic'],
  [ 'ul', 'ol' ],
  // [
  //   { name: 'ul', command: 'ul', tooltip: 'Bullet list' },
  //   { name: 'ol', command: 'ol', tooltip: 'Numbered list' },
  //   { name: 'task', command: 'task', tooltip: 'Task list' },
  //   { name: 'quote', command: 'quote', tooltip: 'Blockquote' }
  // ],
  // [
  //   { name: 'code', command: 'code', tooltip: 'Inline code' },
  //   { name: 'codeblock', command: 'codeblock', tooltip: 'Code block' },
  //   { name: 'table', command: 'table', tooltip: 'Table' }
  // ],
  // [
  //   { name: 'link', command: 'link', tooltip: 'Insert link' },
  //   { name: 'image', command: 'image', tooltip: 'Insert image' }
  // ],
  // [
  //   { name: 'scrollSync', command: 'scrollSync', tooltip: 'Toggle scroll sync' }
  // ]
]

const toolbarItems4 = [
  ['bold', 'italic', 'strike'], // basic formatting toggles
  ['ul', 'ol', 'task'],          // list toggles
  ['quote', 'code', 'codeblock']
]


  return (
    <>
      <div className="w-80 center">
        <div className="w-80 center db mb4 f3 mb3">{title}</div>
        <Editor
          initialValue={initialValue}
          previewStyle="vertical"
          height="400px"
          initialEditType="wysiwyg"
          useCommandShortcut={true}
          ref={editorRef}
          onChange={handleChange}
          // toolbarItems={toolbarItems}  
        />
      </div>
    </>
  )
}
