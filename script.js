// ============================================================
// 1. DATA - ฟังก์ชันแปลงวันที่
// ============================================================
function convertToAD(dateStr) {
    if (!dateStr || dateStr === 'ตลอดชีพ') return dateStr;
    const parts = dateStr.trim().split(' ');
    const datePart = parts[0];
    if (!datePart) return dateStr;
    const ymd = datePart.split('-');
    if (ymd.length !== 3) return dateStr;
    let y = parseInt(ymd[0], 10);
    const m = parseInt(ymd[1], 10);
    const d = parseInt(ymd[2], 10);
    if (y > 2400) y = y - 543;
    return `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}/${y}`;
}

function formatDateDisplay(dateStr) {
    if (!dateStr) return '-';
    if (dateStr === 'ตลอดชีพ') return 'ตลอดชีพ';
    return convertToAD(dateStr);
}

// ============================================================
// 2. DATE CHECK FUNCTIONS
// ============================================================
function parseBuddhistDate(dateStr) {
    if (!dateStr || dateStr === 'ตลอดชีพ') return null;
    const parts = dateStr.trim().split(' ');
    const datePart = parts[0];
    if (!datePart) return null;
    const ymd = datePart.split('-');
    if (ymd.length !== 3) return null;
    let y = parseInt(ymd[0], 10);
    const m = parseInt(ymd[1], 10) - 1;
    const d = parseInt(ymd[2], 10);
    if (y > 2400) y = y - 543;
    return new Date(y, m, d);
}

function isExpired(dateStr) {
    const date = parseBuddhistDate(dateStr);
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
}

