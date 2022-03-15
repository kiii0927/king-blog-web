export default {
    methods: {
        $_isExist(validateData, isEqualValue) {
            // let { attrValueList } = validateData;
            return validateData.some((item) => item.valueName == isEqualValue);
        },
    }
}