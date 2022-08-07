import React from "react";

const FeatureRequest: React.FC<{}> = () => {
    return (
        <div className="debug4">
            <div>
                <div>
                    <h3>what feature would you like to see on this site?</h3>
                </div>
                <div>
                    <textarea className="debug4 h-20 w-3/5" />
                </div>
            </div>
            <div>
                <div>
                    <h3>what would that feature enable you to have that you don't have now?</h3>
                </div>
                <div>
                    <textarea className="debug4 h-20 w-3/5" />
                </div>
            </div>
        </div>
    );
};

export default FeatureRequest;
