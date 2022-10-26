import { useState } from "react";
import { marked } from "marked";

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
  const [markdown, setMarkdown] = useState(intialText);
  // Create a state to manage undo and redo function
  const [undo, setUndo] = useState([]);
  const [redo, setRedo] = useState([]);

  const handleChange = (e) => {
    setMarkdown(e.target.value);
    // Add the current markdown to the undo array
    setUndo([...undo, markdown]);
    // Clear the redo array
    setRedo([]);
  };

  const handleUndo = () => {
    // If there is something in the undo array
    if (undo.length) {
      // Get the last item in the undo array
      const lastItem = undo[undo.length - 1];
      // Remove the last item from the undo array
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
    // Ask the user if they are sure they want to clear the text
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
        <h1 className="heading">Mardown Previewer</h1>
        <div className="btns">
          {/* Create an undo button */}
          <button disabled={!undo.length} className="btn" onClick={handleUndo}>
            Undo
          </button>
          {/* Create a redo button */}
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
        <button
          className="btn-mobile"
          disabled={!undo.length}
          onClick={handleUndo}
        >
          Undo
        </button>
        <button
          className="btn-mobile"
          disabled={!redo.length}
          onClick={handleRedo}
        >
          Redo
        </button>
        <button className="btn-mobile" onClick={clear}>
          Clear
        </button>
        <button className="btn-mobile" onClick={print}>
          Print
        </button>
      </div>
    </div>
  );
}

export default App;
