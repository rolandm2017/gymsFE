import React from "react";

interface BigQuoteProps {
    quote: string;
    author: string;
    topPadding: boolean;
    thin: boolean;
}

const BigQuote: React.FC<BigQuoteProps> = ({ quote, author, topPadding, thin }: BigQuoteProps) => {
    return (
        <div className={`${topPadding ? "pt-8" : ""} pl-14 w-full ${thin ? "w-3/5" : "w-4/5"}  blueText hidden sm:block`}>
            <p className="font-semibold text-3xl text-left">{quote}</p>
            <p className="mt-3 text-right">-{author}</p>
        </div>
    );
};

export default BigQuote;
