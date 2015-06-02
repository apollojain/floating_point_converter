function isInt(n){
    return Number(n)===n && n%1===0;
}

function is_binary(num){
	str = num.toString();
	if (str.search(/^[10]+$/) != -1){
  		return true;
	} else {
	  	return false;
	}
}

function error(str){
	sweetAlert({
				title: "Oops!", 
				text: str, 
				type: "error"
			});
}

function b2_to_b10(number){
	if(!is_binary(number)){
		return 'This number is not binary'
	}else{
		var fin = number.toString().split("").reverse();
		var len = fin.length;
		var ret = 0;
		var i = 0;
		while(i < len){
			ret+= parseInt(fin[i])*Math.pow(2, i);
			i++;
		}

		return ret.toString();
	}
}


function displayData(str){
	sweetAlert(str);
}

function constructOnes(n){
	var ret = "";
	var i = 0;
	while(i < n){
		ret += "1"
		i++;
	}
	return ret;
}

function processFP(sgn, exp, mant_s, mid, e_bits, m_bits){
	
	var mant = parseInt(mant_s);
	if(exp.toString() == constructOnes(e_bits)){
		if(mant == 0){
			return "Infinity";
		}else{ 
			return "Not a Number";
		}
	}else{
		var base = 1;
		var p = b2_to_b10(exp) - mid;
		var res = 0;
		if(exp == 0){
			base = 0;
		}
		res = base*Math.pow(2, p);
		var i = 1;
		while(i <= m_bits){
			res += parseInt(mant_s.substring(i-1, i))*Math.pow(2, p - i);
			i++;
		}
		
		if(sgn == 1){
			res = -1*res;
		}
		return res.toString();


	}
}



function submitData(){

	var a = parseInt(document.getElementById('exponent').value);
	var b = parseInt(document.getElementById("mantissa").value);
	var c = document.getElementById("t1").value;
	if(!(isInt(a)) || !(isInt(b)) || a < 0 || b < 0 || !(isInt(parseInt(c))) || !(is_binary(parseInt(c)))){
		error("Something seems incorrect. You may have accidentally entered something that isn't a number or something that is negative. Try again.");
	}else{
		var nan = c.split("").length;
		if(nan != (a + b + 1)){
			error("Your floating point number length does not match the values you have given for your exponent and mantissa bits");
		}else{
			var sgn = parseInt(c.substring(0, 1));
			var exp = parseInt(c.substring(1, a + 1));
			var mant_s = c.substring(a + 1, a + b + 1);
			var mid = Math.pow(2, b - 1) - 1;
			displayData(processFP(sgn, exp, mant_s, mid, a, b));
		}

	}

}