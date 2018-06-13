/*
* Copyright (C) 2018 The ontology Authors
* This file is part of The ontology library.
*
* The ontology is free software: you can redistribute it and/or modify
* it under the terms of the GNU Lesser General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* The ontology is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public License
* along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
*/

import { BigNumber } from 'bignumber.js';
import { ERROR_CODE } from './../error';
import { reverseHex } from './../utils';

/* big positive integer based on BigNumber */
export default class BigInt {
    static fromHexstr(hex: string): BigInt {
        hex = reverseHex(hex);
        const bi = new BigNumber(hex, 16).toString();
        return new BigInt(bi);
    }

    value: string | number;

    constructor(value: string | number) {
        const bi = new BigNumber(value);
        if (!bi.isInteger() || bi.isNegative()) {
            throw ERROR_CODE.INVALID_PARAMS;
        }
        this.value = value;
    }

    toHexstr(): string {
        const bi = new BigNumber(this.value);
        let hex = bi.toString(16);
        if (hex.length % 2 !== 0) {
            hex = '0' + hex;
        }
        hex = reverseHex(hex);
        return hex;
    }
}
