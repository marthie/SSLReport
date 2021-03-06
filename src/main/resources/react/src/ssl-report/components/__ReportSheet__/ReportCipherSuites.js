/*

 The MIT License (MIT)

 Copyright (c) 2018 Marius Thiemann <marius dot thiemann at ploin dot de>

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.


 */

import React from 'react';
import PropTypes from 'prop-types';

export default function ReportCipherSuitesTable({reportCipherSuites}) {
    const cipherSuitesRows = [];

    reportCipherSuites.map((cipherSuiteObject) => {
        console.log("rendering cipher suites for version " + cipherSuiteObject.version + " with "
            + cipherSuiteObject.cipherSuiteStrings.length + " items...");

        cipherSuitesRows.push(<CipherSuitesRow key={cipherSuiteObject.uiKey}
                                               version={cipherSuiteObject.version}
                                               cipherSuiteStrings={cipherSuiteObject.cipherSuiteStrings}/>);
    });


    return (<table className="table table-bordered">
        <tbody>{cipherSuitesRows}</tbody>
    </table>);
}

ReportCipherSuitesTable.propTypes = {
    reportCipherSuites: PropTypes.array.isRequired
}

function CipherSuitesRow({version, cipherSuiteStrings}) {
    const row = (<tr>
        <th scope="row">{version}</th>
        <td>
            {cipherSuiteStrings.map((cipherSuiteString) => <p key={cipherSuiteString.uiKey}>{cipherSuiteString.name}</p>)}
        </td>
    </tr>);

    return row;
}

CipherSuitesRow.propTypes = {
    version: PropTypes.string.isRequired,
    cipherSuiteStrings: PropTypes.array.isRequired
}