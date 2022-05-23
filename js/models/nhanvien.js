function NhanVien(_taiKhoan, _ten, _email, _matKhau, _ngay, _luongCB, _chucVu, _gioLam){
    this.taiKhoan = _taiKhoan,
    this.ten = _ten,
    this.email = _email,
    this.matKhau = _matKhau,
    this.ngay = _ngay,
    this.luongCB = _luongCB,
    this.chucVu = _chucVu,
    this.gioLam = _gioLam,
    this.luong = 0,
    this.xepLoai = "";

    this.tinhLuong = function(){
        if(this.chucVu == "Sếp"){
            this.luong = this.luongCB*3;
        }else if(this.chucVu == "Trưởng phòng"){
            this.luong = this.luongCB*2;
        }else if(this.chucVu == "Nhân viên"){
            this.luong = this.luongCB;
        }
    }
    this.xL = function(){
        if(this.gioLam >= 192){
            this.xepLoai = "Nhân viên xuất sắc";
        }else if(this.gioLam >= 176){
            this.xepLoai = "Nhân viên giỏi";
        }else if(this.gioLam >= 160){
            this.xepLoai = "Nhân viên khá";
        }else{
            this.xepLoai = "Nhân viên trung bình";
        }
    }
}