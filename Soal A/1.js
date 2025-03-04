function isPrime(num) {
    if (num < 2) return false; // Angka < 2 bukan prima
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false; // Cek pembagian
    }
    return true; // Jika lolos semua, berarti prima
}

function drawSikuSiku(alasTinggi) {
    // 1. Kumpulkan semua bilangan prima yang diperlukan
    const primes = [];
    let num = 2;
    while (primes.length < (alasTinggi * (alasTinggi + 1)) / 2) {
        if (isPrime(num)) primes.push(num);
        num++;
    }
    
    // 2. Cetak per baris
    let index = 0;
    for (let baris = 1; baris <= alasTinggi; baris++) {
        let line = "";
        for (let kolom = 0; kolom < baris; kolom++) {
            line += primes[index++] + " "; // Ambil angka prima urut
        }
        console.log(line.trim()); // Hapus spasi terakhir
    }
}

drawSikuSiku(7);