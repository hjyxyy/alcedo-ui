import React, {Component, PropTypes} from 'react';

import TableRow from './TableRow';

export default class Tbody extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {columns, data, startIndex} = this.props;

        return (
            <tbody>

                {
                    data.map((row, rowIndex) => {
                        return (
                            <TableRow key={rowIndex}
                                      rowIndex={startIndex + rowIndex}
                                      columns={columns}
                                      data={row}/>
                        );
                    })
                }

            </tbody>
        );

    }
};

Tbody.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
    startIndex: PropTypes.number
};

Tbody.defaultProps = {
    data: [],
    columns: [],
    startIndex: 0
};