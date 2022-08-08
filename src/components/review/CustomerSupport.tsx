import React from "react";
import Button from "../button/Button";

import "./Review.scss";

function CustomerSupport() {
    return (
        <div className="h-full flex flex-col p-6">
            <div className="supportHeader">
                <h2 className="flex justify-start">Customer Support</h2>
            </div>
            <div className="supportMain py-2">
                <textarea className="customerSupportTextArea textAreaShared" />
            </div>
            <div className="supportFooter mt-2 flex justify-end">
                <Button type={"Opaque"} text={"Submit"} />
            </div>
        </div>
    );
}

export default CustomerSupport;
