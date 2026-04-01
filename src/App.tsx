import { useState } from 'react';
import './App.css';

export const App = () => {
  const [content, setContent] = useState('');
  const [result, setResult] = useState('');
  const hasReadFile = !!content;
  const hasResult = !!result;

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onload = function (ev) {
      if (ev.target && typeof ev.target.result === 'string') {
        setContent(ev.target.result);
      }
    };

    reader.readAsText(file);
  };

  const onOkReadClick = () => {
    const contentArr = content
      .split('\n')
      .map((item) => {
        return item
          .split('\t')
          .filter((str) => str.match(new RegExp(/^\d{2}\.\d*$/)))
          .reverse();
      })
      .filter((arr) => arr.length)
      .map(([lng, lat], i) => {
        return `flyTo (${lng}E, ${lat}N)   // ${i + 1}`;
      })
      .join('\n');

    setResult(contentArr);
  };
  return (
    <div>
      <label htmlFor="input-file">Додайте вихідні дані</label>
      <br />
      <input
        accept=".waypoints"
        name="input-file"
        id="input-file"
        type="file"
        onChange={handleFile}
      />

      <div>
        {hasReadFile && (
          <>
            <div>
              <pre>{content}</pre>
            </div>
            <button onClick={onOkReadClick}>Все ок!</button>
          </>
        )}

        {hasResult && (
          <div>
            <pre>{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