function getDaysRemaining(dateStr) {
    if (!dateStr || dateStr === 'ตลอดชีพ') return null;
    const date = parseBuddhistDate(dateStr);
    if (!date) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = date - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function isExpiringSoon(dateStr) {
    const days = getDaysRemaining(dateStr);
    if (days === null) return false;
    return days > 0 && days <= 60;
}

function getDateStatus(dateStr) {
    if (!dateStr) return 'none';
    if (dateStr === 'ตลอดชีพ') return 'lifetime';
    if (isExpired(dateStr)) return 'expired';
    if (isExpiringSoon(dateStr)) return 'warning';
    return 'valid';
}

// ============================================================
// 3. UPDATE STATUS FROM DATES
// ============================================================
function updateStatusFromDates(item) {
    if (item.idCard === 'ตลอดชีพ') {
        item.idStatus = '✔️ ตลอดชีพ';
    } else {
        const status = getDateStatus(item.idCard);
        if (status === 'valid') item.idStatus = '✔️ ปกติ';
        else if (status === 'expired') item.idStatus = '❌ หมดอายุแล้ว';
        else if (status === 'warning') item.idStatus = '⚠️ ใกล้หมดอายุ (2 เดือน)';
        else item.idStatus = '';
    }

    if (item.license === 'ตลอดชีพ') {
        item.licenseStatus = '✔️  ตลอดชีพ';
    } else {
        const status = getDateStatus(item.license);
        if (status === 'valid') item.licenseStatus = '✔️  ปกติ';
        else if (status === 'expired') item.licenseStatus = '❌ หมดอายุแล้ว';
        else if (status === 'warning') item.licenseStatus = '⚠️ ใกล้หมดอายุ (2 เดือน)';
        else item.licenseStatus = '';
    }

    if (item.tax) {
        const status = getDateStatus(item.tax);
        if (status === 'valid') item.taxStatus = '✔️ ปกติ';
        else if (status === 'expired') item.taxStatus = '❌ หมดอายุแล้ว';
        else if (status === 'warning') item.taxStatus = '⚠️ ใกล้หมดอายุ (2 เดือน)';
        else item.taxStatus = '';
    } else {
        item.taxStatus = '';
    }

    if (item.prb) {
        const status = getDateStatus(item.prb);
        if (status === 'valid') item.prbStatus = '✔️ ปกติ';
        else if (status === 'expired') item.prbStatus = '❌ หมดอายุแล้ว';
        else if (status === 'warning') item.prbStatus = '⚠️ ใกล้หมดอายุ (2 เดือน)';
        else item.prbStatus = '';
    } else {
        item.prbStatus = '';
    }
}

// ============================================================
// 4. VEHICLE DATA - ครบ 26 รายการ
// ============================================================
const defaultVehicleData = [
    { id: 1, plate: "30-0131", driver: "นายวิเชียร โชคปลอด", sub: "", idCard: "ตลอดชีพ", idStatus: "✔️ ตลอดชีพ", license: "24/08/2571", licenseStatus: "✔️  ปกติ", registered: "", passengers: 56, dist: 48, time1: "✓", time2: "✓", time3: "✓", fuel: "ดีเซล", tax: "2569-12-31 00:00:00", taxStatus: "", prb: "2569-12-31 00:00:00", prbStatus: "" },
    { id: 2, plate: "นข 3924", driver: "นางสาวผุสดี กันภัย", sub: "", idCard: "2573-11-12 00:00:00", idStatus: "✔️ ปกติ", license: "2569-11-13 00:00:00", licenseStatus: "✔️  ปกติ", registered: "", passengers: 39, dist: 41, time1: "", time2: "✓", time3: "✓", fuel: "ดีเซล", tax: "2569-10-26 00:00:00", taxStatus: "", prb: "2569-10-26 00:00:00", prbStatus: "" },
    { id: 3, plate: "บบ 3436", driver: "นายณัฐพงษ์ พันธ์นันท์", sub: "นายนิพัฒน์ ไล้เลิศ", idCard: "2572-08-20 00:00:00", idStatus: "✔️ ปกติ", license: "2573-08-21 00:00:00", licenseStatus: "✔️  ปกติ", registered: "", passengers: 31, dist: 41, time1: "", time2: "✓", time3: "✓", fuel: "ดีเซล", tax: "", taxStatus: "", prb: "2570-05-10 00:00:00", prbStatus: "" },
    { id: 4, plate: "นค 6349", driver: "นายพิเชฐษ์ โชคปลอด", sub: "", idCard: "2576-02-11 00:00:00", idStatus: "✔️ ปกติ", license: "ตลอดชีพ", licenseStatus: "✔️  ตลอดชีพ", registered: "", passengers: 47, dist: 60, time1: "", time2: "✓", time3: "✓", fuel: "ดีเซล", tax: "2569-09-18 00:00:00", taxStatus: "", prb: "2569-09-18 00:00:00", prbStatus: "" },
    { id: 5, plate: "รว 7914", driver: "นางสาวสำอางค์ โพคา", sub: "นางสาวทัศนีย์ สุขศรี", idCard: "2576-07-13 00:00:00", idStatus: "✔️ ปกติ", license: "ตลอดชีพ", licenseStatus: "✔️  ตลอดชีพ", registered: "", passengers: 35, dist: 68, time1: "", time2: "✓", time3: "✓", fuel: "ดีเซล", tax: "2570-04-28 00:00:00", taxStatus: "", prb: "2570-04-28 00:00:00", prbStatus: "" },
    { id: 6, plate: "นข 5176", driver: "นางสาวสายพิณ สุขโข", sub: "นาวสาวขวัญใจ มนต์ฉันทะ", idCard: "2573-11-14 00:00:00", idStatus: "✔️ ปกติ", license: "ตลอดชีพ", licenseStatus: "✔️  ตลอดชีพ", registered: "", passengers: 35, dist: 52, time1: "✓", time2: "✓", time3: "✓", fuel: "ดีเซล", tax: "", taxStatus: "", prb: "2569-10-29 00:00:00", prbStatus: "" },
    { id: 7, plate: "บษ 3102", driver: "นายกำธร สมบูรณ์", sub: "", idCard: "2576-04-30 00:00:00", idStatus: "✔️ ปกติ", license: "2569-05-01 00:00:00", licenseStatus: "❌ หมดอายุแล้ว", registered: "", passengers: 37, dist: 50, time1: "", time2: "✓", time3: "✓", fuel: "ดีเซล", tax: "2570-04-07 00:00:00", taxStatus: "", prb: "2570-04-10 00:00:00", prbStatus: "" },
    { id: 8, plate: "ผค 1050", driver: "นายจิรวัฒน์ รักงาม", sub: "", idCard: "2576-01-17 00:00:00", idStatus: "✔️ ปกติ", license: "2572-01-18 00:00:00", licenseStatus: "✔️  ปกติ", registered: "", passengers: 38, dist: 65, time1: "", time2: "✓", time3: "✓", fuel: "ดีเซล", tax: "", taxStatus: "", prb: "2569-08-21 00:00:00", prbStatus: "" },
    { id: 9, plate: "ผต 4172", driver: "นายวรเมธ ปาทา", sub: "", idCard: "2575-04-27 00:00:00", idStatus: "✔️ ปกติ", license: "2571-04-28 00:00:00", licenseStatus: "✔️  ปกติ", registered: "", passengers: 23, dist: 30, time1: "", time2: "✓", time3: "✓", fuel: "ดีเซล", tax: "2569-08-31 00:00:00", taxStatus: "", prb: "2570-01-21 00:00:00", prbStatus: "" },
    { id: 10, plate: "ผธ 1202", driver: "นางสาวพลอยไพลิน เติมพันธ์", sub: "", idCard: "2574-01-14 00:00:00", idStatus: "✔️ ปกติ", license: "2573-01-15 00:00:00", licenseStatus: "✔️  ปกติ", registered: "", passengers: 46, dist: 56, time1: "", time2: "✓", time3: "✓", fuel: "ดีเซล", tax: "2570-01-15 00:00:00", taxStatus: "", prb: "2569-12-12 00:00:00", prbStatus: "" },
    { id: 11, plate: "นข 5505", driver: "นายคงสิทธ์ วงษ์รส", sub: "", idCard: "2574-11-25 00:00:00", idStatus: "✔️ ปกติ", license: "2569-11-13 00:00:00", licenseStatus: "✔️  ปกติ", registered: "", passengers: 29, dist: 70, time1: "✓", time2: "✓", time3: "✓", fuel: "ดีเซล", tax: "2570-05-24 00:00:00", taxStatus: "", prb: "2570-05-24 00:00:00", prbStatus: "" },
    { id: 12, plate: "บน 2553", driver: "นายชัชชัย ฉัตรกรด", sub: "", idCard: "2572-10-05 00:00:00", idStatus: "✔️ ปกติ", license: "2572-10-06 00:00:00", licenseStatus: "✔️  ปกติ", registered: "", passengers: 20, dist: 60, time1: "", time2: "✓", time3: "✓", fuel: "ดีเซล", tax: "2570-02-15 00:00:00", taxStatus: "", prb: "2570-03-22 00:00:00", prbStatus: "" },
    { id: 13, plate: "บว 2349", driver: "นายสาโรจน์ รักงาม", sub: "", idCard: "2576-02-10 00:00:00", idStatus: "✔️ ปกติ", license: "2573-02-11 00:00:00", licenseStatus: "✔️  ปกติ", registered: "", passengers: 34, dist: 35, time1: "", time2: "✓", time3: "✓", fuel: "ดีเซล", tax: "2569-08-26 00:00:00", taxStatus: "", prb: "2569-08-26 00:00:00", prbStatus: "" },
    { id: 14, plate: "นข 5287", driver: "นางสาวเกษศีณีย์ วัญเพ็ญ", sub: "", idCard: "2569-08-30 00:00:00", idStatus: "✔️ ปกติ", license: "2569-08-31 00:00:00", licenseStatus: "✔️  ปกติ", registered: "", passengers: 38, dist: 45, time1: "", time2: "✓", time3: "✓", fuel: "ดีเซล", tax: "2570-01-22 00:00:00", taxStatus: "", prb: "2570-01-22 00:00:00", prbStatus: "" },
    { id: 15, plate: "บห 6429", driver: "นายธงชาติ เนียมทรัพย์", sub: "", idCard: "2576-07-07 00:00:00", idStatus: "✔️ ปกติ", license: "2571-07-08 00:00:00", licenseStatus: "✔️  ปกติ", registered: "", passengers: 15, dist: 80, time1: "✓", time2: "✓", time3: "✓", fuel: "ดีเซล", tax: "2569-09-17 00:00:00", taxStatus: "", prb: "2569-09-17 00:00:00", prbStatus: "" },
    { id: 16, plate: "นค 7010", driver: "นางสาวจุฑามาศ ตราชู", sub: "นายวิชัย เทศคง", idCard: "2575-09-29 00:00:00", idStatus: "✔️ ปกติ", license: "2571-09-30 00:00:00", licenseStatus: "✔️  ปกติ", registered: "", passengers: 26, dist: 19, time1: "", time2: "✓", time3: "✓", fuel: "ดีเซล", tax: "2569-08-05 00:00:00", taxStatus: "", prb: "2569-07-31 00:00:00", prbStatus: "" },
    { id: 17, plate: "บน 8763", driver: "นาวสาวสาวิตรี รักงาม", sub: "", idCard: "2574-08-07 00:00:00", idStatus: "✔️ ปกติ", license: "2572-08-08 00:00:00", licenseStatus: "✔️  ปกติ", registered: "", passengers: 45, dist: 36, time1: "", time2: "✓", time3: "✓", fuel: "ดีเซล", tax: "2569-08-15 00:00:00", taxStatus: "", prb: "2569-08-15 00:00:00", prbStatus: "" },
    { id: 18, plate: "นค 7191", driver: "นายวีรยุทธ ปาทา", sub: "", idCard: "ตลอดชีพ", idStatus: "✔️ ตลอดชีพ", license: "ตลอดชีพ", licenseStatus: "✔️  ตลอดชีพ", registered: "", passengers: 54, dist: 80, time1: "✓", time2: "✓", time3: "✓", fuel: "ดีเซล", tax: "2570-06-04 00:00:00", taxStatus: "", prb: "2570-05-28 00:00:00", prbStatus: "" },
    { id: 19, plate: "นข 2344", driver: "นายวินัย สุขศรี", sub: "", idCard: "ตลอดชีพ", idStatus: "✔️ ตลอดชีพ", license: "ตลอดชีพ", licenseStatus: "✔️  ตลอดชีพ", registered: "", passengers: 38, dist: 65, time1: "", time2: "✓", time3: "✓", fuel: "ดีเซล", tax: "", taxStatus: "", prb: "", prbStatus: "" },
    { id: 20, plate: "บว 4479", driver: "นางสาววนิดา ฮั่วจั่น", sub: "", idCard: "2570-10-17 00:00:00", idStatus: "✔️ ปกติ", license: "2572-10-18 00:00:00", licenseStatus: "✔️  ปกติ", registered: "", passengers: 31, dist: 33, time1: "", time2: "✓", time3: "✓", fuel: "ดีเซล", tax: "2569-11-26 00:00:00", taxStatus: "", prb: "2569-11-26 00:00:00", prbStatus: "" },
    { id: 21, plate: "นค 1717", driver: "นายวิบูลย์ ศิริประสม", sub: "", idCard: "2577-01-11 00:00:00", idStatus: "✔️ ปกติ", license: "2570-03-20 00:00:00", licenseStatus: "✔️  ปกติ", registered: "", passengers: 36, dist: 51, time1: "", time2: "✓", time3: "✓", fuel: "ดีเซล", tax: "2570-06-09 00:00:00", taxStatus: "", prb: "2570-06-09 00:00:00", prbStatus: "" },
    { id: 22, plate: "นข 3139", driver: "นางสาวอรสา ชูเลิศ", sub: "นายนิรุธ ชูเลิศ", idCard: "2572-07-25 00:00:00", idStatus: "✔️ ปกติ", license: "2573-07-26 00:00:00", licenseStatus: "✔️  ปกติ", registered: "", passengers: 27, dist: 26, time1: "", time2: "✓", time3: "✓", fuel: "ดีเซล", tax: "2569-08-20 00:00:00", taxStatus: "", prb: "2570-03-31 00:00:00", prbStatus: "" },
    { id: 23, plate: "บษ 4877", driver: "นางสาวอ้อม โชคปลอด", sub: "นายสมบูรณ์ แก้วเขียว", idCard: "2572-04-14 00:00:00", idStatus: "✔️ ปกติ", license: "ตลอดชีพ", licenseStatus: "✔️  ตลอดชีพ", registered: "", passengers: 34, dist: 45, time1: "", time2: "✓", time3: "✓", fuel: "ดีเซล", tax: "2569-08-09 00:00:00", taxStatus: "", prb: "2569-08-21 00:00:00", prbStatus: "" },
    { id: 24, plate: "ผท 2260", driver: "นายเทวะ อุตกะ", sub: "", idCard: "2573-03-30 00:00:00", idStatus: "✔️ ปกติ", license: "2574-03-31 00:00:00", licenseStatus: "✔️  ปกติ", registered: "", passengers: 26, dist: 85, time1: "✓", time2: "✓", time3: "✓", fuel: "ดีเซล", tax: "2570-05-22 00:00:00", taxStatus: "", prb: "2570-06-28 00:00:00", prbStatus: "" },
    { id: 25, plate: "บล 8466", driver: "นายสมมาศ ยอดนิล", sub: "", idCard: "2569-12-05 00:00:00", idStatus: "✔️ ปกติ", license: "2569-08-06 00:00:00", licenseStatus: "❌ หมดอายุแล้ว", registered: "", passengers: 25, dist: 100, time1: "✓", time2: "✓", time3: "✓", fuel: "ดีเซล", tax: "2569-07-10 00:00:00", taxStatus: "", prb: "2569-07-10 00:00:00", prbStatus: "" },
    { id: 26, plate: "ผจ 4689", driver: "นางสาวอรสา ชูเลิศ", sub: "นางสาวอรสา ชูเลิศ", idCard: "2572-07-25 00:00:00", idStatus: "✔️ ปกติ", license: "2573-07-26 00:00:00", licenseStatus: "✔️  ปกติ", registered: "", passengers: 23, dist: 37, time1: "", time2: "✓", time3: "✓", fuel: "CNG สลับเบนซิน", tax: "2569-09-24 00:00:00", taxStatus: "", prb: "2570-05-01 00:00:00", prbStatus: "" }
];

let vehicleData = [];
let editingId = null;
let editData = {};
let currentFilteredData = [];
let isDataLoaded = false;

// ============================================================
// 5. LOAD & SAVE DATA FROM LOCALSTORAGE
// ============================================================
function loadDataFromStorage() {
    const loadingDiv = document.getElementById('loadingIndicator');
    if (loadingDiv) loadingDiv.style.display = 'block';
    
    try {
        const saved = localStorage.getItem('vehicleData');
        if (saved) {
            vehicleData = JSON.parse(saved);
            console.log('✅ โหลดข้อมูลจาก LocalStorage สำเร็จ', vehicleData.length, 'รายการ');
        } else {
            vehicleData = JSON.parse(JSON.stringify(defaultVehicleData));
            saveDataToStorage();
            console.log('✅ ใช้ข้อมูลเริ่มต้น', vehicleData.length, 'รายการ');
        }
        isDataLoaded = true;
        if (loadingDiv) loadingDiv.style.display = 'none';
        applyFilters();
    } catch (error) {
        console.error('❌ โหลดข้อมูลล้มเหลว:', error);
        vehicleData = JSON.parse(JSON.stringify(defaultVehicleData));
        isDataLoaded = true;
        if (loadingDiv) loadingDiv.style.display = 'none';
        applyFilters();
    }
}

function saveDataToStorage() {
    try {
        localStorage.setItem('vehicleData', JSON.stringify(vehicleData));
        console.log('✅ บันทึกข้อมูลลง LocalStorage สำเร็จ');
    } catch (error) {
        console.error('❌ บันทึกข้อมูลล้มเหลว:', error);
    }
}

// ============================================================
// 6. FILTER FUNCTIONS
// ============================================================
function filterExpiredAll() {
    const filtered = vehicleData.filter(item => {
        const licenseStatus = getDateStatus(item.license);
        const taxStatus = getDateStatus(item.tax);
        const prbStatus = getDateStatus(item.prb);
        return licenseStatus === 'expired' || taxStatus === 'expired' || prbStatus === 'expired';
    });
    renderTable(filtered);
    document.getElementById('searchInput').value = '⚠️ หมดอายุทั้งหมด';
    updateStats(filtered);
}

function filterWarningAll() {
    const filtered = vehicleData.filter(item => {
        const licenseStatus = getDateStatus(item.license);
        const taxStatus = getDateStatus(item.tax);
        const prbStatus = getDateStatus(item.prb);
        return licenseStatus === 'warning' || taxStatus === 'warning' || prbStatus === 'warning';
    });
    renderTable(filtered);
    document.getElementById('searchInput').value = '⚠️ ใกล้หมดอายุทั้งหมด';
    updateStats(filtered);
}

// ============================================================
// 7. EXPORT EXCEL
// ============================================================
function exportToExcel() {
    try {
        let dataToExport = currentFilteredData.length > 0 ? currentFilteredData : vehicleData;

        let htmlContent = `
            <html>
            <head>
                <meta charset="UTF-8">
                <title>รายงานสรุปสถานะเอกสารรถ</title>
                <style>
                    @page { size: A3 landscape; margin: 0.5cm; }
                    body { font-family: 'Sukhumvit Set', 'Tahoma', sans-serif; margin: 0; padding: 10px; }
                    h2 { color: #1e4a6e; margin-bottom: 8px; font-size: 18px; }
                    .report-date { margin-bottom: 15px; color: #666; font-size: 11px; }
                    table { border-collapse: collapse; width: 100%; font-size: 10px; }
                    th { background-color: #1e4a6e; color: white; padding: 6px 4px; text-align: center; border: 1px solid #ddd; font-weight: bold; white-space: nowrap; }
                    td { padding: 5px 4px; border: 1px solid #ddd; text-align: center; }
                    td:nth-child(3) { text-align: left; }
                    tr:nth-child(even) { background-color: #f9f9f9; }
                    .footer { margin-top: 15px; text-align: right; font-size: 9px; color: #999; }
                    .status-valid { color: #166534; font-weight: bold; }
                    .status-expired { color: #991b1b; font-weight: bold; }
                    .status-warning { color: #854d0e; font-weight: bold; }
                    .status-lifetime { color: #1e40af; font-weight: bold; }
                </style>
            </head>
            <body>
                <h2>📊 รายงานสรุปสถานะเอกสารรถรับ-ส่ง</h2>
                <div class="report-date">
                    สร้างเมื่อ: ${new Date().toLocaleString('th-TH')}
                    | จำนวนรถ: ${dataToExport.length} คัน
                </div>
                <table>
                    <thead>
                        <tr>
                            <th style="width:5%">#</th>
                            <th style="width:8%">ทะเบียนรถ</th>
                            <th style="width:12%">ผู้ขับขี่</th>
                            <th style="width:8%">บัตรประชาชน</th>
                            <th style="width:6%">สถานะ</th>
                            <th style="width:8%">ใบขับขี่</th>
                            <th style="width:6%">สถานะ</th>
                            <th style="width:6%">จดทะเบียน</th>
                            <th style="width:5%">ผู้โดยสาร</th>
                            <th style="width:5%">ระยะทาง</th>
                            <th style="width:6%">08.00-17.00</th>
                            <th style="width:6%">17.00-20.00</th>
                            <th style="width:6%">20.00-08.00</th>
                            <th style="width:6%">น้ำมัน</th>
                            <th style="width:7%">ภาษี</th>
                            <th style="width:6%">สถานะ</th>
                            <th style="width:7%">พรบ.</th>
                            <th style="width:6%">สถานะ</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        dataToExport.forEach(item => {
            const idCardDisplay = item.idCard === 'ตลอดชีพ' ? 'ตลอดชีพ' : formatDateDisplay(item.idCard);
            const licenseDisplay = item.license === 'ตลอดชีพ' ? 'ตลอดชีพ' : formatDateDisplay(item.license);
            const taxDisplay = item.tax ? formatDateDisplay(item.tax) : '-';
            const prbDisplay = item.prb ? formatDateDisplay(item.prb) : '-';

            const idStatus = getDateStatus(item.idCard);
            const licenseStatus = getDateStatus(item.license);
            const taxStatus = getDateStatus(item.tax);
            const prbStatus = getDateStatus(item.prb);

            function getStatusText(status) {
                if (status === 'lifetime') return 'ตลอดชีพ';
                if (status === 'expired') return 'หมดอายุ';
                if (status === 'warning') return 'ใกล้หมดอายุ';
                if (status === 'valid') return 'ปกติ';
                return '-';
            }

            function getStatusClass(status) {
                if (status === 'lifetime') return 'status-lifetime';
                if (status === 'expired') return 'status-expired';
                if (status === 'warning') return 'status-warning';
                if (status === 'valid') return 'status-valid';
                return '';
            }

            htmlContent += `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.plate}</td>
                    <td style="text-align:left">${item.driver}${item.sub ? ' (' + item.sub + ')' : ''}</td>
                    <td>${idCardDisplay}</td>
                    <td class="${getStatusClass(idStatus)}">${getStatusText(idStatus)}</td>
                    <td>${licenseDisplay}</td>
                    <td class="${getStatusClass(licenseStatus)}">${getStatusText(licenseStatus)}</td>
                    <td>${item.registered || '-'}</td>
                    <td>${item.passengers}</td>
                    <td>${item.dist}</td>
                    <td>${item.time1 || '-'}</td>
                    <td>${item.time2 || '-'}</td>
                    <td>${item.time3 || '-'}</td>
                    <td>${item.fuel}</td>
                    <td>${taxDisplay}</td>
                    <td class="${getStatusClass(taxStatus)}">${getStatusText(taxStatus)}</td>
                    <td>${prbDisplay}</td>
                    <td class="${getStatusClass(prbStatus)}">${getStatusText(prbStatus)}</td>
                </tr>
            `;
        });

        htmlContent += `
                    </tbody>
                </table>
                <div class="footer">
                    สร้างโดยระบบบริหารจัดการรถรับ-ส่ง | จำนวนรถ: ${dataToExport.length} คัน
                </div>
            </body>
            </html>
        `;

        let blob = new Blob([htmlContent], { type: "application/vnd.ms-excel" });
        let link = document.createElement("a");
        let url = URL.createObjectURL(blob);
        link.href = url;
        let now = new Date();
        let fileName = `vehicle_report_${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}.xls`;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        alert("✅ ส่งออก Excel สำเร็จ! ไฟล์อยู่ในโฟลเดอร์ Downloads");
    } catch (error) {
        console.error("Export Error:", error);
        alert("เกิดข้อผิดพลาด: " + error.message);
    }
}

// ============================================================
// 8. RENDER TABLE
// ============================================================
function getStatusBadge(status) {
    if (status === 'lifetime') return '<span class="badge badge-info">ตลอดชีพ</span>';
    if (status === 'expired') return '<span class="badge badge-danger">หมดอายุ</span>';
    if (status === 'warning') return '<span class="badge badge-warning">⚠️ ใกล้หมดอายุ</span>';
    if (status === 'valid') return '<span class="badge badge-success">ปกติ</span>';
    return '<span class="badge badge-muted">-</span>';
}

function renderTimeCheck(value) {
    if (!value) return `<span class="time-check inactive">−</span>`;
    return `<span class="time-check active">✓</span>`;
}

function renderEditField(value, field, type = 'text') {
    const currentVal = editData[field] !== undefined ? editData[field] : value;
    
    if (type === 'select_registered') {
        return `<select class="edit-select" onchange="updateEditData('${field}', this.value)">
            <option value="" ${currentVal === '' ? 'selected' : ''}>-</option>
            <option value="มี" ${currentVal === 'มี' ? 'selected' : ''}>มี</option>
        </select>`;
    }
    
    if (type === 'time_check') {
        const checked = currentVal === '✓' ? 'checked' : '';
        return `<input class="edit-check" type="checkbox" ${checked} onchange="updateEditData('${field}', this.checked ? '✓' : '')" />`;
    }
    
    if (type === 'number') {
        return `<input class="edit-input" type="number" value="${currentVal || ''}" style="width:50px;" onchange="updateEditData('${field}', this.value)" />`;
    }
    
    if (type === 'date') {
        let displayValue = '';
        
        if (currentVal === 'ตลอดชีพ') {
            displayValue = 'ตลอดชีพ';
        } else if (currentVal && currentVal !== 'ตลอดชีพ') {
            const parts = currentVal.trim().split(' ');
            const datePart = parts[0];
            if (datePart) {
                const ymd = datePart.split('-');
                if (ymd.length === 3) {
                    const d = ymd[2];
                    const m = ymd[1];
                    const y = ymd[0];
                    displayValue = `${d}/${m}/${y}`;
                }
            }
        }
        
        return `
            <div style="display:flex; align-items:center; gap:4px; position:relative; flex-wrap:wrap;">
                <input class="edit-input" type="text" value="${displayValue}" 
                    placeholder="DD/MM/YYYY หรือ ตลอดชีพ" style="width:130px;"
                    onchange="updateEditDataThaiDate('${field}', this.value)" 
                    onfocus="this.select()" />
                <button class="btn-calendar" onclick="openThaiCalendar('${field}')" 
                    style="padding:4px 10px; border:none; border-radius:6px; background:#3b82f6; color:white; cursor:pointer; font-size:14px;">📅</button>
                <button class="btn-lifetime" onclick="setLifetime('${field}')" 
                    style="padding:4px 10px; border:none; border-radius:6px; background:#8b5cf6; color:white; cursor:pointer; font-size:12px; white-space:nowrap;">♾️ ตลอดชีพ</button>
            </div>
            <div id="calendar_${field}" style="display:none; position:absolute; background:white; border:1px solid #ccc; border-radius:12px; padding:12px; z-index:1000; box-shadow:0 4px 20px rgba(0,0,0,0.15); width:280px; margin-top:4px;">
                <div id="calendarHeader_${field}" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                    <button onclick="changeThaiMonth('${field}', -1)" style="background:none; border:none; font-size:20px; cursor:pointer;">◀</button>
                    <span id="calendarMonthYear_${field}" style="font-weight:bold; font-size:16px;"></span>
                    <button onclick="changeThaiMonth('${field}', 1)" style="background:none; border:none; font-size:20px; cursor:pointer;">▶</button>
                </div>
                <div style="display:grid; grid-template-columns:repeat(7,1fr); gap:4px; text-align:center; font-size:13px; font-weight:bold; color:#666; margin-bottom:8px;">
                    <span>อา</span><span>จ</span><span>อ</span><span>พ</span><span>พฤ</span><span>ศ</span><span>ส</span>
                </div>
                <div id="calendarDays_${field}" style="display:grid; grid-template-columns:repeat(7,1fr); gap:4px; text-align:center;"></div>
            </div>
        `;
    }
    
    return `<input class="edit-input" type="text" value="${currentVal || ''}" 
                onchange="updateEditData('${field}', this.value)" onfocus="this.select()" />`;
}

function renderTable(data) {
    currentFilteredData = data;
    const tbody = document.getElementById('tableBody');
    if (!data || data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="19" class="no-data">📭 ไม่พบข้อมูล</td></tr>`;
        return;
    }

    let html = '';
    data.forEach(item => {
        const isEditing = editingId === item.id;

        const idCardDisplay = item.idCard === 'ตลอดชีพ' ? 'ตลอดชีพ' : formatDateDisplay(item.idCard);
        const idStatus = getDateStatus(item.idCard);
        const idStatusBadge = getStatusBadge(idStatus);

        const licenseDisplay = item.license === 'ตลอดชีพ' ? 'ตลอดชีพ' : formatDateDisplay(item.license);
        const licenseStatus = getDateStatus(item.license);
        const licenseBadge = getStatusBadge(licenseStatus);

        const taxDisplay = item.tax ? formatDateDisplay(item.tax) : '-';
        const taxStatus = getDateStatus(item.tax);
        const taxStatusBadge = getStatusBadge(taxStatus);

        const prbDisplay = item.prb ? formatDateDisplay(item.prb) : '-';
        const prbStatus = getDateStatus(item.prb);
        const prbStatusBadge = getStatusBadge(prbStatus);

        const registeredDisplay = item.registered || '-';

        if (isEditing) {
            html += `
                <tr class="editing">
                    <td>${item.id}</td>
                    <td>${renderEditField(item.plate, 'plate')}</td>
                    <td>
                        ${renderEditField(item.driver, 'driver')}
                        ${renderEditField(item.sub || '', 'sub')}
                    </td>
                    <td>${renderEditField(item.idCard, 'idCard', 'date')}</td>
                    <td>${renderEditField(item.idStatus, 'idStatus')}</td>
                    <td>${renderEditField(item.license, 'license', 'date')}</td>
                    <td>${renderEditField(item.licenseStatus, 'licenseStatus')}</td>
                    <td>${renderEditField(item.registered, 'registered', 'select_registered')}</td>
                    <td>${renderEditField(item.passengers, 'passengers', 'number')}</td>
                    <td>${renderEditField(item.dist, 'dist', 'number')}</td>
                    <td>${renderEditField(item.time1, 'time1', 'time_check')}</td>
                    <td>${renderEditField(item.time2, 'time2', 'time_check')}</td>
                    <td>${renderEditField(item.time3, 'time3', 'time_check')}</td>
                    <td>${renderEditField(item.fuel, 'fuel')}</td>
                    <td>${renderEditField(item.tax, 'tax', 'date')}</td>
                    <td>${renderEditField(item.taxStatus, 'taxStatus')}</td>
                    <td>${renderEditField(item.prb, 'prb', 'date')}</td>
                    <td>${renderEditField(item.prbStatus, 'prbStatus')}</td>
                    <td>
                        <button class="action-btn save" onclick="saveEdit(${item.id})">💾</button>
                        <button class="action-btn cancel" onclick="cancelEdit()">✖</button>
                    </td>
                </tr>
            `;
        } else {
            html += `
                <tr>
                    <td>${item.id}</td>
                    <td><span class="plate-code">${item.plate}</span></td>
                    <td>
                        <div class="driver-main">${item.driver}</div>
                        ${item.sub ? `<span class="driver-sub">📌 ${item.sub}</span>` : ''}
                    </td>
                    <td>${idCardDisplay}</td>
                    <td>${idStatusBadge}</td>
                    <td>${licenseDisplay}</td>
                    <td>${licenseBadge}</td>
                    <td>${registeredDisplay}</td>
                    <td>${item.passengers}</td>
                    <td>${item.dist}</td>
                    <td>${renderTimeCheck(item.time1)}</td>
                    <td>${renderTimeCheck(item.time2)}</td>
                    <td>${renderTimeCheck(item.time3)}</td>
                    <td>${item.fuel}</td>
                    <td>${taxDisplay}</td>
                    <td>${taxStatusBadge}</td>
                    <td>${prbDisplay}</td>
                    <td>${prbStatusBadge}</td>
                    <td>
                        <button class="action-btn edit" onclick="startEdit(${item.id})">✏️</button>
                    </td>
                </tr>
            `;
        }
    });
    tbody.innerHTML = html;
    updateStats(data);
}

