function Dsnv(){
    this.arr = [],
    this.themNV = function(nv){
        this.arr.push(nv)
    };
    this.timViTri = function(taiKhoan){
        var index = -1;
        this.arr.forEach(function(item, i){
            if(item.taiKhoan === taiKhoan){
                index = i;
            }
        })
        return index;
    }

    this.xoa = function(taiKhoan){
        var index = this.timViTri(taiKhoan);
        this.arr.splice(index, 1);
    }

    this.sua = function(taiKhoan){
        var index = this.timViTri(taiKhoan);
        if(index != -1){
            return this.arr[index];
        }else{
            return null;
        }
    }

    this.capNhat = function(nv){
        var index = this.timViTri(nv.taiKhoan);
        if(index != -1){
            this.arr[index] = nv;
        }
    }

    this.timKiem = function (keyword) {
        var arrs = [];
        var xepLoai = "";
        keyword = removeAccents(keyword);
        this.arr.forEach(function(item, i){
            xepLoai = removeAccents(item.xepLoai);
            if(xepLoai.toLowerCase().indexOf(keyword.toLowerCase()) > -1){
                arrs.push(item);
            }
        })
        return arrs;
    };
}