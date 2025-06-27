import React, { useState } from 'react';
import { Editor } from '@tiptap/react';

interface ToolbarProps {
  editor: Editor;
  onEmbedEntry?: () => void;
  onEmbedAsset?: () => void;
  disabledFeatures?: Array<string>;
  availableHeadings?: Array<1 | 2 | 3 | 4 | 5 | 6>;
  availableMarks?: Array<'bold' | 'italic' | 'underline'>;
}

export const ContentfulToolbar: React.FC<ToolbarProps> = ({
  editor,
  onEmbedEntry,
  onEmbedAsset,
  disabledFeatures = [],
  availableHeadings = [1, 2, 3, 4, 5, 6],
  availableMarks = ['bold', 'italic', 'underline']
}) => {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const isDisabled = (feature: string) => disabledFeatures.includes(feature);
  const isMarkAvailable = (mark: 'bold' | 'italic' | 'underline') => availableMarks.includes(mark);

  const handleHeadingChange = (level: number) => {
    if (level === 0) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run();
    }
  };

  const handleLinkToggle = () => {
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run();
    } else {
      setShowLinkInput(true);
      setLinkUrl(editor.getAttributes('link').href || '');
    }
  };

  const handleLinkSubmit = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
    }
    setShowLinkInput(false);
    setLinkUrl('');
  };

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  const getActiveHeading = () => {
    for (const level of availableHeadings) {
      if (editor.isActive('heading', { level })) {
        return `Heading ${level}`;
      }
    }
    return 'Normal text';
  };

  const hasHeadings = !isDisabled('headings') && availableHeadings.length > 0;

  return (
    <div className="contentful-toolbar">
      <div className="contentful-toolbar__group">
        {hasHeadings && (
          <select
            className="contentful-toolbar__select"
            value={getActiveHeading()}
            onChange={(e) => {
              const value = e.target.value;
              if (value === 'Normal text') {
                handleHeadingChange(0);
              } else {
                const level = parseInt(value.replace('Heading ', ''));
                handleHeadingChange(level);
              }
            }}
          >
            <option value="Normal text">Normal text</option>
            {availableHeadings.map(level => (
              <option key={level} value={`Heading ${level}`}>
                Heading {level}
              </option>
            ))}
          </select>
        )}

        <button
          className="contentful-toolbar__button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo"
        >
          ↶
        </button>

        <button
          className="contentful-toolbar__button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo"
        >
          ↷
        </button>
      </div>

      <div className="contentful-toolbar__separator" />

      <div className="contentful-toolbar__group">
        {!isDisabled('bold') && isMarkAvailable('bold') && (
          <button
            className={`contentful-toolbar__button ${editor.isActive('bold') ? 'contentful-toolbar__button--active' : ''}`}
            onClick={() => editor.chain().focus().toggleBold().run()}
            title="Bold"
          >
            <strong>B</strong>
          </button>
        )}

        {!isDisabled('italic') && isMarkAvailable('italic') && (
          <button
            className={`contentful-toolbar__button ${editor.isActive('italic') ? 'contentful-toolbar__button--active' : ''}`}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            title="Italic"
          >
            <em>I</em>
          </button>
        )}

        {!isDisabled('underline') && isMarkAvailable('underline') && (
          <button
            className={`contentful-toolbar__button ${editor.isActive('underline') ? 'contentful-toolbar__button--active' : ''}`}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            title="Underline"
          >
            <u>U</u>
          </button>
        )}

        <button
          className="contentful-toolbar__button"
          title="More formatting options"
        >
          ⋯
        </button>

        {!isDisabled('link') && (
          <>
            <button
              className={`contentful-toolbar__button ${editor.isActive('link') ? 'contentful-toolbar__button--active' : ''}`}
              onClick={handleLinkToggle}
              title="Link"
            >
              🔗
            </button>
            {showLinkInput && (
              <div className="contentful-toolbar__link-input">
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="Enter URL"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleLinkSubmit();
                    }
                    if (e.key === 'Escape') {
                      setShowLinkInput(false);
                    }
                  }}
                  autoFocus
                />
                <button onClick={handleLinkSubmit}>✓</button>
                <button onClick={() => setShowLinkInput(false)}>✗</button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="contentful-toolbar__separator" />

      <div className="contentful-toolbar__group">
        {!isDisabled('lists') && (
          <>
            <button
              className={`contentful-toolbar__button ${editor.isActive('bulletList') ? 'contentful-toolbar__button--active' : ''}`}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              title="Bullet List"
            >
              • ≡
            </button>

            <button
              className={`contentful-toolbar__button ${editor.isActive('orderedList') ? 'contentful-toolbar__button--active' : ''}`}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              title="Numbered List"
            >
              1. ≡
            </button>
          </>
        )}

        {!isDisabled('quote') && (
          <button
            className={`contentful-toolbar__button ${editor.isActive('blockquote') ? 'contentful-toolbar__button--active' : ''}`}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            title="Quote"
          >
            "
          </button>
        )}

        <button
          className="contentful-toolbar__button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Rule"
        >
          —
        </button>

        {!isDisabled('table') && (
          <button
            className="contentful-toolbar__button"
            onClick={insertTable}
            title="Insert Table"
          >
            ⊞
          </button>
        )}
      </div>

      <div className="contentful-toolbar__separator" />

      <div className="contentful-toolbar__group contentful-toolbar__group--right">
        {!isDisabled('embed') && (
          <div className="contentful-toolbar__embed-dropdown">
            <button className="contentful-toolbar__embed-button">
              + Embed ▼
            </button>
            <div className="contentful-toolbar__embed-menu">
              {onEmbedEntry && (
                <button
                  className="contentful-toolbar__embed-option"
                  onClick={onEmbedEntry}
                >
                  Entry
                </button>
              )}
              {onEmbedAsset && (
                <button
                  className="contentful-toolbar__embed-option"
                  onClick={onEmbedAsset}
                >
                  Media
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};