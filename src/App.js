import { useState } from "react";
import { marked } from "marked";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndo, faRedo, faSave, faTrash, faPrint, faCircleQuestion, faPencil } from '@fortawesome/free-solid-svg-icons'
function App() {
  const intialText = `# A Markdown Previewer App
  ## This is a sub-heading...
  ### We can do all sorts of things with Markdown

  We can write inline code like \`console.log("Hi there!")\` and we can write code blocks:

  \`\`\`
  const sayHello = () => {
    console.log("Hello there!");
  }

  \`\`\`

  We can also add links, like [my Github profile](https://www.github.com/japoodev).

  Or maybe we want to quote ***Einstein***:

  > "The definition of insanity is doing the same thing over and over again and expecting different results."

  What if we want cat pictures?

  ![A cat picture](https://source.unsplash.com/NodtnCsLdTE)

  Things I love about cats:
  - They are cute
  - They are _fluffy_
  - They are soft
  - They are adorable

  Things I hate about cats:
  1. They are ~~evil~~ mischievous
  2. They are mean
  3. They are **not dogs**
  `;
  const [markdown, setMarkdown] = useState(
    localStorage.getItem("markdown") || intialText
  );

  const [undo, setUndo] = useState([]);
  const [redo, setRedo] = useState([]);

  const openHelp = () => {
    window.open('https://www.markdownguide.org/basic-syntax/', '_blank', 'noopener,noreferrer');
  };

  const handleChange = (e) => {
    setMarkdown(e.target.value);
    setUndo([...undo, markdown]);
    setRedo([]);
  };

  const save = () => {
    if (window.confirm("Do you want to save your changes?")) {
      localStorage.setItem("markdown", markdown);
      window.alert("Your changes have been saved!");
    }
  };

  const handleUndo = () => {
    if (undo.length) {
      const lastItem = undo[undo.length - 1];
      undo.pop();
      setRedo([...redo, markdown]);
      setMarkdown(lastItem);
    }
  };

  const handleRedo = () => {
    if (redo.length) {
      const lastItem = redo[redo.length - 1];
      redo.pop();
      setUndo([...undo, markdown]);
      setMarkdown(lastItem);
    }
  };

  marked.setOptions({
    breaks: true,
  });

  const clear = () => {
    if (window.confirm("Are you sure you want to clear the text?")) {
      setUndo([...undo, markdown]);
      setMarkdown("");
    }
  };

  const print = () => {
    window.print();
  };

  return (
    <div className="container">
      <div className="navbar">
        <h1 className="heading">Markdown Previewer {' '}
          <FontAwesomeIcon onClick={openHelp} className="help" icon={faCircleQuestion} />
        </h1>
        <div className="btns">
          <button className="btn" onClick={save}>
            Save
          </button>
          <button disabled={!undo.length} className="btn" onClick={handleUndo}>
            Undo
          </button>
          <button disabled={!redo.length} className="btn" onClick={handleRedo}>
            Redo
          </button>
          <button className="btn" onClick={clear}>
            Clear
          </button>
          <button className="btn" onClick={print}>
            Print
          </button>
        </div>
      </div>
      <textarea
        className="markdown-text"
        id="editor"
        onChange={handleChange}
        cols="50"
        rows="10"
        value={markdown}
      ></textarea>
      <div
        className="markdown-preview"
        id="preview"
        dangerouslySetInnerHTML={{ __html: marked(markdown) }}
      ></div>
      <div className="mobile-menu">
        <div class="toggle-menu hide">
          <button className="btn-mobile" onClick={clear}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button className="btn-mobile" onClick={save}>
            <FontAwesomeIcon icon={faSave} />
          </button>
          <button
            className="btn-mobile"
            disabled={!undo.length}
            onClick={handleUndo}
          >
            <FontAwesomeIcon icon={faUndo} />
          </button>
          <button
            className="btn-mobile"
            disabled={!redo.length}
            onClick={handleRedo}
          >
            <FontAwesomeIcon icon={faRedo} />
          </button>
          <button className="btn-mobile" onClick={print}>
            <FontAwesomeIcon icon={faPrint} />
          </button>
        </div>
        <button className="toggle-btn btn-mobile" onClick={() => {
          const toggleMenu = document.querySelector('.toggle-menu');
          toggleMenu.classList.toggle('hide');
        }}>
          <FontAwesomeIcon icon={faPencil} />
        </button>
      </div>
    </div>
  );
}

export default App;
