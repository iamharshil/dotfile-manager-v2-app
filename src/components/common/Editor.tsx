import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";

type Language = "json" | "javascript" | "python";

const languageExtensions: Record<Language, any> = {
	json: json(),
	javascript: javascript(),
	python: python(),
};

interface SyntaxEditorProps {
	defaultValue: string;
	onChange: (value: string) => void;
	defaultLanguage?: Language;
}

const Editor: React.FC<SyntaxEditorProps> = ({ defaultValue, onChange, defaultLanguage = "json" }) => {
	const [lang, setLang] = useState<Language>(defaultLanguage);
	const [value, setValue] = useState<string>(defaultValue);

	const handleChange = (val: string) => {
		setValue(val);
		onChange(val);
	};

	return (
		<div>
			<select value={lang} onChange={(e) => setLang(e.target.value as Language)}>
				<option value="json">JSON</option>
				<option value="javascript">JavaScript</option>
				<option value="python">Python</option>
			</select>
			<CodeMirror value={value} extensions={[languageExtensions[lang]]} onChange={handleChange} />
		</div>
	);
};

export default Editor;
