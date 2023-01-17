import React from "react";

interface BigQuoteProps {
    quote: string;
    author: string;
}

const BigQuote: React.FC<BigQuoteProps> = ({ quote, author }: BigQuoteProps) => {
    return (
        <div className="pt-8 pl-14 w-full w-4/5 blueText">
            <p className="font-semibold text-3xl text-left">{quote}</p>
            <p className="mt-3 text-right">-{author}</p>
        </div>
    );
};

export default BigQuote;
