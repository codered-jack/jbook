import './code-editor.css';
import { useRef } from 'react';
import './syntax.css';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}
const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>();
  function handleEditorChange(value: any) {
    onChange(value);
  }

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    // here is another way to get monaco instance
    // you can also store it in `useRef` for further usage
    editorRef.current = editor;

    const highlighter = new Highlighter(
      //@ts-ignore
      window.monaco,
      codeShift,
      editor
    );

    highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    );
  };

  const onFormat = () => {
    const unformatted = editorRef.current.getModel().getValue();

    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');

    editorRef.current.setValue(formatted);
  };
  return (
    <div className='editor-wrapper'>
      <button
        className='button button-format is-primary is-small'
        onClick={onFormat}
      >
        Format
      </button>
      <MonacoEditor
        onChange={handleEditorChange}
        value={initialValue}
        onMount={handleEditorDidMount}
        language='javascript'
        theme='vs-dark'
        height='100%'
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
