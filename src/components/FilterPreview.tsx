import React from 'react';
import { FilterRule } from '../utils/types';
import { generateFilterFile } from '../utils/filterGenerator';

type Props = {
  rules: FilterRule[];
};

export function FilterPreview({ rules }: Props) {
  const filterContent = generateFilterFile(rules);

  const handleCopy = () => {
    navigator.clipboard.writeText(filterContent);
  };

  const handleDownload = () => {
    const blob = new Blob([filterContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'poe2-filter.filter';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-[40px] space-y-4 p-4 bg-gray-800 rounded-lg border border-red-900 shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Preview</h2>
        <div className="space-x-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1 text-sm border border-red-900 rounded hover:bg-gray-700 transition-colors duration-200 text-gray-200"
          >
            Copy
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-1 text-sm bg-red-900 text-gray-200 rounded border border-red-700 shadow-lg hover:bg-red-800 hover:border-red-600 transition-colors duration-200"
          >
            Download
          </button>
        </div>
      </div>

      <pre className="p-4 bg-gray-900 rounded-lg overflow-auto text-sm font-mono whitespace-pre text-gray-200 border border-red-900">
        {filterContent || '# No rules defined yet'}
      </pre>
    </div>
  );
}
