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
import { ACTIVE_PANEL, TABINDEX_NEVER } from '@cknTypes/constants';
import { usePanelBase } from '@hooks/usePanelBase';

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

  // const { tabIndex, ariaDisabled } = usePanelBase({panelName: ACTIVE_PANEL.TIPTAP_EDITOR})

  const tabIndex = 0
  const ariaDisabled = false

  if (!editor) return null

  return (
    <>
    <div className={`find-this dnX ${ariaDisabled ? '' : 'dnX'}`}>
      <div className="mw7 w-60 center db mb4 f3 f4-m mb3">{title}</div>
      <div className="mw7 mw8-ns ba w-80 w-70-mX center pa3X br3 max-w-xl mx-auto p-6X bg-transparent shadow-md rounded-md">
        <div className="flex justify-center mb-6X bg-brandX bb bw1 b--black h2X pv1 bg-moon-gray" >
          <div className="mh2 mh3-m mh4-ns">
            <button
              tabIndex={tabIndex}
              aria-disabled={ariaDisabled}
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={'tiptap-editor button-h1 bw3 b--transparent width-2 height-2 pa1 mv1 mv0-ns mh1 mh2-m mh3-ns f3 f3-m b bg-transparent brand bnX focus-visible:b--redX focus-visible:bw3X'}
              title="Header 1"
            >
              H1
            </button>
            <button
              tabIndex={tabIndex}
              aria-disabled={ariaDisabled}
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={'tiptap-editor button-h2 bw3 b--transparent width-2 height-2 pa1 mv1 mv0-ns mh1 mh2-m mh3-ns f3 f3-m b bg-transparent brand bnX focus-visible:b--redX focus-visible:bw3X'}
              title="Header 2"
            >
              H2
            </button>
            <button
              tabIndex={tabIndex}
              aria-disabled={ariaDisabled}
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={'tiptap-editor button-h3 bw3 b--transparent width-2 height-2 pa1 mv1 mv0-ns mh1 mh2-m mh3-ns f3 f3-m b bg-transparent brand bnX focus-visible:b--redX focus-visible:bw3X'}
              title="Header 3"
            >
              H3
            </button>
          </div>

          <div className="mh2 mh3-m mh4-ns">
            <button
              tabIndex={tabIndex}
              aria-disabled={ariaDisabled}
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={'tiptap-editor button-bold bw3 b--transparent width-2 height-2 pa1 mv1 mv0-ns mh1 mh1-ns f3 f3-m b bg-transparent brand'}
              aria-label="Bold"
              title="Bold (Ctrl+B/Cmd+B)"
              type="button"
            >
              <b>B</b>
            </button>

            <button
              tabIndex={tabIndex}
              aria-disabled={ariaDisabled}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              className={'tiptap-editor button-italic bw3 b--transparent width-2 height-2 pa1 mv1 mv0-ns mh1 mh1-ns f3 f3-m b bg-transparent brand'}
              aria-label="Italic"
              title="Italic (Ctrl+I)"
              type="button"
            >
              <em>I</em>
            </button>

            <button
              tabIndex={tabIndex}
              aria-disabled={ariaDisabled}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              disabled={!editor.can().chain().focus().toggleUnderline().run()}
              className={'tiptap-editor button-underline bw3 b--transparent width-2 height-2 pa1 mv1 mv0-ns mh1 mh1-ns f3 f3-m bg-transparent brand b'}
              // className={buttonClass(editor.isActive('underline'))}
              aria-label="Underline"
              title="Underline (Ctrl+U)"
              type="button"
            >
              <u>U</u>
              {/* <FontAwesomeIcon icon={faUnderline} /> */}
            </button>
          </div>

          <div className="mh2 mh3-m mh4-ns">
            <button
              tabIndex={tabIndex}
              aria-disabled={ariaDisabled}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              // disabled={!editor.can().chain().focus().toggleBulletList().run()}
              className={'tiptap-editor button-bullet-list bw3 b--transparent width-2 height-2 pa1 mv1 mv0-ns mh1 mh2-m mh3-ns f3 f3-m bg-transparent brand bnX focus-visible:b--redX focus-visible:bw3X'}
            >
              <FontAwesomeIcon icon={faListUl} />
            </button>

            <button
              tabIndex={tabIndex}
              aria-disabled={ariaDisabled}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              // disabled={!editor.can().chain().focus().toggleOrderedList().run()}
              className={'tiptap-editor button-number-list bw3 b--transparent width-2 height-2 pa1 mv1 mv0-ns mh1 mh2-m mh3-ns f3 f3-m bg-transparent brand bnX focus-visible:b--redX focus-visible:bw3X'}
            >
              <FontAwesomeIcon icon={faListOl} />
            </button>
          </div>
        </div>

        <div className="pa1 b--double bw3 b--transparent focus-within:b--red bg-moon-gray">
          <EditorContent
            tabIndex={-1}
            // tabIndex={tabIndex}
            // aria-disabled={ariaDisabled}
            aria-disabled={ariaDisabled}
            editor={editor}
            className="tiptap-editor editor-content min-h-[200px] f5 f6-m h5 ph3 b---background-300X overflow-auto roundedX p-4X focus:outline-noneX focus:ring-2X focus:ring-blue-400X bg-moon-gray bw3 focus-within:bg-red focus-within:b--red"
          />
        </div>
      </div>
      {/* <pre>{markdownContent}</pre> */}
    </div>
    </>
  )
}
