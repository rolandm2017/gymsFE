import React from "react";

import useMap from "./useMap";

function FancyMap() {
    console.log("Fancy map start");
    const onInitHandler = (map: any) => {
        // Add data and events here
    };
    const { ref } = useMap({ center: { lon: -73, lat: 43 }, zoom: 4, width: "100%", height: "300px", onInit: onInitHandler });
    // const { ref } = useMap({ center, zoom, onInit: onInitHandler });
    console.log(ref, "11rm");
    // return <div>hi</div>;
    return <div ref={ref} style={{ width: "100%", height: "300px" }} />;
}

export default FancyMap;