// ============================================================
// 9. EDIT FUNCTIONS
// ============================================================
function startEdit(id) {
    const item = vehicleData.find(d => d.id === id);
    if (!item) return;
    editingId = id;
    editData = { ...item };
    applyFilters();
}

function updateEditData(field, value) {
    editData[field] = value;
    
    const dateFields = ['idCard', 'license', 'tax', 'prb'];
    if (dateFields.includes(field)) {
        updateEditStatus(field, value);
    }
    
    applyFilters();
}

function setLifetime(field) {
    editData[field] = 'ตลอดชีพ';
    
    if (field === 'idCard') {
        editData.idStatus = '✔️ ตลอดชีพ';
    } else if (field === 'license') {
        editData.licenseStatus = '✔️  ตลอดชีพ';
    } else if (field === 'tax') {
        editData.taxStatus = '';
    } else if (field === 'prb') {
        editData.prbStatus = '';
    }
    
    const input = document.querySelector(`input[onchange*="updateEditDataThaiDate('${field}']")`);
    if (input) {
        input.value = 'ตลอดชีพ';
    }
    
    const calendar = document.getElementById(`calendar_${field}`);
    if (calendar) {
        calendar.style.display = 'none';
    }
    
    applyFilters();
}

function updateEditDataThaiDate(field, value) {
    if (value.trim() === 'ตลอดชีพ') {
        setLifetime(field);
        return;
    }
    
    const parts = value.split('/');
    if (parts.length === 3) {
        const d = parts[0].padStart(2, '0');
        const m = parts[1].padStart(2, '0');
        const y = parts[2];
        if (y.length === 4 && !isNaN(y) && !isNaN(m) && !isNaN(d)) {
            const buddhistDate = `${y}-${m}-${d} 00:00:00`;
            editData[field] = buddhistDate;
            updateEditStatus(field, buddhistDate);
            applyFilters();
            return;
        }
    }
    
    alert('กรุณาป้อนวันที่ในรูปแบบ DD/MM/YYYY เช่น 19/06/2569 หรือพิมพ์ "ตลอดชีพ"');
}

