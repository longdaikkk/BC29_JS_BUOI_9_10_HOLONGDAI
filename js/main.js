const EMAIL_CHECK = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const LETTER_CHECK = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
const DATE_CHECK = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
const PASS_CHECK = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;

var dsnv = new Dsnv();
var validation = new Validation();
getLocalStorage();

//Loại bỏ dấu tiếng Việt
function removeAccents(str) {
    var AccentsMap = [
        "aàảãáạăằẳẵắặâầẩẫấậ",
        "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
        "dđ", "DĐ",
        "eèẻẽéẹêềểễếệ",
        "EÈẺẼÉẸÊỀỂỄẾỆ",
        "iìỉĩíị",
        "IÌỈĨÍỊ",
        "oòỏõóọôồổỗốộơờởỡớợ",
        "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
        "uùủũúụưừửữứự",
        "UÙỦŨÚỤƯỪỬỮỨỰ",
        "yỳỷỹýỵ",
        "YỲỶỸÝỴ"
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
        var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
        var char = AccentsMap[i][0];
        str = str.replace(re, char);
    }
    return str;
}

//hàm dom
function getEle(id) {
    return document.getElementById(id);
}

//hàm nhận và kiểm tra thông tin
function luuThongTin(check) {
    var _taiKhoan = getEle('tknv').value;
    var _ten = getEle('name').value;
    var _email = getEle('email').value;
    var _matKhau = getEle('password').value;
    var _ngay = getEle('datepicker').value;
    var _luongCB = getEle('luongCB').value * 1;
    var _chucVu = getEle('chucvu').value;
    var _gioLam = getEle('gioLam').value * 1;
    var nhanVien = new NhanVien(_taiKhoan, _ten, _email, _matKhau, _ngay, _luongCB, _chucVu, _gioLam);
    nhanVien.tinhLuong();
    nhanVien.xL();

    //Check
    var isValid = true;
    //tài khoản
    if (check) {
        isValid &= validation.kiemTraRong(nhanVien.taiKhoan, "tbTKNV", "(*)Vui lòng không để trống") && validation.kiemDoDaiKiTu(nhanVien.taiKhoan, "tbTKNV", "(*)Vui lòng nhập từ 4 đến 6 ký tự", 6, 4) && validation.kiemTraTrungTaiKhoan(nhanVien.taiKhoan, "tbTKNV", "(*)Tài khoản đã được sử dụng", dsnv.arr);
    }

    //Tên
    isValid &= validation.kiemTraRong(nhanVien.ten, "tbTen", "(*)Vui lòng không để trống") && validation.kiemTraDinhDang(nhanVien.ten, "tbTen", "(*)Vui lòng chỉ nhập chữ", LETTER_CHECK);
    //Email
    isValid &= validation.kiemTraRong(nhanVien.email, "tbEmail", "(*)Vui lòng không để trống") && validation.kiemTraDinhDang(nhanVien.email, "tbEmail", "(*)Vui lòng nhập đúng email", EMAIL_CHECK);
    //Mật khẩu
    isValid &= validation.kiemTraRong(nhanVien.matKhau, "tbMatKhau", "(*)Vui lòng không để trống") && validation.kiemTraDinhDang(nhanVien.matKhau, "tbMatKhau", "(*)mật khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)", PASS_CHECK) && validation.kiemDoDaiKiTu(nhanVien.matKhau, "tbMatKhau", "(*)mật khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)", 10, 6);
    //Ngày
    isValid &= validation.kiemTraRong(nhanVien.ngay, "tbNgay", "(*)Vui lòng không để trống") && validation.kiemTraDinhDang(nhanVien.ngay, "tbNgay", "(*)Vui lòng nhập theo định dạng mm/dd/yyyy", DATE_CHECK);
    //Lương cơ bản
    isValid &= validation.kiemTraRong(nhanVien.luongCB, "tbLuongCB", "(*)Vui lòng không để trống") && validation.kiemTraGiaTri(nhanVien.luongCB, "tbLuongCB", "(*)Vui lòng nhập từ 1 triệu đến 20 triệu", 20000000, 1000000);
    //Chức vụ
    isValid &= validation.kiemTraLoaiNV("chucvu", "tbChucVu", "(*)Vui lòng chọn chức vụ");
    //Giờ làm
    isValid &= validation.kiemTraRong(nhanVien.gioLam, "tbGiolam", "(*)Vui lòng không để trống") && validation.kiemTraGiaTri(nhanVien.gioLam, "tbGiolam", "(*)Vui lòng nhập từ 80 đến 200", 200, 80);
    console.log(isValid);
    if (!isValid) {
        return;
    }
    return nhanVien;
}

