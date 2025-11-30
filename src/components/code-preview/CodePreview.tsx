import React, { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';
import './CodePreview.css';

interface Props {
  code: string;
}

export const CodePreview: React.FC<Props> = ({ code }) => {
  const [html, setHtml] = useState<string>('');
  useEffect(() => {
    const highlight = async () => {
      const htmlOutput = await codeToHtml(code, {
        lang: 'typescript',
        theme: 'github-dark-dimmed',
      });
      setHtml(htmlOutput);
    };

    highlight();
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
