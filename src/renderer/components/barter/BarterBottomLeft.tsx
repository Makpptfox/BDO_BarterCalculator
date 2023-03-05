import React from "react";

import dataDict from "@src/typings/data";

import "./BarterBottomLeft.scss";
import subEventHelper from "@common/subEvent";

type Props = {
    data: dataDict;
}

const BarterBottomLeft: React.FC<Props> = (props: Props) => {

    const [iliyaThreshold, _setIliyaThreshold] = React.useState(props.data.save.threshold[0].iliya[0]);
    const [epheriaThreshold, _setEpheriaThreshold] = React.useState(props.data.save.threshold[0].epheria[0]);
    const [ancadoThreshold, _setAncadoThreshold] = React.useState(props.data.save.threshold[0].ancado[0]);

    const filter = require('../../../../assets/icons/filter.svg')

    
    /**
     * Set Iliya Threshold
     * @param event
     * @returns void
     * @description Set Iliya Threshold and send the value to the props data, then save it in the save_data.xml file in the user's home directory.
     * @todo Save the value in the save_data.xml file in the user's home directory.
     */
    const setIliyaThreshold = (event: React.ChangeEvent<HTMLInputElement>) => {

        props.data.save.threshold[0].iliya[0] = event.target.value;


        subEventHelper.getInstance().callEvent("threshold-change", "iliya", event.target.value);

        _setIliyaThreshold(event.target.value);
    }

    /**
     * Set Epheria Threshold
     * @param event
     * @returns void
     * @description Set Epheria Threshold and send the value to the props data, then save it in the save_data.xml file in the user's home directory.
     * @todo Save the value in the save_data.xml file in the user's home directory.
     */
    const setEpheriaThreshold = (event: React.ChangeEvent<HTMLInputElement>) => {

        props.data.save.threshold[0].epheria[0] = event.target.value;

        subEventHelper.getInstance().callEvent("threshold-change", "epheria", event.target.value);

        _setEpheriaThreshold(event.target.value);
    }

    /**
     * Set Ancado Threshold
     * @param event
     * @returns void
     * @description Set Ancado Threshold and send the value to the props data, then save it in the save_data.xml file in the user's home directory.
     * @todo Save the value in the save_data.xml file in the user's home directory.
     */
    const setAncadoThreshold = (event: React.ChangeEvent<HTMLInputElement>) => {

        props.data.save.threshold[0].ancado[0] = event.target.value;

        subEventHelper.getInstance().send("threshold-change", "ancado", event.target.value);

        _setAncadoThreshold(event.target.value);
    }

    const openFilter = () => {
        subEventHelper.getInstance().callEvent("open_setTier_page");
    }

    
    const mouseHover = () => {
        subEventHelper.getInstance().callEvent("rAdvice", props.data.lang.barter[0].bottom[0].left[0].tresholdAdvice[0]);
    };

    const mouseOut = () => {
        subEventHelper.getInstance().callEvent("rAdvice", "");
    };

        return(
            <div className="app-barter-bottom-left">
                <div className="app-barter-bottom-left-content-zone">
                    <div className="app-barter-bottom-left-content-zone-title">
                        <p>{props.data.lang.barter[0].bottom[0].left[0].title[0]}</p>
                    </div>
                    <div className="app-barter-bottom-left-content-zone-content">
                        <div className="app-barter-bottom-left-content-zone-content-item">
                            <input type="number" placeholder="0" defaultValue={iliyaThreshold} min="0" onChange={setIliyaThreshold} onMouseOver={mouseHover} onMouseOut={mouseOut}/>
                            <p>Iliya</p>
                        </div>
                        <div className="app-barter-bottom-left-content-zone-content-item">
                            <input type="number" placeholder="0" defaultValue={epheriaThreshold} min="0" onChange={setEpheriaThreshold} onMouseOver={mouseHover} onMouseOut={mouseOut}/>
                            <p>Epheria</p>
                        </div>
                        <div className="app-barter-bottom-left-content-zone-content-item">
                            <input type="number" placeholder="0" defaultValue={ancadoThreshold} min="0" onChange={setAncadoThreshold} onMouseOver={mouseHover} onMouseOut={mouseOut}/>
                            <p>Ancado</p>
                        </div>
                    </div>
                </div>
                <div className="app-barter-bottom-left-filter">
                    <img src={filter} alt="cog" width="48" height="48" onClick={openFilter}/>
                </div>
            </div>
        )
    }

export default BarterBottomLeft;