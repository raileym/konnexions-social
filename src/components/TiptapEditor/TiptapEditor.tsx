import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { Markdown } from 'tiptap-markdown';
import type { TiptapEditorProps } from '@cknTypes/types'
import { useState } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl, faListOl } from '@fortawesome/free-solid-svg-icons';
// import { faBold, faListUl, faListOl, faItalic, faUnderline } from '@fortawesome/free-solid-svg-icons';

export const TiptapEditor = ({ initialValue, title, onChange }: TiptapEditorProps ) => {

  const [, setMarkdownContent] = useState<string | null>(null)
  const editor = useEditor({
    extensions: [
      StarterKit,
      // Bold,
      // Italic,
      Underline,
      // Heading.configure({ levels: [1, 2, 3] }),
      Markdown
    ],
    content: initialValue, // '<p>Hello, <strong>Tiptap</strong>! Try the toolbar buttons.</p>',
    onUpdate: ({ editor }) => {
      const markdown = editor.storage.markdown.getMarkdown()
      onChange(markdown)
      setMarkdownContent(markdown)
    }
  })

  if (!editor) return null

  // const buttonClass = (active: boolean) =>
  //   `px-3 py-1 mr-2 rounded border ${
  //     active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
  //   } transition-colors duration-200`

  return (
    <>
      <div className="w-60 center db mb4 f3 mb3">{title}</div>
      <div className="ba w-80 center pa3X br3 max-w-xl mx-auto p-6X bg-white shadow-md rounded-md">
        <div className="flex justify-center mb-6X bg-brandX bb bw1 b--moon-gray h2X pv1" style={{height: '3rem'}}>
          <div className="mh3">
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={'w2 h2 ma1 f4 bg-brand white bn'}
              // className={buttonClass(editor.isActive('heading', { level: 1 }))}
              title="Header 1"
            >
              H1
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={'w2 h2 ma1 f4 bg-brand white bn'}
              // className={buttonClass(editor.isActive('heading', { level: 2 }))}
              title="Header 2"
            >
              H2
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={'w2 h2 ma1 f4 bg-brand white bn'}
              // className={buttonClass(editor.isActive('heading', { level: 3 }))}
              title="Header 3"
            >
              H3
            </button>
          </div>

          <div className="mh3">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={'w2 h2 ma1 f3 bg-brand white bn'}
              // className={buttonClass(editor.isActive('bold'))}
              aria-label="Bold"
              title="Bold (Ctrl+B/Cmd+B)"
              type="button"
            >
              <b>B</b>
              {/* <FontAwesomeIcon icon={faBold} /> */}
            </button>

            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              className={'w2 h2 ma1 f3 bg-brand white bn'}
              // className={buttonClass(editor.isActive('italic'))}
              aria-label="Italic"
              title="Italic (Ctrl+I)"
              type="button"
            >
              <em>I</em>
              {/* <FontAwesomeIcon icon={faItalic} /> */}
            </button>

            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              disabled={!editor.can().chain().focus().toggleUnderline().run()}
              className={'w2 h2 ma1 f3 bg-brand white bn'}
              // className={buttonClass(editor.isActive('underline'))}
              aria-label="Underline"
              title="Underline (Ctrl+U)"
              type="button"
            >
              <u>U</u>
              {/* <FontAwesomeIcon icon={faUnderline} /> */}
            </button>
          </div>

          <div className="mh3">
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              disabled={!editor.can().chain().focus().toggleBulletList().run()}
              className={'w2 h2 ma1 f3 bg-brand white bn'}
            >
              <FontAwesomeIcon icon={faListUl} />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              disabled={!editor.can().chain().focus().toggleOrderedList().run()}
              className={'w2 h2 ma1 f3 bg-brand white bn'}
            >
              <FontAwesomeIcon icon={faListOl} />
            </button>
          </div>
        </div>

        <EditorContent
          editor={editor}
          className="min-h-[200px] h5 ph3 baX b---black-300X overflow-auto roundedX p-4X focus:outline-noneX focus:ring-2X focus:ring-blue-400X"
        />
      </div>
      {/* <pre>{markdownContent}</pre> */}
    </>
  )
}
