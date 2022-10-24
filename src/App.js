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
  `
  let [markdown, setMarkdown] = useState(intialText);
  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  marked.setOptions({
    breaks: true,
  });

  const clear = () => {
    setMarkdown("");
  };

  const print = () => {
    window.print();
  };

  return (
    <div className="container">
      <div className="navbar">
        <h1 className="heading">Mardown Previewer</h1>
        <div className="btns">
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
