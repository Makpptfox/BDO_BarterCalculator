import React from "react";

import dataDict from "@src/typings/data";

import "./BarterLeftItem.scss";
import { barterEventManager } from './barterEventManager';

type Props = {
    data: dataDict;
}

const BarterLeftItem: React.FC<Props> = (props: Props) => {

    const [icon, setIcon] = React.useState<any>(require('@assets/images/items/empty.png'));
    const [name, setName] = React.useState<string>("");
    const [tier, setTier] = React.useState<number>(1);

    barterEventManager.onBarterItemSelect("BarterLeftItem",(icon, tier, name) => {
        setIcon(require('@assets/images/items/'+icon));
        setName(name);
        setTier(tier);
    });

    return(
        <div className={`app-barter-left-content-zone-item zone-item-tier-${tier}`}>

            <div className="app-barter-left-content-zone-item-icon">
                <img src={icon} />
            </div>

            <div className="app-barter-left-content-zone-item-name">
                <p>{name}</p>
            </div>

            <div className="app-barter-left-content-zone-item-tier">
                <p>Tier {tier}</p>
            </div>
        </div>

    )

}

export default BarterLeftItem;