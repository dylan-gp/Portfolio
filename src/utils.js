import { JSONLoader } from 'three';

const jsonLoader = new JSONLoader();

export function loadModel( path ) {
    return new Promise( ( resolve, reject ) => {
        jsonLoader.load(
            path,
            resolve,
            (eth) => console.log(eth.total),
            error => reject
        );
    });
}