function updateEditStatus(field, value) {
    if (field === 'idCard') {
        if (value === 'ตลอดชีพ') {
            editData.idStatus = '✔️ ตลอดชีพ';
        } else {
            const status = getDateStatus(value);
            if (status === 'valid') editData.idStatus = '✔️ ปกติ';
            else if (status === 'expired') editData.idStatus = '❌ หมดอายุแล้ว';
            else if (status === 'warning') editData.idStatus = '⚠️ ใกล้หมดอายุ (2 เดือน)';
            else editData.idStatus = '';
        }
    }
    
    if (field === 'license') {
        if (value === 'ตลอดชีพ') {
            editData.licenseStatus = '✔️  ตลอดชีพ';
        } else {
            const status = getDateStatus(value);
            if (status === 'valid') editData.licenseStatus = '✔️  ปกติ';
            else if (status === 'expired') editData.licenseStatus = '❌ หมดอายุแล้ว';
            else if (status === 'warning') editData.licenseStatus = '⚠️ ใกล้หมดอายุ (2 เดือน)';
            else editData.licenseStatus = '';
        }
    }
    
    if (field === 'tax') {
        if (value) {
            const status = getDateStatus(value);
            if (status === 'valid') editData.taxStatus = '✔️ ปกติ';
            else if (status === 'expired') editData.taxStatus = '❌ หมดอายุแล้ว';
            else if (status === 'warning') editData.taxStatus = '⚠️ ใกล้หมดอายุ (2 เดือน)';
            else editData.taxStatus = '';
        } else {
            editData.taxStatus = '';
        }
    }
    
    if (field === 'prb') {
        if (value) {
            const status = getDateStatus(value);
            if (status === 'valid') editData.prbStatus = '✔️ ปกติ';
            else if (status === 'expired') editData.prbStatus = '❌ หมดอายุแล้ว';
            else if (status === 'warning') editData.prbStatus = '⚠️ ใกล้หมดอายุ (2 เดือน)';
            else editData.prbStatus = '';
        } else {
            editData.prbStatus = '';
        }
    }
}

