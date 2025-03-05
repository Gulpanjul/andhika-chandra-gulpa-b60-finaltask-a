function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function drawSikuSiku(alasTinggi) {
    const primes = [];
    let num = 2;
    while (primes.length < (alasTinggi * (alasTinggi + 1)) / 2) {
        if (isPrime(num)) primes.push(num);
        num++;
    }
    
    let index = 0;
    for (let baris = 1; baris <= alasTinggi; baris++) {
        let line = "";
        for (let kolom = 0; kolom < baris; kolom++) {
            line += primes[index++] + " ";
        }
        console.log(line.trim());
    }
}

drawSikuSiku(7);