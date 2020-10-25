// M logo
var m = document.getElementById('m');
setTimeout(function(){ 
	m.style.marginLeft="0"; 
}, 1500);
// eet opacity
var con = document.getElementById('continue');
setTimeout(function(){ 
	con.style.opacity="1"; 
}, 2000);

// loading function
function load() {
	var butt = document.getElementById('username').value;
	if(butt){
		document.getElementById('load').style.display="block";
	}
}
