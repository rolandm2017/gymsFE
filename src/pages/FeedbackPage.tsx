import React, { useState } from "react";

import PageBase from "./PageBase";
import CustomerSupport from "../components/review/CustomerSupport";
import ThanksMessage from "../components/review/ThanksMessage";
import Rating from "../components/review/Rating";
import Testimonial from "../components/review/Testimonial";
import FeatureRequest from "../components/review/FeatureRequest";

import "./FeedbackPage.scss";

const FeedbackPage: React.FC<{}> = props => {
    const [feedbackReceived, setFeedbackReceived] = useState(false);
    return (
        <PageBase>
            <div className="flex flex-col">
                <div className="w-full flex">
                    <div className="ratingContainer mr-4 py-4 flex flex-col bg-white">
                        <Rating text="This helped me start or keep up a gym habit." />
                        <Rating text="I was able to find several apartments near a gym." />
                        <Rating text="I would recommend this service to a friend." />
                        <Testimonial text="Leave a review for us!" />
                    </div>
                    <div className="customerSupportContainer bg-white">
                        <CustomerSupport />
                    </div>
                </div>
                <div className="featureRequestContainer my-3.5 pb-4 bg-white">
                    <FeatureRequest />
                </div>
                <div className="thanksMessageContainer bg-white">{true ? <ThanksMessage /> : null}</div>
                <div>
                    {/* // TODO: stick this at the bottom of the page. */}
                    <a target="_blank" href="https://icons8.com/icon/104/star">
                        Star
                    </a>{" "}
                    icon by{" "}
                    <a target="_blank" href="https://icons8.com">
                        Icons8
                    </a>
                </div>
            </div>
        </PageBase>
    );
};

export default FeedbackPage;
