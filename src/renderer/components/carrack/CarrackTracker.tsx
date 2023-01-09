import subEventHelper from "@common/subEvent";
import dataDict from "@src/typings/data";
import React, { useEffect } from "react";
import CarrackInventory from "./CarrackInventory";
import CarrackMenu from "./CarrackMenu";
import CarrackNeed from "./CarrackNeed";

import "./CarrackTracker.scss"


type Props = {
    data: dataDict;
    boatType: any;
}

const CarrackTracker = (props: Props) => {

    const [state, setState] = React.useState("inventory");
    const [content, setContent] = React.useState<JSX.Element>(<div><p>loading...</p></div> as JSX.Element);

    const boatType = props.boatType;

    const inventory = props.data.save.inventory[0];



    useEffect(() => {
        switch(state) {
            case "inventory":
                console.log("CarrackTracker: ", inventory);
                setContent(
                    <div className="carrack">
                        <div className="carrack-left">
                            <CarrackMenu data={props.data} state="inventory" setState={setState} />
                        </div>
                        <div className="carrack-center">
                            <CarrackInventory data={props.data} />
                        </div>
                        <div className="carrack-right">
                            <CarrackNeed data={props.data} boatType={boatType} />
                        </div>
                    </div>
                )
                break;
            case "tracker":
                setContent(
                    <div className="carrack">
                        <div className="carrack-left">
                            <CarrackMenu data={props.data} state="tracker" setState={setState} />
                        </div>
                        <div className="carrack-center">
                            <p>Tracker</p>
                        </div>
                        <div className="carrack-right">
                            <CarrackNeed data={props.data} boatType={boatType} />
                        </div>
                    </div>
                )
                break;
            default:
                setContent(
                    <div>
                        <p>loading...</p>
                    </div>
                )
                break;
        }
        
        subEventHelper.getInstance().callEvent('update-carrack-need', inventory)
    }, [state])

    return (
        <div className="app-carrack-tracker">
            {content}
        </div>
    );
};

export default CarrackTracker;