import React from 'react';

class Reset extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <button
                className="reset"
                onClick={() => this.props.onclick()}
            >
                リセット
            </button>
        );
    }
}

export default Reset;