function saveEdit(id) {
    const index = vehicleData.findIndex(d => d.id === id);
    if (index === -1) return;
    
    Object.keys(editData).forEach(key => {
        vehicleData[index][key] = editData[key];
    });
    
    updateStatusFromDates(vehicleData[index]);
    
    editingId = null;
    editData = {};
    applyFilters();
    checkExpirations();
    saveDataToStorage();
    alert('✅ บันทึกข้อมูลสำเร็จ! (สถานะอัปเดตอัตโนมัติ)');
}

function cancelEdit() {
    editingId = null;
    editData = {};
    applyFilters();
}

// ============================================================
// 10. THAI CALENDAR FUNCTIONS
// ============================================================

let calendarContext = { field: '', year: 2569, month: 5, selectedDay: 0 };

function openThaiCalendar(field) {
    const currentVal = editData[field] || '';
    let day = 0, month = 0, year = 2569;
    
    if (currentVal && currentVal !== 'ตลอดชีพ') {
        const parts = currentVal.trim().split(' ');
        const datePart = parts[0];
        if (datePart) {
            const ymd = datePart.split('-');
            if (ymd.length === 3) {
                day = parseInt(ymd[2], 10);
                month = parseInt(ymd[1], 10) - 1;
                year = parseInt(ymd[0], 10);
            }
        }
    }
    
    calendarContext.field = field;
    calendarContext.year = year || 2569;
    calendarContext.month = month || (new Date().getMonth());
    calendarContext.selectedDay = day || 0;
    
    renderThaiCalendar(field);
    document.getElementById(`calendar_${field}`).style.display = 'block';
}

