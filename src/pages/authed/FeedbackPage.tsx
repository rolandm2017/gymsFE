import React, { useEffect, useState } from "react";

import PageBase from "../PageBase";
import ThanksMessage from "../../components/review/ThanksMessage";
import Rating from "../../components/review/Rating";
import Testimonial from "../../components/review/Testimonial";
import FeatureRequest from "../../components/review/FeatureRequest";

import "./FeedbackPage.scss";
import WithAuthentication from "../../components/hoc/WithAuth";
import Button from "../../components/button/Button";
import { useSendCustomerFeedbackAPI, useSendFeatureRequestAPI } from "../../api/feedbackAPI";

const FeedbackPage: React.FC<{}> = props => {
    const [ratingOne, setRatingOne] = useState(0);
    const [ratingTwo, setRatingTwo] = useState(0);
    const [ratingThree, setRatingThree] = useState(0);
    const [testimonialText, setTestimonialText] = useState("");
    const [featureReqAnswerOne, setFeatureReqAnswerOne] = useState("");
    const [featureReqAnswerTwo, setFeatureReqAnswerTwo] = useState("");

    const { feedbackSuccess, sendCustomerFeedback } = useSendCustomerFeedbackAPI();

    const { featureReqSuccess, sendFeatureReq } = useSendFeatureRequestAPI();

    return (
        <PageBase>
            <div className="flex flex-col">
                <div className="w-full flex flex-col md:flex-row">
                    <div className="ratingContainer  py-4 flex flex-col bg-white">
                        <Rating text="This helped me start or keep up a gym habit." valueReporter={setRatingOne} />
                        <Rating text="I was able to find several apartments near a gym." valueReporter={setRatingTwo} />
                        <Rating text="I would recommend this service to a friend." valueReporter={setRatingThree} />
                        <Testimonial text="Leave a review for us!" valueReporter={setTestimonialText} />

                        <div className="pl-8 pt-2">
                            <div>
                                <Button
                                    type="Opaque"
                                    text="Submit"
                                    onClickHandler={() => {
                                        sendCustomerFeedback(ratingOne, ratingTwo, ratingThree, testimonialText);
                                    }}
                                />
                            </div>
                            <div>{feedbackSuccess ? <p>Feedback received!</p> : null}</div>
                        </div>
                    </div>
                </div>
                <div className="featureRequestContainer my-3.5 pb-4 bg-white">
                    <FeatureRequest answerOneReporter={setFeatureReqAnswerOne} answerTwoReporter={setFeatureReqAnswerTwo} />

                    <div className="pl-8 pt-4">
                        <div>
                            <Button
                                type="Opaque"
                                text="Submit"
                                onClickHandler={() => {
                                    sendFeatureReq(featureReqAnswerOne, featureReqAnswerTwo);
                                }}
                            />
                        </div>
                        <div>{featureReqSuccess ? <p>Feature request received!</p> : null}</div>
                    </div>
                </div>
                <div className="thanksMessageContainer bg-white">{true ? <ThanksMessage /> : null}</div>
                <div>
                    {/* // TODO: stick this at the bottom of the page. */}
                    <a target="_blank" href="https://icons8.com/icon/104/star" rel="noreferrer">
                        Star
                    </a>{" "}
                    icon by{" "}
                    <a target="_blank" href="https://icons8.com" rel="noreferrer">
                        Icons8
                    </a>
                </div>
            </div>
        </PageBase>
    );
};

export default WithAuthentication(FeedbackPage);
