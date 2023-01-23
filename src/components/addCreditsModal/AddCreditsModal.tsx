import React, { useContext, useEffect, useState } from "react";
import { useGetFreeCreditsAPI } from "../../api/paymentAPI";
import { CreditsModalContext, ICreditsModalContext } from "../../context/CreditsModalContext";
import Button from "../button/Button";
import StretchButton from "../button/StretchButton";

const AddCreditsModal: React.FC<{}> = ({}) => {
    const { modalIsOpen, closeAddCreditsModal } = useContext(CreditsModalContext) as ICreditsModalContext;

    const [successMsg, setSuccessMsg] = useState("");

    const { success, runGetFreeCredits } = useGetFreeCreditsAPI();

    useEffect(() => {
        if (success) {
            setSuccessMsg("You received free credits! You can now close the modal.");
        }
    }, [success]);

    return (
        <div className={`h-full w-full absolute bg-transparent z-40 ${modalIsOpen ? "" : "hidden"}`}>
            {modalIsOpen ? (
                <div className="w-full h-full flex justify-center items-center bg-zinc-300/50 z-40">
                    <div
                        className="w-full h-full absolute z-30 bg-transparent"
                        onClick={() => {
                            closeAddCreditsModal();
                        }}
                    >
                        {/* // dropdown click target */}
                    </div>
                    <div className="w-1/2 h-1/2 bg-white rounded-xl shadow-xl flex flex-col justify-center items-center">
                        <div className="h-16">
                            <h3>You're out of credits.</h3>
                        </div>
                        <div
                            className="w-36 h-10 flex justify-center z-50"
                            onClick={() => {
                                runGetFreeCredits();
                                closeAddCreditsModal();
                            }}
                        >
                            <StretchButton type="Opaque" text="Get More Free" />
                        </div>
                        <div
                            className="mt-8 w-36 h-10 z-50"
                            onClick={() => {
                                closeAddCreditsModal();
                            }}
                        >
                            <StretchButton type="Opaque" text="No Thanks" />
                        </div>
                        <div className="mt-6">{successMsg ? <p>{successMsg}</p> : null}</div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};
export default AddCreditsModal;
