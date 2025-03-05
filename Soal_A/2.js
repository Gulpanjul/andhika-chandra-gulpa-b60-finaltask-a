function hitungVoucher(voucher, jumlahBelanja) {

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

    let diskon = 0;
    
    if (jumlahBelanja >= minBelanja) {
        let diskonSementara = jumlahBelanja * diskonPersen;
        
        diskon = Math.min(diskonSementara, maxDiskon);
        
        diskon = Math.floor(diskon);
    }

    const uangBayar = jumlahBelanja - diskon;
    const kembalian = diskon;

    console.log("Uang yang harus dibayar : " + uangBayar);
    console.log("Diskon : " + diskon);
    console.log("Kembalian : " + kembalian);
}

hitungVoucher("DumbWaysJos", 100000);
hitungVoucher("DumbWaysMantap", 100000);