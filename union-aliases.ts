type Combinable = number | string ; // Type Alias / Custom type
type ConversionDescriptor = 'as-no' | 'as-text';    // Type Alias / Custom type

function combine(
    input1 : Combinable,
    input2 : Combinable,
    resultConversion : ConversionDescriptor
) {
    let result;
    if(typeof input1 == 'number' && typeof input2 == 'number' || resultConversion == 'as-no')
        result = +input1 + +input2;
    else
        result = input1.toString() + input2.toString();

    // if(resultConversion == 'as-no')
    //     result = +result;
    // else
    //     result = result.toString();

    return result;
}

const combinedAges = combine(25,36,'as-no');
console.log(combinedAges);

const combinedStringAges = combine('25','36','as-no');
console.log(combinedStringAges);

const combineNames = combine('Nanda ','Kishore G','as-text');
console.log(combineNames);