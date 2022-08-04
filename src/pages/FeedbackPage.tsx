import React, { useState } from "react";

import PageBase from "./PageBase";
import CustomerSupport from "../components/review/CustomerSupport";
import ThanksMessage from "../components/review/ThanksMessage";
import Rating from "../components/review/Rating";
import Testimonial from "../components/review/Testimonial";

const FeedbackPage: React.FC<{}> = props => {
    const [feedbackReceived, setFeedbackReceived] = useState(false);
    return (
        <PageBase>
            <div>
                <div>
                    <Rating text="This helped me start or keep up a gym habit." />
                    <Rating text="I was able to find several apartments near a gym." />
                    <Rating text="I would recommend this service to a friend." />
                    <Testimonial text="Write a review for the site that we can display." />
                </div>
                <div>
                    <CustomerSupport />
                </div>
                <div>{feedbackReceived ? <ThanksMessage /> : null}</div>
            </div>
        </PageBase>
    );
};

export default FeedbackPage;
