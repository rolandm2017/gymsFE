import React from "react";

import "./Review.scss";

function ThanksMessage() {
    return (
        <div id="thanksMessageContainer" className="">
            <div className="thanksMessageBorder m-4 rounded-md">
                <div>
                    <p className="blueText text-3xl pt-16 pb-24">Thanks for your feedback!</p>
                </div>
            </div>
        </div>
    );
}

export default ThanksMessage;
