function sortArray(arr) {
    const sortedArray = [...arr];
    
    function bubbleSort(array, n) {
        if (n === 1) return array;
        
        let adaPertukaran = false;
        
        for (let i = 0; i < n - 1; i++) {
            if (array[i] > array[i + 1]) {
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                adaPertukaran = true;
            }
        }
        
        if (!adaPertukaran) return array;
        
        return bubbleSort(array, n - 1);
    }
    
    const arrayTerurut = bubbleSort(sortedArray, sortedArray.length);
    
    const ganjil = [];
    const genap = [];
    
    for (const angka of arrayTerurut) {
        if (angka % 2 === 0) {
            genap.push(angka);
        } else {
            ganjil.push(angka);
        }
    }
    
    console.log("Array: " + arrayTerurut.join(", "));
    console.log("Ganjil: " + (ganjil.length > 0 ? ganjil.join(", ") : ""));
    console.log("Genap: " + (genap.length > 0 ? genap.join(", ") : ""));
}

sortArray([2, 24, 32, 22, 31, 100, 56, 21, 99, 7, 5, 37, 97, 25, 13, 11]);