function renderThaiCalendar(field) {
    const year = calendarContext.year;
    const month = calendarContext.month;
    
    const monthNames = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 
                        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    document.getElementById(`calendarMonthYear_${field}`).textContent = `${monthNames[month]} ${year}`;
    
    const firstDay = new Date(year - 543, month, 1).getDay();
    const daysInMonth = new Date(year - 543, month + 1, 0).getDate();
    
    let html = '';
    for (let i = 0; i < firstDay; i++) {
        html += '<span></span>';
    }
    
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear() + 543;
    
    for (let d = 1; d <= daysInMonth; d++) {
        let isToday = (d === todayDate && month === todayMonth && year === todayYear);
        let isSelected = (d === calendarContext.selectedDay);
        let style = 'padding:6px 0; border-radius:8px; cursor:pointer; font-size:14px;';
        if (isToday) style += ' background:#dbeafe; font-weight:bold;';
        if (isSelected) style += ' background:#3b82f6; color:white; font-weight:bold;';
        if (!isSelected && !isToday) style += ' hover:background:#f1f5f9;';
        
        html += `<span style="${style}" onclick="selectThaiDate('${field}', ${d})">${d}</span>`;
    }
    
    document.getElementById(`calendarDays_${field}`).innerHTML = html;
}

function changeThaiMonth(field, delta) {
    calendarContext.month += delta;
    if (calendarContext.month > 11) {
        calendarContext.month = 0;
        calendarContext.year += 1;
    } else if (calendarContext.month < 0) {
        calendarContext.month = 11;
        calendarContext.year -= 1;
    }
    renderThaiCalendar(field);
}

