import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils, convertToRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

const colorStyleMap = {
  original: {
    color: "white",
    textShadow: "0 0 5px black",
    fontSize: "50px"
  }
};

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }
  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    console.log( this.state.editorState.getCurrentContent() );
  }
  _onItalicClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }
  _onUnderlineClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }
  _onOriginalClick() {
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    const currentStyle = editorState.getCurrentInlineStyle();

    let nextEditorState = EditorState.push(
      editorState,
      editorState.getCurrentContent(),
      'change-inline-style'
    );

    if(!currentStyle.has('original')) {
      nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, 'original');
    }

    this.onChange(nextEditorState);
  }
  output() {
    let options = {
      inlineStyles: {
        'original': {
          attributes: {class: 'original-style'},
        }
      },
    };
    return stateToHTML(this.state.editorState.getCurrentContent(), options);
  }
  render() {
    return (
      <div>
        <button onClick={this._onBoldClick.bind(this)}>Bold</button>
        <button onClick={this._onItalicClick.bind(this)}>Italic</button>
        <button onClick={this._onUnderlineClick.bind(this)}>Underline</button>
        <button onClick={this._onOriginalClick.bind(this)}>Original</button>
        <Editor editorState={this.state.editorState} onChange={this.onChange} customStyleMap={colorStyleMap} />
        <h1>HTML出力結果</h1>
        <code>{this.output()}</code>
      </div>
    );
  }
}

ReactDOM.render(
  <MyEditor />,
  document.getElementById("app")
);
