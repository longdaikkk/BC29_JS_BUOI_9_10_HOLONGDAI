function Validation() {
    //Kiểm tra rỗng
    this.kiemTraRong = function (value, errorId, mess) {
        if (value !== "") {
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }
        getEle(errorId).style.display = "inline-block";
        getEle(errorId).innerHTML = mess;
        return false;
    }

    //Kiểm tra độ dài kí tự
    this.kiemDoDaiKiTu = function (value, errorId, mess, max, min) {
        if (value.trim().length >= min && value.trim().length <= max) {
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }
        getEle(errorId).style.display = "inline-block";
        getEle(errorId).innerHTML = mess;
        return false;
    }

    //Kiểm tra định dạng (chữ, số, ngày, email)
    this.kiemTraDinhDang = function (value, errorId, mess, check) {
        if (value.match(check)) {
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }
        getEle(errorId).style.display = "inline-block";
        getEle(errorId).innerHTML = mess;
        return false;
    }

    //Kiểm tra giá trị
    this.kiemTraGiaTri = function (value, errorId, mess, max, min) {
        if (min <= value && value <= max) {
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }
        getEle(errorId).style.display = "inline-block";
        getEle(errorId).innerHTML = mess;
        return false;
    }
     
    //Kiểm tra loại nhân viên
    this.kiemTraLoaiNV = function (selectId, errorId, mess) {
        if (getEle(selectId).selectedIndex <= 0) {
            getEle(errorId).style.display = "inline-block";
            getEle(errorId).innerHTML = mess;
            return false;
        }
        getEle(errorId).style.display = "none";
        getEle(errorId).innerHTML = "";
        return true;
    }

    //Kiểm tra trùng tài khoản
    this.kiemTraTrungTaiKhoan = function (value, errorId, mess, arr) {
        var index = -1;
        arr.forEach(function (item, i) {
            if (value === item.taiKhoan) {
                index = i;
            }
        })
        if(index != -1){
            getEle(errorId).style.display = "inline-block";
            getEle(errorId).innerHTML = mess;
            return false;
        }
        getEle(errorId).style.display = "none";
        getEle(errorId).innerHTML = "";
        return true;
    }
}