function selectThaiDate(field, day) {
    calendarContext.selectedDay = day;
    const year = calendarContext.year;
    const month = String(calendarContext.month + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    
    const buddhistDate = `${year}-${month}-${dayStr} 00:00:00`;
    
    editData[field] = buddhistDate;
    updateEditStatus(field, buddhistDate);
    
    const input = document.querySelector(`input[onchange*="updateEditDataThaiDate('${field}']")`);
    if (input) {
        input.value = `${dayStr}/${month}/${year}`;
    }
    
    document.getElementById(`calendar_${field}`).style.display = 'none';
    applyFilters();
}

// ============================================================
// 11. FILTER & SEARCH
// ============================================================
function applyFilters() {
    const search = document.getElementById('searchInput').value.toLowerCase().trim();
    const licenseFilter = document.getElementById('filterLicense').value;
    const taxFilter = document.getElementById('filterTax').value;
    const prbFilter = document.getElementById('filterPrb').value;
    const regFilter = document.getElementById('filterRegistered').value;

    let filtered = vehicleData.filter(item => {
        if (search && !search.includes('หมดอายุทั้งหมด') && !search.includes('ใกล้หมดอายุทั้งหมด')) {
            const match = item.plate.toLowerCase().includes(search) ||
                item.driver.toLowerCase().includes(search) ||
                (item.sub && item.sub.toLowerCase().includes(search)) ||
                (item.idCard && item.idCard.includes(search));
            if (!match) return false;
        }

        if (licenseFilter !== 'all') {
            const status = getDateStatus(item.license);
            if (licenseFilter === 'valid' && status !== 'valid' && status !== 'lifetime') return false;
            if (licenseFilter === 'expired' && status !== 'expired') return false;
            if (licenseFilter === 'warning' && status !== 'warning') return false;
        }

        if (taxFilter === 'has' && !item.tax) return false;
        if (taxFilter === 'empty' && item.tax) return false;
        if (taxFilter === 'expired') {
            const status = getDateStatus(item.tax);
            if (status !== 'expired') return false;
        }
        if (taxFilter === 'warning') {
            const status = getDateStatus(item.tax);
            if (status !== 'warning') return false;
        }

        if (prbFilter === 'has' && !item.prb) return false;
        if (prbFilter === 'empty' && item.prb) return false;
        if (prbFilter === 'expired') {
            const status = getDateStatus(item.prb);
            if (status !== 'expired') return false;
        }
        if (prbFilter === 'warning') {
            const status = getDateStatus(item.prb);
            if (status !== 'warning') return false;
        }

        if (regFilter === 'yes' && !item.registered) return false;
        if (regFilter === 'no' && item.registered) return false;

        return true;
    });

    renderTable(filtered);
}

function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('filterLicense').value = 'all';
    document.getElementById('filterTax').value = 'all';
    document.getElementById('filterPrb').value = 'all';
    document.getElementById('filterRegistered').value = 'all';
    editingId = null;
    editData = {};
    applyFilters();
}

function updateStats(data) {
    document.getElementById('totalCount').textContent = data.length;
    let valid = 0,
        expired = 0,
        warning = 0,
        complete = 0;
    data.forEach(item => {
        const status = getDateStatus(item.license);
        if (status === 'valid' || status === 'lifetime') valid++;
        else if (status === 'expired') expired++;
        else if (status === 'warning') warning++;

        if (item.license && item.tax && item.prb) complete++;
    });
    document.getElementById('validLicenseCount').textContent = valid;
    document.getElementById('expiredLicenseCount').textContent = expired;
    document.getElementById('warningLicenseCount').textContent = warning;
    document.getElementById('completeCount').textContent = complete;
}

// ============================================================
// 12. CHECK EXPIRATION
// ============================================================
function getExpiringItems() {
    return vehicleData.filter(item => {
        const licenseStatus = getDateStatus(item.license);
        const taxStatus = getDateStatus(item.tax);
        const prbStatus = getDateStatus(item.prb);
        return licenseStatus === 'warning' || taxStatus === 'warning' || prbStatus === 'warning';
    });
}

function checkExpirations() {
    const expiring = getExpiringItems();
    const banner = document.getElementById('notificationBanner');
    const count = document.getElementById('expiringCount');
    if (expiring.length > 0) {
        banner.classList.add('show');
        count.textContent = expiring.length;
        
        let msg = `⚠️ พบเอกสารที่ใกล้หมดอายุ ${expiring.length} รายการ\n\n`;
        expiring.forEach(item => {
            msg += `🚗 ${item.plate} - ${item.driver}\n`;
            if (getDateStatus(item.license) === 'warning') {
                const days = getDaysRemaining(item.license);
                msg += `   📄 ใบขับขี่: เหลือ ${days} วัน\n`;
            }
            if (getDateStatus(item.tax) === 'warning') {
                const days = getDaysRemaining(item.tax);
                msg += `   📄 ภาษี: เหลือ ${days} วัน\n`;
            }
            if (getDateStatus(item.prb) === 'warning') {
                const days = getDaysRemaining(item.prb);
                msg += `   📄 พรบ.: เหลือ ${days} วัน\n`;
            }
            msg += '\n';
        });
        alert(msg);
    } else {
        banner.classList.remove('show');
        alert('✅ ไม่พบเอกสารที่ใกล้หมดอายุใน 2 เดือน');
    }
    return expiring;
}

// ============================================================
// 13. EMAILJS - ส่งอีเมลผ่าน EmailJS (รวมทั้งหมดในอีเมลเดียว)
// ============================================================

let emailRecipient = localStorage.getItem('emailRecipient') || 'phungaudomsongsakdi@gmail.com';
let emailServiceId = localStorage.getItem('emailServiceId') || 'service_3ej324t';
let emailTemplateId = localStorage.getItem('emailTemplateId') || 'template_i8a6s7q';
let emailPublicKey = localStorage.getItem('emailPublicKey') || '';
let notifyTime = localStorage.getItem('notifyTime') || '08:00';

// เริ่มต้น EmailJS
if (emailPublicKey) {
    emailjs.init(emailPublicKey);
    console.log('📧 EmailJS initialized');
}

function openEmailModal() {
    const modal = document.getElementById('emailModal');
    if (modal) modal.classList.add('active');
    
    document.getElementById('emailInput').value = emailRecipient;
    document.getElementById('emailServiceId').value = emailServiceId;
    document.getElementById('emailTemplateId').value = emailTemplateId;
    document.getElementById('emailPublicKey').value = emailPublicKey;
    document.getElementById('notifyTimeInput').value = notifyTime;
}

function closeEmailModal() {
    const modal = document.getElementById('emailModal');
    if (modal) modal.classList.remove('active');
}

function saveEmailSettings() {
    emailRecipient = document.getElementById('emailInput').value.trim();
    emailServiceId = document.getElementById('emailServiceId').value.trim();
    emailTemplateId = document.getElementById('emailTemplateId').value.trim();
    emailPublicKey = document.getElementById('emailPublicKey').value.trim();
    notifyTime = document.getElementById('notifyTimeInput').value;
    
    localStorage.setItem('emailRecipient', emailRecipient);
    localStorage.setItem('emailServiceId', emailServiceId);
    localStorage.setItem('emailTemplateId', emailTemplateId);
    localStorage.setItem('emailPublicKey', emailPublicKey);
    localStorage.setItem('notifyTime', notifyTime);
    
    if (emailPublicKey) {
        emailjs.init(emailPublicKey);
    }
    
    closeEmailModal();
    
    if (emailRecipient && emailServiceId && emailTemplateId && emailPublicKey) {
        sendEmailTest();
    } else {
        alert('✅ บันทึกการตั้งค่าเรียบร้อยแล้ว');
    }
}

