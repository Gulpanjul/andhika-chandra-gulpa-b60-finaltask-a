function sortArray(arr) {
    // 1. Salin array agar tidak mengubah aslinya
    const sortedArray = [...arr];
    
    // 2. Fungsi rekursif bubble sort
    function bubbleSort(array, n) {
        // Basis: jika panjang array 1, sudah terurut
        if (n === 1) return array;
        
        let adaPertukaran = false;
        
        // Cek pasangan angka dan tukar jika perlu
        for (let i = 0; i < n - 1; i++) {
            if (array[i] > array[i + 1]) {
                // Tukar posisi
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                adaPertukaran = true;
            }
        }
        
        // Jika tidak ada pertukaran, array sudah terurut
        if (!adaPertukaran) return array;
        
        // Panggil rekursif untuk bagian yang belum terurut
        return bubbleSort(array, n - 1);
    }
    
    // 3. Panggil bubble sort untuk mengurutkan
    const arrayTerurut = bubbleSort(sortedArray, sortedArray.length);
    
    // 4. Pisahkan ganjil dan genap
    const ganjil = [];
    const genap = [];
    
    for (const angka of arrayTerurut) {
        if (angka % 2 === 0) {
            genap.push(angka);
        } else {
            ganjil.push(angka);
        }
    }
    
    // 5. Tampilkan hasil
    console.log("Array: " + arrayTerurut.join(", "));
    console.log("Ganjil: " + (ganjil.length > 0 ? ganjil.join(", ") : ""));
    console.log("Genap: " + (genap.length > 0 ? genap.join(", ") : ""));
}

// Contoh penggunaan
sortArray([2, 24, 32, 22, 31, 100, 56, 21, 99, 7, 5, 37, 97, 25, 13, 11]);