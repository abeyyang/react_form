import React, { PropTypes } from 'react';

const Column = (props) => {
    const { data } = props;

    return (
        <div><p>{data.value}</p></div>
    );
};

Column.propTypes = {
    data: PropTypes.object
};

export default Column;