async function sendEmailTest() {
    if (!emailRecipient || !emailServiceId || !emailTemplateId || !emailPublicKey) {
        alert('⚠️ กรุณากรอกข้อมูลให้ครบถ้วน');
        return;
    }

    try {
        // ✅ สร้างข้อความสำเร็จรูป (ไม่ใช้ Handlebars ใน Template)
        const testMessage = '🚗 ทะเบียน: ทดสอบ 999\n👤 ผู้ขับขี่: นายทดสอบ สมมติ\n📄 ใบขับขี่: 20/08/2026 (⚠️ ใกล้หมดอายุ 60 วัน)\n📄 ภาษี: 15/08/2026 (⚠️ ใกล้หมดอายุ 55 วัน)\n📄 พรบ.: 10/08/2026 (⚠️ ใกล้หมดอายุ 50 วัน)\n';

        const response = await emailjs.send(emailServiceId, emailTemplateId, {
            to_email: emailRecipient,
            subject: '✅ ทดสอบการแจ้งเตือนจากระบบรถรับ-ส่ง',
            combinedMessage: testMessage,
            totalCount: 1
        });
        
        if (response.status === 200) {
            alert('✅ ทดสอบส่งอีเมลสำเร็จ! ตรวจสอบอีเมลของคุณ');
        } else {
            alert('❌ ทดสอบส่งอีเมลไม่สำเร็จ: ' + response.text);
        }
    } catch (error) {
        console.error('EmailJS Error:', error);
        alert('❌ เกิดข้อผิดพลาด: ' + error.message);
    }
}

async function sendEmailNotification() {
    if (!emailRecipient || !emailServiceId || !emailTemplateId || !emailPublicKey) {
        alert('⚠️ กรุณาตั้งค่าอีเมลให้ครบถ้วน');
        openEmailModal();
        return;
    }

    const expiring = getExpiringItems();
    if (expiring.length === 0) {
        alert('✅ ไม่มีเอกสารที่ใกล้หมดอายุ');
        return;
    }

    // ✅ สร้างข้อความรวมทั้งหมดในอีเมลเดียว
    let combinedMessage = '';
    expiring.forEach((item) => {
        combinedMessage += `🚗 ทะเบียน: ${item.plate}\n`;
        combinedMessage += `👤 ผู้ขับขี่: ${item.driver}\n`;
        
        if (getDateStatus(item.license) === 'warning') {
            const days = getDaysRemaining(item.license);
            combinedMessage += `📄 ใบขับขี่: ${formatDateDisplay(item.license)} (⚠️ ใกล้หมดอายุ ${days} วัน)\n`;
        }
        if (getDateStatus(item.tax) === 'warning') {
            const days = getDaysRemaining(item.tax);
            combinedMessage += `📄 ภาษี: ${formatDateDisplay(item.tax)} (⚠️ ใกล้หมดอายุ ${days} วัน)\n`;
        }
        if (getDateStatus(item.prb) === 'warning') {
            const days = getDaysRemaining(item.prb);
            combinedMessage += `📄 พรบ.: ${formatDateDisplay(item.prb)} (⚠️ ใกล้หมดอายุ ${days} วัน)\n`;
        }
        combinedMessage += '\n';
    });

    const templateParams = {
        to_email: emailRecipient,
        subject: `📋 แจ้งเตือนเอกสารใกล้หมดอายุ (${expiring.length} รายการ)`,
        combinedMessage: combinedMessage,
        totalCount: expiring.length
    };

    try {
        const response = await emailjs.send(emailServiceId, emailTemplateId, templateParams);
        if (response.status === 200) {
            alert(`✅ ส่งอีเมลแจ้งเตือนสำเร็จ! (${expiring.length} รายการ)`);
        } else {
            alert('❌ ส่งอีเมลไม่สำเร็จ: ' + response.text);
        }
    } catch (error) {
        console.error('EmailJS Error:', error);
        alert('❌ เกิดข้อผิดพลาด: ' + error.message);
    }
}

function scheduleDailyEmail() {
    const now = new Date();
    const [h, m] = notifyTime.split(':').map(Number);
    const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0);
    if (target <= now) target.setDate(target.getDate() + 1);
    const delay = target - now;
    
    setTimeout(() => {
        const expiring = getExpiringItems();
        if (expiring.length > 0 && emailRecipient && emailServiceId && emailTemplateId && emailPublicKey) {
            sendEmailNotification();
        }
        scheduleDailyEmail();
    }, delay);
}

// ============================================================
// 14. INIT - เริ่มต้นระบบ
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔄 กำลังเริ่มต้นระบบ...');
    
    // ✅ ตรวจสอบ element ทั้งหมด
    const searchInput = document.getElementById('searchInput');
    const filterLicense = document.getElementById('filterLicense');
    const filterTax = document.getElementById('filterTax');
    const filterPrb = document.getElementById('filterPrb');
    const filterRegistered = document.getElementById('filterRegistered');
    const emailModal = document.getElementById('emailModal');
    
    console.log('🔍 ตรวจสอบ Element:');
    console.log('  searchInput:', searchInput ? '✅' : '❌');
    console.log('  filterLicense:', filterLicense ? '✅' : '❌');
    console.log('  filterTax:', filterTax ? '✅' : '❌');
    console.log('  filterPrb:', filterPrb ? '✅' : '❌');
    console.log('  filterRegistered:', filterRegistered ? '✅' : '❌');
    console.log('  emailModal:', emailModal ? '✅' : '❌');
    
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
    
    if (filterLicense) {
        filterLicense.addEventListener('change', applyFilters);
    }
    
    if (filterTax) {
        filterTax.addEventListener('change', applyFilters);
    }
    
    if (filterPrb) {
        filterPrb.addEventListener('change', applyFilters);
    }
    
    if (filterRegistered) {
        filterRegistered.addEventListener('change', applyFilters);
    }

    if (emailModal) {
        emailModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeEmailModal();
            }
        });
    }

    // ปิดปฏิทินเมื่อคลิกข้างนอก
    document.addEventListener('click', function(e) {
        document.querySelectorAll('[id^="calendar_"]').forEach(function(cal) {
            if (!cal.contains(e.target) && !e.target.closest('.btn-calendar')) {
                cal.style.display = 'none';
            }
        });
    });

    // โหลดข้อมูล
    if (typeof loadDataFromStorage === 'function') {
        loadDataFromStorage();
    }
    
    // ตั้งเวลาส่งอีเมลอัตโนมัติ
    setTimeout(function() {
        if (typeof scheduleDailyEmail === 'function') {
            scheduleDailyEmail();
        }
    }, 2000);

    console.log('🚀 ระบบพร้อมใช้งานแล้ว');
    console.log('📌 คลิก ✏️ เพื่อแก้ไขข้อมูล');
    console.log('📅 คลิก 📅 เพื่อเลือกวันที่แบบปฏิทินไทย (พ.ศ.)');
    console.log('♾️ คลิก "ตลอดชีพ" เพื่อตั้งค่าเป็นตลอดชีพ');
    console.log('📧 ใช้ EmailJS สำหรับแจ้งเตือน (รวมทั้งหมดในอีเมลเดียว)');
    console.log('📊 ปุ่ม Export Excel ใช้งานได้');
    console.log('🔍 ปุ่มกรอง หมดอายุทั้งหมด และ ใกล้หมดอายุทั้งหมด');
    console.log('🔄 สถานะจะอัปเดตอัตโนมัติเมื่อเลือกวันที่');
    console.log('📋 ข้อมูลทั้งหมด', vehicleData ? vehicleData.length : 0, 'รายการ');
});
