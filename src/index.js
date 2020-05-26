import { useState, useRef, useEffect } from 'preact/hooks';

import text from './text.json';

import Checkbox from './common/checkbox';

import './style.scss';

const App = () => {
    const [textLength, setTextLength] = useState(0);

    const [countSettings, setCountSettings] = useState({
        spaces: true,
        lineBreaks: true,
    });

    const textAreaRef = useRef(null);

    const getTextLength = () => {
        const ref = textAreaRef.current;

        if (!ref) {
            return 0;
        }

        let value = ref.value;

        if (!countSettings.spaces) {
            value = value.replace(/\s+/g, '');
        }

        if (!countSettings.lineBreaks) {
            value = value.replace(/\r?\n|\r/g, '');
        }

        setTextLength(value.length);
    };

    useEffect(() => {
        getTextLength();
    }, [countSettings]);

    const formatText = text => {
        let tmp = '';

        text.forEach((p, i, src) => {
            tmp += p;

            if (i !== src.length - 1) {
                tmp += '\r';
            }
        });

        return tmp;
    };

    return (
        <div class="app">
            <textarea class="textarea" ref={textAreaRef} onInput={() => getTextLength()}>
                {formatText(text)}
            </textarea>
            <div class="info m-t2">
                <p>
                    Количество символов в тексте: <b>{textLength}</b>
                </p>

                <form class="m-t2">
                    <Checkbox
                        label="Считать пробелы?"
                        checked={countSettings.spaces}
                        onInput={e => setCountSettings({ ...countSettings, spaces: e.target.checked })}
                    />
                    <Checkbox
                        label="Считать переносы строк?"
                        checked={countSettings.lineBreaks}
                        disabled={!countSettings.spaces}
                        onInput={e => setCountSettings({ ...countSettings, lineBreaks: e.target.checked })}
                    />
                </form>

                <p class="m-t2">
                    <a href="https://github.com/e965/megafon-contest-symbols-couter" target="_blank" rel="noreferrer">
                        github
                    </a>
                </p>
            </div>
        </div>
    );
};

export default App;