//Thêm nhân viên
getEle("btnThemNV").onclick = function () {
    var nhanVien = luuThongTin(true);

    if (nhanVien) {
        dsnv.themNV(nhanVien);

        taoBang(dsnv.arr);
        setLocalStorage();
    }

}

//Tạo bảng
function taoBang(data) {
    var content = "";
    data.forEach(function (item) {
        content += `
        <tr>
            <td>${item.taiKhoan}</td>
            <td>${item.ten}</td>
            <td>${item.email}</td>
            <td>${item.ngay}</td>
            <td>${item.chucVu}</td>
            <td>${item.luong}</td>
            <td>${item.xepLoai}</td>
            <td><button class="btn btn-danger" onclick="xoa('${item.taiKhoan}')">Xóa</button></td>
            <td><button class="btn btn-info" onclick="sua('${item.taiKhoan}')" data-toggle="modal"
            data-target="#myModal">Sửa</button></td>
        </tr>
        `
    })
    getEle("tableDanhSach").innerHTML = content;
}

//Xóa
function xoa(id) {
    dsnv.xoa(id);
    setLocalStorage();
    taoBang(dsnv.arr);
}

//Sửa
function sua(id) {
    var nv = dsnv.sua(id);
    if (nv) {
        getEle('tknv').value = nv.taiKhoan;
        getEle('name').value = nv.ten;
        getEle('email').value = nv.email;
        getEle('password').value = nv.matKhau;
        getEle('datepicker').value = nv.ngay;
        getEle('luongCB').value = nv.luongCB;
        getEle('chucvu').value = nv.chucVu;
        getEle('gioLam').value = nv.gioLam;
        getEle('tknv').disabled = true;
        getEle('btnThemNV').disabled = true;
        getEle('btnCapNhat').disabled = false;
    }
}

//Cập nhật
getEle('btnCapNhat').onclick = function () {
    var nv = luuThongTin(false);
    if (nv) {
        dsnv.capNhat(nv);
        setLocalStorage();
        taoBang(dsnv.arr);
    }
}

//Tìm kiếm
getEle("searchName").addEventListener("keyup", function () {
    var keyword = getEle("searchName").value;
    var arrs = dsnv.timKiem(keyword);
    taoBang(arrs);
});

//enabled button thêm
getEle('btnThem').onclick = function () {
    getEle('btnThemNV').disabled = false;
    getEle('btnCapNhat').disabled = true;
    getEle('tknv').disabled = false;
    getEle('tknv').value = "";
    getEle('name').value = "";
    getEle('email').value = "";
    getEle('password').value = "";
    getEle('datepicker').value = "";
    getEle('luongCB').value = "";
    getEle('chucvu').value = "";
    getEle('gioLam').value = "";
}

function setLocalStorage() {
    //convert from Json to String
    var dataString = JSON.stringify(dsnv.arr);
    //luu xuong localStorage
    localStorage.setItem("DSSV", dataString);
}

function getLocalStorage() {
    if (localStorage.getItem("DSSV")) {
        var dataString = localStorage.getItem("DSSV");
        //convert string to Json
        var dataJson = JSON.parse(dataString);
        dsnv.arr = dataJson;
        taoBang(dsnv.arr);
    }
}