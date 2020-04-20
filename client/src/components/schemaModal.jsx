import React from 'react';

import ReactBpmn from './ReactBpmn';

export const SchemaModal = (props) => {
    return (
        <div className="schemaModal_wrapper">
            <div className="schemaModal_close"
                onClick={() => {
                    props.closeModal()
                }}>
                <img src={require("../assets/plus_cross2.png")} alt="" />
            </div>
            <ReactBpmn url={props.schema} />
        </div>
    );
}