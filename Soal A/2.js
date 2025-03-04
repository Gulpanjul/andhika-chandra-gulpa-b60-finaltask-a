function hitungVoucher(voucher, jumlahBelanja) {
    // 1. Tentukan aturan voucher
    let minBelanja, diskonPersen, maxDiskon;
    
    if (voucher === "DumbWaysJos") {
        minBelanja = 50000;
        diskonPersen = 0.211; // 21.1%
        maxDiskon = 20000;
    } else if (voucher === "DumbWaysMantap") {
        minBelanja = 80000;
        diskonPersen = 0.3; // 30%
        maxDiskon = 40000;
    } else {
        console.log("Voucher tidak valid");
        return;
    }

    // 2. Hitung diskon
    let diskon = 0;
    
    if (jumlahBelanja >= minBelanja) {
        // Hitung diskon sementara
        let diskonSementara = jumlahBelanja * diskonPersen;
        
        // Pastikan tidak melebihi max diskon
        diskon = Math.min(diskonSementara, maxDiskon);
        
        // Bulatkan ke bawah (sesuai contoh)
        diskon = Math.floor(diskon);
    }

    // 3. Hitung hasil akhir
    const uangBayar = jumlahBelanja - diskon;
    const kembalian = diskon; // Asumsi pembeli bayar tepat sesuai jumlahBelanja

    // 4. Tampilkan hasil
    console.log("Uang yang harus dibayar : " + uangBayar);
    console.log("Diskon : " + diskon);
    console.log("Kembalian : " + kembalian);
}

// Contoh penggunaan
hitungVoucher("DumbWaysJos", 100000);
hitungVoucher("DumbWaysMantap", 100000);