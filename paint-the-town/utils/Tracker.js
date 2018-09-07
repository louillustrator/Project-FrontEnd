import haversine from 'haversine';

export default _haversine = (coordArray) => {
    if (coordArray.length > 1) {
        let metometer = 0;
        for (let i = 0; i < coordArray.length - 1; i++) {
            metometer += haversine(coordArray[i], coordArray[i + 1], { unit: 'meter' })
            //other measurements: 'km'(default), 'mile', 'nmi'
        }
        return metometer
    }
}

