import React from "react";
import { Link } from "react-router-dom";

interface DropdownItemWithHighlightProps {
    text: string;
    highlight: string;
}

const DropdownItemWithHighlight: React.FC<DropdownItemWithHighlightProps> = ({ text, highlight }: DropdownItemWithHighlightProps) => {
    const highlightStart = text.indexOf(highlight);
    const highlightLength = highlight.length;
    const highlightEnd = highlightStart + highlightLength;

    return (
        <div>
            <p>
                {text.slice(0, highlightStart)}
                <span className="font-bold">{text.slice(highlightStart, highlightEnd)}</span>
                {text.slice(highlightEnd)}
            </p>
        </div>
    );
};

export default DropdownItemWithHighlight;
