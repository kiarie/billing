 <!-- 

	function svidares(){
			document.frmsvida.acchannel.disabled = false;
	}	//end function

	function svida(){
		var acctype = document.frmsvida.acctype;
		var mercountry = document.frmsvida.region;
		var acchannel = document.frmsvida.acchannel;
		var vid = document.frmsvida.vid;

		if(acctype.value == "pso"){
			alert("Please select the appropriate merchant account type first");
			acctype.focus();
			return false;
		}

		if(mercountry.value == "pso"){
			alert("Please select the appropriate country this merchant account is set in");
			mercountry.focus();
			return false;
		}

		if(acchannel.value == "pso"){
			alert("Please select the appropriate merchant channel first");
			acchannel.focus();
			return false;
		}

		if(vid.value == ""){
			alert("Please enter the merchant Vendor ID to search for first");
			document.frmsvida.vid.focus();
			return false;
		}

	//prevent special characters {` ~ ! @ # $ % ^ & * ( ) _ - + = { } [ ] | \ < > / ? , .}

		return true;
	}	//end function


	function rstmacc(){

		var acchannel = document.frmrstmacc.acchannel.value;
		var vid = document.frmrstmacc.vid.value;
		var txncode = document.frmrstmacc.txncode.value;

		if(acchannel == "pso"){
			alert("Please select the appropriate merchant channel first");
			document.frmrstmacc.acchannel.focus();
			return false;
		}

		if(vid == ""){
			alert("Please enter the merchant Vendor ID to search against");
			document.frmrstmacc.vid.focus();
			return false;
		}

		if(txncode == ""){
			alert("Please enter the Customer Transaction Code to search for");
			document.frmrstmacc.txncode.focus();
			return false;
		}

	//prevent special characters {` ~ ! @ # $ % ^ & * ( ) _ - + = { } [ ] | \ < > / ? , .}

		return true;
	}	//end function


	function createmeracc(){
		var chk = document.frmcreatemeracc.acctype.value;
//		alert(chk);
		if(chk == "ipy"){
			document.frmcreatemeracc.ipychkbx.disabled = true;
			document.frmcreatemeracc.mertxnemail.disabled = true;
			document.frmcreatemeracc.mertxntel.disabled = true;

			document.frmcreatemeracc.mmc.disabled = false;
			document.frmcreatemeracc.ipwc.disabled = false;
			document.frmcreatemeracc.mbc.disabled = false;
			document.frmcreatemeracc.ksw.disabled = false;
			document.frmcreatemeracc.visa.disabled = false;
			document.frmcreatemeracc.merseckey.disabled = false;

		} else if(chk == "ipypos"){

			document.frmcreatemeracc.ipychkbx.disabled = false;
			document.frmcreatemeracc.mertxnemail.disabled = false;
			document.frmcreatemeracc.mertxntel.disabled = false;

			document.frmcreatemeracc.mmc.disabled = false;
			document.frmcreatemeracc.ipwc.disabled = false;
			document.frmcreatemeracc.mbc.disabled = false;
			document.frmcreatemeracc.ksw.disabled = true;
			document.frmcreatemeracc.visa.disabled = true;
			document.frmcreatemeracc.merseckey.disabled = true;

			document.frmcreatemeracc.mmc.value = "1.00";
			document.frmcreatemeracc.ipwc.value = "1.00";
			document.frmcreatemeracc.mbc.value = "5.00";
			document.frmcreatemeracc.merseckey.value = "";
		}
	}	//end function


	function cmavalidate(){	//validate the Create Merchant Account form
		var mercountry = document.frmcreatemeracc.mercountry;
		var mertype = document.frmcreatemeracc.mertype;
		var acctype = document.frmcreatemeracc.acctype;
		var mername = document.frmcreatemeracc.mername;
		var vid = document.frmcreatemeracc.vid;
		var city = document.frmcreatemeracc.city;
		var mertel = document.frmcreatemeracc.mertel;
		var mtelchk = mertel.value;
		var email = document.frmcreatemeracc.email;
		var postal = document.frmcreatemeracc.postal;

		var chkbx = document.frmcreatemeracc.ipychkbx;
		var meremail = document.frmcreatemeracc.mertxnemail;
		var mertelephone = document.frmcreatemeracc.mertxntel;
		var mtelchk2 = mertelephone.value;

		var mmc = document.frmcreatemeracc.mmc;
		var ipwc = document.frmcreatemeracc.ipwc;
		var mbc = document.frmcreatemeracc.mbc;
		var ksw = document.frmcreatemeracc.ksw;
		var visa = document.frmcreatemeracc.visa;
		var msk = document.frmcreatemeracc.merseckey;

var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if(mercountry.value == "pso"){
			alert("Please Select the appropriate Merchant Country");
			mercountry.focus();
			return false;
		}

		if(mertype.value == "pso"){
			alert("Please Select the appropriate Merchant Profile");
			mertype.focus();
			return false;
		}

		if(acctype.value == "pso"){
			alert("Please Select the appropriate Merchant account type");
			acctype.focus();
			return false;
		}

		if(mername.value == ""){
			alert("Please enter the appropriate Merchant Name e.g. ABC Company Ltd");
			mername.focus();
			return false;
		}

		if(vid.value == ""){
			alert("Please enter the appropriate Merchant Vendor ID");
			vid.focus();
			return false;
		}

		if(city.value == ""){
			alert("Please enter the Merchant's city");
			city.focus();
			return false;
		}

		if(mertel.value == ""){
			alert("Please enter the Merchant's telephone number");
			mertel.focus();
			return false;
		}

		if(mertel.value == "254"){	//mertel.value == "254"
			alert("Please enter the Merchant's full telephone number");
			mertel.focus();
			return false;
		}

		if(mtelchk.substr(0,3) != "254" && acctype.value == "ipypos"){
			alert("Please enter the Merchant's telephone number starting with prefix '254'");
			mertel.focus();
			return false;
		}

		if(email.value == ""){
			alert("Please enter the Merchant's email address");
			email.focus();
			return false;
		}

		if(!email.value.match(reg)){
			alert("You have entered an invalid email address!");  
			email.focus();  
			return false;  
		}

		if(postal.value == ""){
			alert("Please enter the Merchant's Postal address");
			postal.focus();
			return false;
		}

		if(meremail.value == "" && acctype.value == "ipypos"){
			alert("Please enter the Merchant's iPay POS Notification email address");
			meremail.focus();
			return false;
		}

		if(!meremail.value.match(reg) && acctype.value == "ipypos"){
			alert("You have entered an invalid email address!");
			meremail.focus();
			return false;
		}

		if(mertelephone.value == "" && acctype.value == "ipypos"){
			alert("Please enter the Merchant's iPay POS Notification telephone number in the format 2547xxxxxxxx");
			mertelephone.focus();
			return false;
		}

		if(mtelchk2.substr(0,3) != "254" && acctype.value == "ipypos"){
			alert("Please enter the Merchant's telephone number starting with prefix '254'");
			mertelephone.focus();
			return false;
		}

		if(mmc.value == "" && acctype.value == "ipy"){
			alert("Please enter the correct iPay Online / POS Mobile money Commission rate. Default value = 3.00%");
			mmc.focus();
			return false;
		}

		if(ipwc.value == "" && acctype.value == "ipy"){
			alert("Please enter the correct iPay Online / POS iPay Wallet Commission rate. Default value = 3.00%");
			ipwc.focus();
			return false;
		}

		if(mbc.value == "" && acctype.value == "ipy"){
			alert("Please enter the correct iPay Online / POS Mobile Banking Commission rate. Default value = 5.00%");
			mbc.focus();
			return false;
		}

		if(ksw.value == "" && acctype.value == "ipy"){
			alert("Please enter the correct iPay Online Kenswitch Card Commission rate. Default value = 3.80% ");
			ksw.focus();
			return false;
		}

		if(visa.value == "" && acctype.value == "ipy"){
			alert("Please enter the correct iPay Online Credit Card Commission rate. Default value = 3.50% ");
			visa.focus();
			return false;
		}

		if(msk.value == "" && acctype.value == "ipy"){
			alert("Please enter the Merchant's designated security key.\n Please note that it is CASE SENSITIVE.");
			msk.focus();
			return false;
		}		
	}	//end function


	function online_editcmavalidate(){	//validate the Create Merchant Account form

		var smsmername = document.frmcreatemeracc.smsmername;
		var origsmsmername = document.frmcreatemeracc.origsmsmername;
		var mername = document.frmcreatemeracc.mername;
		var origmername = document.frmcreatemeracc.origmername;
		var vid = document.frmcreatemeracc.vid;
		var city = document.frmcreatemeracc.city;
		var origcity = document.frmcreatemeracc.origcity;
		var smsmertel = document.frmcreatemeracc.smsmertel;
		var origsmsmertel = document.frmcreatemeracc.origsmsmertel;
		var mertel = document.frmcreatemeracc.mertel;
		var origmertel = document.frmcreatemeracc.origmertel;
		var email = document.frmcreatemeracc.email;
		var origemail = document.frmcreatemeracc.origemail;
		var postal = document.frmcreatemeracc.postal;
		var origpostal = document.frmcreatemeracc.origpostal;

		var mmc = document.frmcreatemeracc.mmc;
		var origmmc = document.frmcreatemeracc.origmmc;
		var ipwc = document.frmcreatemeracc.ipwc;
		var origipwc = document.frmcreatemeracc.origipwc;
		var mbc = document.frmcreatemeracc.mbc;
		var origmbc = document.frmcreatemeracc.origmbc;

		var ksw = document.frmcreatemeracc.ksw;
		var origksw = document.frmcreatemeracc.origksw;
		var visa = document.frmcreatemeracc.visa;
		var origvisa = document.frmcreatemeracc.origvisa;

		var msk = document.frmcreatemeracc.merseckey;
		var origmsk = document.frmcreatemeracc.origmerseckey;

var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		var newdata = smsmername.value + mername.value + vid.value + city.value + smsmertel.value + mertel.value + email.value + postal.value + mmc.value + ipwc.value + mbc.value + ksw.value + visa.value + msk.value;
		var olddata = origsmsmername.value + origmername.value + vid.value + origcity.value + origsmsmertel.value + origmertel.value + origemail.value + origpostal.value + origmmc.value + origipwc.value + origmbc.value + origksw.value + origvisa.value + origmsk.value;

//alert(newdata);
//alert(olddata);

		if(smsmername.value == ""){
			alert("Please enter the appropriate Merchant SMS ID Name e.g. ABC Company Ltd");
			smsmername.focus();
			return false;
		}

		if(mername.value == ""){
			alert("Please enter the appropriate Merchant Name e.g. ABC Company Ltd");
			mername.focus();
			return false;
		}

		if(vid.value == ""){
			alert("Please enter the appropriate Merchant Vendor ID");
			vid.focus();
			return false;
		}

		if(city.value == ""){
			alert("Please enter the Merchant's city");
			city.focus();
			return false;
		}

		if(smsmertel.value == ""){
			alert("Please enter the Merchant's Helpline number as it will appear on the client SMS");
			smsmertel.focus();
			return false;
		}

		if(mertel.value == ""){
			alert("Please enter the Merchant's telephone number");
			mertel.focus();
			return false;
		}

		if(email.value == ""){
			alert("Please enter the Merchant's email address");
			email.focus();
			return false;
		}
/*
		if(!email.value.match(reg)){
			alert("You have entered an invalid email address!");  
			email.focus();  
			return false;  
		}
*/
		if(postal.value == ""){
			alert("Please enter the Merchant's Postal address");
			postal.focus();
			return false;
		}

		if(mmc.value == ""){
			alert("Please enter the correct iPay Online Mobile money Commission rate. Default value = 3.00%");
			mmc.focus();
			return false;
		}

		if(ipwc.value == ""){
			alert("Please enter the correct iPay Wallet Commission rate. Default value = 3.00%");
			ipwc.focus();
			return false;
		}

		if(mbc.value == ""){
			alert("Please enter the correct Mobile Banking Commission rate. Default value = 5.00%");
			mbc.focus();
			return false;
		}

		if(ksw.value == ""){
			alert("Please enter the correct iPay Online Kenswitch Card Commission rate. Default value = 3.80% ");
			ksw.focus();
			return false;
		}

		if(visa.value == ""){
			alert("Please enter the correct iPay Online Credit Card Commission rate. Default value = 3.50% ");
			visa.focus();
			return false;
		}

		if(msk.value == ""){
			alert("Please enter the Merchant's designated security key.\n Please note that it is CASE SENSITIVE.");
			msk.focus();
			return false;
		}

		if(newdata == olddata){
			alert("You have not made any changes that can be committed to record");
			return false;
		}

		//dialog: you are about to enter the following data... are you sure? yes | no
		var answer = confirm("You are about to commit some changes.\n\nAre you sure that you want to continue?");
		if (answer)
			return true;	//		alert("You said: Ok");
		else
			alert("You have cancelled this edit action. No changes will be recorded");
			return false;
	}	//end function


	function pos_editcmavalidate(){	//validate the Create Merchant Account form

		var smsmername = document.frmcreatemeracc.mername;
		var mername = document.frmcreatemeracc.mername;
		var vid = document.frmcreatemeracc.vid;
		var city = document.frmcreatemeracc.city;
		var smsmertel = document.frmcreatemeracc.mertel;
		var mertel = document.frmcreatemeracc.mertel;
		var mtelchk = mertel.value;
		var email = document.frmcreatemeracc.email;
		var postal = document.frmcreatemeracc.postal;

		var chkbx = document.frmcreatemeracc.ipychkbx;
		var meremail = document.frmcreatemeracc.mertxnemail;
		var mertelephone = document.frmcreatemeracc.mertxntel;
		var mtelchk2 = mertelephone.value;

		var mmc = document.frmcreatemeracc.mmc;
		var ipwc = document.frmcreatemeracc.ipwc;
		var mbc = document.frmcreatemeracc.mbc;
		var ksw = document.frmcreatemeracc.ksw;
		var visa = document.frmcreatemeracc.visa;
		var msk = document.frmcreatemeracc.merseckey;

var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if(mercountry.value == "pso"){
			alert("Please Select the appropriate Merchant Country");
			mercountry.focus();
			return false;
		}

		if(mertype.value == "pso"){
			alert("Please Select the appropriate Merchant Profile");
			mertype.focus();
			return false;
		}

		if(acctype.value == "pso"){
			alert("Please Select the appropriate Merchant account type");
			acctype.focus();
			return false;
		}

		if(mername.value == ""){
			alert("Please enter the appropriate Merchant Name e.g. ABC Company Ltd");
			mername.focus();
			return false;
		}

		if(vid.value == ""){
			alert("Please enter the appropriate Merchant Vendor ID");
			vid.focus();
			return false;
		}

		if(city.value == ""){
			alert("Please enter the Merchant's city");
			city.focus();
			return false;
		}

		if(mertel.value == ""){
			alert("Please enter the Merchant's telephone number");
			mertel.focus();
			return false;
		}

		if(mertel.value == "254"){	//mertel.value == "254"
			alert("Please enter the Merchant's full telephone number");
			mertel.focus();
			return false;
		}

		if(mtelchk.substr(0,3) != "254" && acctype.value == "ipypos"){
			alert("Please enter the Merchant's telephone number starting with prefix '254'");
			mertel.focus();
			return false;
		}

		if(email.value == ""){
			alert("Please enter the Merchant's email address");
			email.focus();
			return false;
		}

		if(!email.value.match(reg)){
			alert("You have entered an invalid email address!");  
			email.focus();  
			return false;  
		}

		if(postal.value == ""){
			alert("Please enter the Merchant's Postal address");
			postal.focus();
			return false;
		}

		if(meremail.value == "" && acctype.value == "ipypos"){
			alert("Please enter the Merchant's iPay POS Notification email address");
			meremail.focus();
			return false;
		}

		if(!meremail.value.match(reg) && acctype.value == "ipypos"){
			alert("You have entered an invalid email address!");
			meremail.focus();
			return false;
		}

		if(mertelephone.value == "" && acctype.value == "ipypos"){
			alert("Please enter the Merchant's iPay POS Notification telephone number in the format 2547xxxxxxxx");
			mertelephone.focus();
			return false;
		}

		if(mtelchk2.substr(0,3) != "254" && acctype.value == "ipypos"){
			alert("Please enter the Merchant's telephone number starting with prefix '254'");
			mertelephone.focus();
			return false;
		}

		if(mmc.value == "" && acctype.value == "ipy"){
			alert("Please enter the correct iPay Online / POS Mobile money Commission rate. Default value = 3.00%");
			mmc.focus();
			return false;
		}

		if(ipwc.value == "" && acctype.value == "ipy"){
			alert("Please enter the correct iPay Online / POS iPay Wallet Commission rate. Default value = 3.00%");
			ipwc.focus();
			return false;
		}

		if(mbc.value == "" && acctype.value == "ipy"){
			alert("Please enter the correct iPay Online / POS Mobile Banking Commission rate. Default value = 5.00%");
			mbc.focus();
			return false;
		}

		if(ksw.value == "" && acctype.value == "ipy"){
			alert("Please enter the correct iPay Online Kenswitch Card Commission rate. Default value = 3.80% ");
			ksw.focus();
			return false;
		}

		if(visa.value == "" && acctype.value == "ipy"){
			alert("Please enter the correct iPay Online Credit Card Commission rate. Default value = 3.50% ");
			visa.focus();
			return false;
		}

		if(msk.value == "" && acctype.value == "ipy"){
			alert("Please enter the Merchant's designated security key.\n Please note that it is CASE SENSITIVE.");
			msk.focus();
			return false;
		}		
	}	//end function


	function emavalidate(){	//validate the Edit Merchant Account form
		var mertype = document.frmeditmeracc.mertype;
		var acctype = document.frmeditmeracc.acctype;
		var mername = document.frmeditmeracc.mername;
		var vid = document.frmeditmeracc.vid;
		var city = document.frmeditmeracc.city;
		var mertel = document.frmeditmeracc.mertel;
		var mtelchk = mertel.value;
		var email = document.frmeditmeracc.email;
		var postal = document.frmeditmeracc.postal;

		var chkbx = document.frmeditmeracc.ipychkbx;
		var meremail = document.frmeditmeracc.mertxnemail;
		var mertelephone = document.frmeditmeracc.mertxntel;
		var mtelchk2 = mertelephone.value;

		var mmc = document.frmeditmeracc.mmc;
		var ipwc = document.frmeditmeracc.ipwc;
		var mbc = document.frmeditmeracc.mbc;
		var ksw = document.frmeditmeracc.ksw;
		var visa = document.frmeditmeracc.visa;
		var msk = document.frmeditmeracc.merseckey;

var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if(mertype.value == "pso"){
			alert("Please Select the appropriate Merchant Profile");
			mertype.focus();
			return false;
		}

		if(acctype.value == "pso"){
			alert("Please Select the appropriate Merchant account type");
			acctype.focus();
			return false;
		}

		if(mername.value == ""){
			alert("Please enter the appropriate Merchant Name e.g. ABC Company Ltd");
			mername.focus();
			return false;
		}

		if(vid.value == ""){
			alert("Please enter the appropriate Merchant Vendor ID");
			vid.focus();
			return false;
		}

		if(city.value == ""){
			alert("Please enter the Merchant's city");
			city.focus();
			return false;
		}

		if(mertel.value == ""){
			alert("Please enter the Merchant's telephone number");
			mertel.focus();
			return false;
		}

		if(mertel.value == "254"){	//mertel.value == "254"
			alert("Please enter the Merchant's full telephone number");
			mertel.focus();
			return false;
		}

		if(mtelchk.substr(0,3) != "254" && acctype.value == "ipypos"){
			alert("Please enter the Merchant's telephone number starting with prefix '254'");
			mertel.focus();
			return false;
		}

		if(email.value == ""){
			alert("Please enter the Merchant's email address");
			email.focus();
			return false;
		}

		if(!email.value.match(reg)){
			alert("You have entered an invalid email address!");  
			email.focus();  
			return false;  
		}

		if(postal.value == ""){
			alert("Please enter the Merchant's Postal address");
			postal.focus();
			return false;
		}

		if(meremail.value == "" && acctype.value == "ipypos"){
			alert("Please enter the Merchant's iPay POS Notification email address");
			meremail.focus();
			return false;
		}

		if(!meremail.value.match(reg) && acctype.value == "ipypos"){
			alert("You have entered an invalid email address!");
			meremail.focus();
			return false;
		}

		if(mertelephone.value == "" && acctype.value == "ipypos"){
			alert("Please enter the Merchant's iPay POS Notification telephone number in the format 2547xxxxxxxx");
			mertelephone.focus();
			return false;
		}

		if(mtelchk2.substr(0,3) != "254" && acctype.value == "ipypos"){
			alert("Please enter the Merchant's telephone number starting with prefix '254'");
			mertelephone.focus();
			return false;
		}


		if(mmc.value == "" && acctype.value == "ipy"){
			alert("Please enter the correct iPay Online / POS Commission rate. Default value = 3.00%");
			mmc.focus();
			return false;
		}

		if(ipwc.value == "" && acctype.value == "ipy"){
			alert("Please enter the correct iPay Online / POS Commission rate. Default value = 3.00%");
			ipwc.focus();
			return false;
		}

		if(mbc.value == "" && acctype.value == "ipy"){
			alert("Please enter the correct iPay Online / POS Commission rate. Default value = 5.00%");
			mbc.focus();
			return false;
		}

		if(ksw.value == "" && acctype.value == "ipy"){
			alert("Please enter the correct iPay Online Kenswitch Card Commission rate. Default value = 3.80% ");
			ksw.focus();
			return false;
		}

		if(visa.value == "" && acctype.value == "ipy"){
			alert("Please enter the correct iPay Online Credit Card Commission rate. Default value = 3.50% ");
			visa.focus();
			return false;
		}

		if(msk.value == "" && acctype.value == "ipy"){
			alert("Please enter the Merchant's designated security key.\n Please note that it is CASE SENSITIVE.");
			msk.focus();
			return false;
		}		
	}	//end function


	function remitvalidate(){
		//if status is set to 1 then email field MUST be filled in and MUST be a well formed email address
		var mercountry = document.frmremitmeracc.mercountry;
		var mertype = document.frmremitmeracc.mertype;
		var acctype = document.frmremitmeracc.acctype;
		var mername = document.frmremitmeracc.mername;
		var vid = document.frmremitmeracc.vid;
		var status = document.frmremitmeracc.status;
		var release = document.frmremitmeracc.release;
		var email = document.frmremitmeracc.email;
		var tel = document.frmremitmeracc.telephone;
		var curr = document.frmremitmeracc.curr;

		var bankname = document.frmremitmeracc.bankname;
		var bankbranch = document.frmremitmeracc.bankbranch;
		var accname = document.frmremitmeracc.accname;
		var accnum = document.frmremitmeracc.accnum;
		var bnkswift = document.frmremitmeracc.bnkswift;
		var paymode = document.frmremitmeracc.paymode;
		var remitmode = document.frmremitmeracc.remitmode;
		var remitcostke = document.frmremitmeracc.remitcostke;
		var remitcostug = document.frmremitmeracc.remitcostug;
		var remitcosttz = document.frmremitmeracc.remitcosttz;
		var remitcostrw = document.frmremitmeracc.remitcostrw;
		var remitcostus = document.frmremitmeracc.remitcostus;
		var remitdb = document.frmremitmeracc.remitdb;

var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if(mercountry.value == "pso"){
			alert("Please select the iPay Merchant Country of Operation");
			mercountry.focus();
			return false;
		}

		if(mertype.value == "pso"){
			alert("Please select the iPay Merchant Channel Type");
			mertype.focus();
			return false;
		}

		if(acctype.value == "pso"){
			alert("Please select the Merchant Account Type");
			acctype.focus();
			return false;
		}

		if(mername.value == ""){
			alert("Please enter the Merchant Name");
			mername.focus();
			return false;
		}

		if(vid.value == ""){
			alert("Please enter the Merchant iPay Vendor ID");
			vid.focus();
			return false;
		}

		if(status.value == ""){
			alert("Please select the Merchant Bank Account Details Status");
			status.focus();
			return false;
		}

		if(release.value == ""){
			alert("Please enter the Merchant's Release Level Amount");
			release.focus();
			return false;
		}

		if(isNaN(release.value)){
			alert("Please enter a numerical entry for the Merchant's Release Level Amount");
			release.value = "";
			release.focus();
			return false;
		}

		if(email.value == ""){
			alert("Please enter the Merchant's email.");
			email.focus();
			return false;
		}

		if(!email.value.match(reg)){
			alert("You have entered an invalid email address!");  
			email.focus();  
			return false;  
		}

		if(tel.value == ""){
			alert("Please enter the Merchant's Telephone Number");
			tel.focus();
			return false;
		}

		if(curr.value == ""){
			alert("Please select the Merchant's Currency of Remittance");
			curr.focus();
			return false;
		}

		if(paymode.value == ""){
			alert("Please select the Merchant's Mode of Remittance Payment");
			paymode.focus();
			return false;
		}

		if(paymode.value == "MPESA" && curr.value != "KES"){
			alert("Please change the Merchant's Mode of Remittance Payment or change the currency to KES");
			paymode.focus();
			return false;
		}

		if(bankname.value == "" && paymode.value != "MPESA"){
			alert("Please enter the Merchant's Remittance Bank Code.");
			bankname.focus();
			return false;
		}

		if(bankname.value == "" && paymode.value == "MPESA"){
			alert("Enter the designated MPESA Number in the [Bank Name] field and pad the other Bank related fields with 'NA'");
			bankbranch.value = "NA";
			accname.value = "NA";
			accnum.value = "NA";
			bnkswift.value = "NA";
			bankname.focus();
			return false;
		}

		if(bankname.value != "" && paymode.value == "MPESA" && isNaN(bankname.value)){
			alert("Enter the designated MPESA Number in the [Bank Name] field and pad the other Bank related fields with 'NA'");
			bankname.value = "";
			bankbranch.value = "NA";
			accname.value = "NA";
			accnum.value = "NA";
			bnkswift.value = "NA";
			bankname.focus();
			return false;
		}

		if(bankbranch.value != "NA" && paymode.value == "MPESA"){
			alert("Since your remittance mode is set to MPESA, please set the [Branch Name] field to 'NA'");
			bankname.value = "";
			bankbranch.value = "NA";
			accname.value = "NA";
			accnum.value = "NA";
			bnkswift.value = "NA";
			return false;
		}

		if(accname.value != "NA" && paymode.value == "MPESA"){
			alert("Since your remittance mode is set to MPESA, please set the [Account Name] field to 'NA'");
			bankname.value = "";
			bankbranch.value = "NA";
			accname.value = "NA";
			accnum.value = "NA";
			bnkswift.value = "NA";
			return false;
		}

		if(accnum.value != "NA" && paymode.value == "MPESA"){
			alert("Since your remittance mode is set to MPESA, please set the [Account Number] field to 'NA'");
			bankname.value = "";
			bankbranch.value = "NA";
			accname.value = "NA";
			accnum.value = "NA";
			bnkswift.value = "NA";
			return false;
		}

		if(bnkswift.value != "NA" && paymode.value == "MPESA"){
			alert("Since your remittance mode is set to MPESA, please set the [Bank SWIFT code] field to 'NA'");
			bankname.value = "";
			bankbranch.value = "NA";
			accname.value = "NA";
			accnum.value = "NA";
			bnkswift.value = "NA";
			return false;
		}

		if(bankbranch.value == "" && paymode.value != "MPESA"){
			alert("Please enter the Merchant's Remittance Bank Branch Code.");
			bankbranch.focus();
			bankbranch.value == "NA";
			return false;
		}

		if(accname.value == "" && paymode.value != "MPESA"){
			alert("Please select the Merchant's Bank Account Name");
			accname.focus();
			accname.value == "NA";
			return false;
		}

		if(accnum.value == "" && paymode.value != "MPESA"){
			alert("Please select the Merchant's Bank Account Number");
			accnum.focus();
			accnum.value == "NA";
			return false;
		}

		if(bnkswift.value == "" && paymode.value != "MPESA"){
			alert("Please select the Merchant's Bank SWIFT Code");
			bnkswift.focus();
			bnkswift.value == "NA";
			return false;
		}

		if(remitmode.value == ""){
			alert("Please select the chosen frequency of reconciliation");
			remitmode.focus();
			return false;
		}

		if(remitcostke.value == "" && curr.value == "KES"){
			alert("Please select the chosen remittance cost (KES)");
			remitcostke.focus();
			return false;
		}

		if(paymode.value == "MPESA" && remitcostke.value != "50" && curr.value == "KES"){
			alert("Please select the appropriate remittance cost of KES 50 for MPESA");
			remitcostke.focus();
			return false;
		}

		if(paymode.value == "EFT" && remitcostke.value != "110" && curr.value == "KES"){
			alert("Please select the appropriate remittance cost of KES 110 for EFT");
			remitcostke.focus();
			return false;
		}

		if(paymode.value == "RTGS" && remitcostke.value != "550" && curr.value == "KES"){
			alert("Please select the appropriate remittance cost of KES 550 for RTGS");
			remitcostke.focus();
			return false;
		}

		if(remitcostus.value == "" && curr.value == "USD"){
			alert("Please select the chosen remittance cost (USD)");
			remitcostus.focus();
			return false;
		}

		if(paymode.value == "EFT" && remitcostus.value != "10" && curr.value == "USD"){
			alert("Please select the appropiate remittance cost USD 10 for EFT");
			remitcostus.focus();
			return false;
		}

		if(paymode.value == "RTGS" && remitcostus.value != "30" && curr.value == "USD"){
			alert("Please select the appropiate remittance cost USD 30 for RTGS");
			remitcostus.focus();
			return false;
		}

		if(remitcostug.value == "" && curr.value == "UGX"){
			alert("Please select the chosen remittance cost (UGX)");
			remitcostug.focus();
			return false;
		}

		if(paymode.value == "EFT" && remitcostug.value != "6000" && curr.value == "UGX"){
			alert("Please select the appropiate remittance cost UGX 6000 for EFT");
			remitcostug.focus();
			return false;
		}

		if(paymode.value == "RTGS" && remitcostug.value != "30000" && curr.value == "UGX"){
			alert("Please select the appropiate remittance cost UGX 30000 for RTGS");
			remitcostug.focus();
			return false;
		}

		if(remitcosttz.value == "" && curr.value == "TZS"){
			alert("Please select the chosen remittance cost (TZS)");
			remitcosttz.focus();
			return false;
		}

		if(paymode.value == "EFT" && remitcosttz.value != "6000" && curr.value == "TZS"){
			alert("Please select the appropiate remittance cost TZS 6000 for EFT");
			remitcosttz.focus();
			return false;
		}

		if(paymode.value == "RTGS" && remitcosttz.value != "30000" && curr.value == "TZS"){
			alert("Please select the appropiate remittance cost TZS 30000 for RTGS");
			remitcosttz.focus();
			return false;
		}

		if(remitcostrw.value == "" && curr.value == "RWF"){
			alert("Please select the chosen remittance cost (RWF)");
			remitcostrw.focus();
			return false;
		}

		if(paymode.value == "EFT" && remitcostrw.value != "6000" && curr.value == "RWF"){
			alert("Please select the appropiate remittance cost RWF 6000 for EFT");
			remitcostrw.focus();
			return false;
		}

		if(paymode.value == "RTGS" && remitcostrw.value != "30000" && curr.value == "RWF"){
			alert("Please select the appropiate remittance cost RWF 30000 for RTGS");
			remitcostrw.focus();
			return false;
		}

		if(remitdb.value == ""){
			alert("Please select the data repository");
			remitdb.focus();
			return false;
		}

		if(remitdb.value == "numeric" && acctype.value == "ipy" && isNaN(vid.value)){
			alert("Please select 'alpha' as the repository");
			remitdb.focus();
			return false;
		}

		if(remitdb.value == "alpha" && acctype.value == "ipy" && !isNaN(vid.value)){
			alert("Please select 'numeric' as the repository");
			remitdb.focus();
			return false;
		}

		return true;
	}	//end function


	function remitmeracc(){
		var chk = document.frmremitmeracc.acctype.value;
		//alert(chk);
		if(chk == "ipy"){
			document.frmremitmeracc.vid.disabled = false;
			document.frmremitmeracc.status.disabled = false;
			document.frmremitmeracc.release.disabled = false;
			document.frmremitmeracc.email.disabled = false;
			document.frmremitmeracc.telephone.disabled = false;
			document.frmremitmeracc.curr.disabled = false;
			document.frmremitmeracc.country.disabled = false;
			document.frmremitmeracc.bankname.disabled = false;
			document.frmremitmeracc.bankbranch.disabled = false;
			document.frmremitmeracc.accname.disabled = false;
			document.frmremitmeracc.accnum.disabled = false;
			document.frmremitmeracc.bnkswift.disabled = false;
			document.frmremitmeracc.paymode.disabled = false;
			document.frmremitmeracc.remitmode.disabled = false;
			document.frmremitmeracc.remitcostke.disabled = false;
			document.frmremitmeracc.remitcostug.disabled = false;
			document.frmremitmeracc.remitcosttz.disabled = false;
			document.frmremitmeracc.remitcostrw.disabled = false;
			document.frmremitmeracc.remitcostus.disabled = false;
			document.frmremitmeracc.remitdb.disabled = false;
		}
	}	//end function

	
	function remitmerreset(){
			document.frmremitmeracc.vid.disabled = false;
			document.frmremitmeracc.status.disabled = false;
			document.frmremitmeracc.release.disabled = false;
			document.frmremitmeracc.email.disabled = false;
			document.frmremitmeracc.telephone.disabled = false;
			document.frmremitmeracc.curr.disabled = false;
			document.frmremitmeracc.country.disabled = false;
			document.frmremitmeracc.bankname.disabled = false;
			document.frmremitmeracc.bankbranch.disabled = false;
			document.frmremitmeracc.accname.disabled = false;
			document.frmremitmeracc.accnum.disabled = false;
			document.frmremitmeracc.bnkswift.disabled = false;
			document.frmremitmeracc.paymode.disabled = false;
			document.frmremitmeracc.remitmode.disabled = false;
			document.frmremitmeracc.remitcostke.disabled = false;
			document.frmremitmeracc.remitcostug.disabled = false;
			document.frmremitmeracc.remitcosttz.disabled = false;
			document.frmremitmeracc.remitcostrw.disabled = false;
			document.frmremitmeracc.remitcostus.disabled = false;
			document.frmremitmeracc.remitdb.disabled = false;
	}	//end function


	function remitmercurr(){
		var currtype = document.frmremitmeracc.curr.value;
		//alert(currtype);
		//document.frmremitmeracc.remitcostke.hidden = false;
		if(currtype == "KES") {
			document.frmremitmeracc.remitcostke.disabled = false;
			document.frmremitmeracc.remitcostug.disabled = true;
			document.frmremitmeracc.remitcosttz.disabled = true;
			document.frmremitmeracc.remitcostrw.disabled = true;
			document.frmremitmeracc.remitcostus.disabled = false;
		} else if (currtype == "UGX") {
			document.frmremitmeracc.remitcostke.disabled = true;
			document.frmremitmeracc.remitcostug.disabled = false;
			document.frmremitmeracc.remitcosttz.disabled = true;
			document.frmremitmeracc.remitcostrw.disabled = true;
			document.frmremitmeracc.remitcostus.disabled = false;
		} else if (currtype == "TZS") {
			document.frmremitmeracc.remitcostke.disabled = true;
			document.frmremitmeracc.remitcostug.disabled = true;
			document.frmremitmeracc.remitcosttz.disabled = false;
			document.frmremitmeracc.remitcostrw.disabled = true;
			document.frmremitmeracc.remitcostus.disabled = false;
		} else if (currtype == "RWF") {
			document.frmremitmeracc.remitcostke.disabled = true;
			document.frmremitmeracc.remitcostug.disabled = true;
			document.frmremitmeracc.remitcosttz.disabled = true;
			document.frmremitmeracc.remitcostrw.disabled = false;
			document.frmremitmeracc.remitcostus.disabled = false;
		}
	}	//end function


	function remitmercountry(){
		var country = document.frmremitmeracc.country.value;
		//alert(currtype);
		//document.frmremitmeracc.remitcostke.hidden = false;
		if(currtype == "ke") {
			document.frmremitmeracc.remitcostke.disabled = false;
			document.frmremitmeracc.remitcostug.disabled = true;
			document.frmremitmeracc.remitcosttz.disabled = true;
			document.frmremitmeracc.remitcostrw.disabled = true;
			document.frmremitmeracc.remitcostus.disabled = false;
		} else if (currtype == "ug") {
			document.frmremitmeracc.remitcostke.disabled = true;
			document.frmremitmeracc.remitcostug.disabled = false;
			document.frmremitmeracc.remitcosttz.disabled = true;
			document.frmremitmeracc.remitcostrw.disabled = true;
			document.frmremitmeracc.remitcostus.disabled = false;
		} else if (currtype == "tz") {
			document.frmremitmeracc.remitcostke.disabled = true;
			document.frmremitmeracc.remitcostug.disabled = true;
			document.frmremitmeracc.remitcosttz.disabled = false;
			document.frmremitmeracc.remitcostrw.disabled = true;
			document.frmremitmeracc.remitcostus.disabled = false;
		} else if (currtype == "rw") {
			document.frmremitmeracc.remitcostke.disabled = true;
			document.frmremitmeracc.remitcostug.disabled = true;
			document.frmremitmeracc.remitcosttz.disabled = true;
			document.frmremitmeracc.remitcostrw.disabled = false;
			document.frmremitmeracc.remitcostus.disabled = false;
		}
	}	//end function


	function remitmerpaymode(){
		var paymode = document.frmremitmeracc.paymode.value;

		if(paymode == "" || paymode == "EFT" || paymode == "RTGS"){
			document.frmremitmeracc.bankname.value = "";
			document.frmremitmeracc.bankbranch.value = "";
			document.frmremitmeracc.accname.value = "";
			document.frmremitmeracc.accnum.value = "";
			document.frmremitmeracc.bnkswift.value = "";
		} else {
			document.frmremitmeracc.bankname.value = "";
			document.frmremitmeracc.bankbranch.value = "NA";
			document.frmremitmeracc.accname.value = "NA";
			document.frmremitmeracc.accnum.value = "NA";
			document.frmremitmeracc.bnkswift.value = "NA";
		}
	}	//end function


	function searchtxn(){
		var acctype = document.frmsearchtxn.acctype.value;
		var acchannel = document.frmsearchtxn.acchannel.value;
		var tsl = document.frmsearchtxn.txnloc.value;
		var midtn = document.frmsearchtxn.mercode.value;
		var midtntype = document.frmsearchtxn.mercodetype.value;
		var txncd = document.frmsearchtxn.txncode.value;
		var ctnum = document.frmsearchtxn.custel.value;


		if(acctype == "pso"){
			alert("Please select the Merchant Account Type");
			document.frmsearchtxn.acctype.focus();
			return false;
		}

		if(acchannel == "pso" && document.frmsearchtxn.acchannel.disabled == false){
			alert("Please select the Merchant Channel Type");
			document.frmsearchtxn.acchannel.focus();
			return false;
		}

		if(tsl == ""){
			alert("Please select the Merchant Data Location Type");
			document.frmsearchtxn.txnloc.focus();
			return false;
		}

		if(tsl == "1" && midtn == ""){
			alert("Please enter the Merchant ID");
			document.frmsearchtxn.mercode.focus();
			return false;
		}

		if(midtn == "" && midtntype != "none"){
			alert("Please select the Merchant ID");
			document.frmsearchtxn.mercode.focus();
			return false;
		}

		if(midtn != "" && midtntype == "none" && tsl == "1"){
			alert("Please select the Merchant ID Type");
			document.frmsearchtxn.mercodetype.focus();
			return false;
		}

		if(midtn == "" && txncd == "" && ctnum == "") {
			alert("Please enter at least one value in the fields below");
			document.frmsearchtxn.mercode.focus();
			return false;
		}

		if(txncd == "" && ctnum == "") {
			alert("Please enter at least one value in either / both of the fields below");
			document.frmsearchtxn.txncode.focus();
			return false;
		}

	}	//end function


	function channeloc(){
		document.frmsearchtxn.acchannel.disabled = false;
	}


	function searchloc(){
		var acctype = document.frmsearchtxn.txnloc.value;

		if(acctype == "0"){
			document.frmsearchtxn.mercodetype.disabled = true;
		} else {
			document.frmsearchtxn.mercodetype.disabled = false;
		}

	}	//end function


	function searchres(){
			document.frmsearchtxn.mercodetype.disabled = false;
	}	//end function


	function addtxn(){
		var acctype = document.frmentertxn.acctype.value;
		var acchannel = document.frmentertxn.acchannel;
		var channel = document.frmentertxn.channel;
		var mercode = document.frmentertxn.mercode.value;
		var msisdn = document.frmentertxn.custel.value;
		var fname = document.frmentertxn.fname.value;
		var lname = document.frmentertxn.lname.value;
		var txnamt = document.frmentertxn.txnamt.value;
		var mvid = document.frmentertxn.mvid.value;
		var mat = "";	//string place holder

		if(acctype == "pso"){
			alert("Please select the Merchant Account Type");
			document.frmentertxn.acctype.focus();
			return false;
		}

		if(acchannel.value == "pso" && acchannel.disabled == false){
			alert("Please select the Merchant Channel");
			document.frmentertxn.acchannel.focus();
			return false;
		}

		if(channel.value == "" && channel.disabled == false){
			alert("Please select the channel through which the transaction originated.");
			document.frmentertxn.channel.focus();
			return false;
		}

		if(mercode == ""){
			alert("Please enter the transaction code");
			document.frmentertxn.mercode.focus();
			return false;
		}

		//remove and prevent all special character sets including the dot.

		if(msisdn == ""){
			alert("Please enter the telephone number in the following format \n (2547xxxxxxxx)");
			document.frmentertxn.custel.focus();
			return false;
		}

		if(msisdn == "254"){
			alert("Please enter the telephone number in the following format \n (2547xxxxxxxx)");
			document.frmentertxn.custel.focus();
			return false;
		}

		if(msisdn.substr(0,4) != "2547"){
			alert("Please enter the Merchant's telephone number starting with prefix '2547xxxxxxxx'");
			document.frmentertxn.custel.value = "254";
			document.frmentertxn.custel.focus();
			return false;
		}

		if(isNaN(msisdn)){
			alert("Please enter only numbers for the customer's telephone number");
			document.frmentertxn.custel.value = "";			
			document.frmentertxn.custel.focus();
			return false;
		}

		//also remove and prevent all special character sets including the dot and the set of all Alpha characters

		if(fname == ""){
			alert("Please enter the customer's first name");
			document.frmentertxn.fname.focus();
			return false;
		}

		if(lname == ""){
			alert("Please enter the customer's last name");
			document.frmentertxn.lname.focus();
			return false;
		}

		if(txnamt == ""){
			alert("Please enter the transaction amount");
			document.frmentertxn.txnamt.focus();
			return false;
		}

		if(isNaN(txnamt)){
			alert("Please enter a number for the transaction amount");
			document.frmentertxn.txnamt.value = "";			
			document.frmentertxn.txnamt.focus();
			return false;
		}

		var numstatus = txnamt.indexOf('.');

		if(numstatus != -1){
			alert("Please enter a number WITHOUT the '.00' in the transaction amount");
			document.frmentertxn.txnamt.value = "";			
			document.frmentertxn.txnamt.focus();
			return false;			
		}

		var numstatus = txnamt.indexOf(' ');

		if(numstatus != -1){
			alert("Please enter a number WITHOUT any spaces in the transaction amount");
			document.frmentertxn.txnamt.value = "";			
			document.frmentertxn.txnamt.focus();
			return false;			
		}

		//remove and prevent all special character sets including the dot.

		if(mvid == ""){
			alert("Please enter the appropriate merchant vendor id");
			document.frmentertxn.mvid.focus();
			return false;
		}
		
		if(acctype == 'ipy'){
			mat = "iPay Online / iPay POS";
		}

		//dialog: you are about to enter the following data... are you sure? yes | no
var answer = confirm("You are about to commit the following data:\n\nMerchant Account Type: " + mat + "\nPayment Channel: " + channel.value + "\nMobile Transaction Code: " + mercode + "\nCustomer Tel: " + msisdn + "\nNames: " + fname + " " + lname + "\nTransaction Amount: " + txnamt + "\nVendor ID: " + mvid + "\n\nDo you want to continue ?");
		if (answer)
			return true;	//		alert("You said: Ok");
		else
			alert("You have cancelled this transaction data submission");
			return false;
	}	//end function


	function dsblChannel(){
		var mat = document.frmentertxn.acctype;
			document.frmentertxn.channel.disabled = false;
			document.frmentertxn.acchannel.disabled = false;		

	}	//end function


	function dsblChannelReset(){
			document.frmentertxn.channel.disabled = false;
			document.frmentertxn.acchannel.disabled = false;
	}	//end function


	function edittxn(){
		var acchannel = document.frmedittxn.acchannel;
		var txncode = document.frmedittxn.txncode;
		var tel = document.frmedittxn.tel;

		if(acchannel.value == "pso"){
			alert("Please select the Merchant Channel");
			acchannel.focus();
			return false;
		}

		if(txncode.value == "" && (tel.value == "" || tel.value == "254")){
			alert("Please enter the Transaction Code and/or the customer's telephone number");
			txncode.focus();
			return false;
		}

		if(tel.value != "" && isNaN(tel.value)){
			alert("Please enter a valid customer telephone number");
			tel.value = "";
			tel.focus();
			return false;
		}
			return true;

	}	//end function


	function edittxn_ag(){
		var oldnames = document.frmedittxn2.oldnames;
		var newnames = document.frmedittxn2.newnames;

		var vid = document.frmedittxn2.newvid;
		var oldvid = document.frmedittxn2.oldvid;
		
		if(vid.value == "" && newnames.value == ""){
			alert("Please enter a value for the new Vendor ID and/or the Customer Names");
			return false;
		}

		if(oldnames.value == newnames.value){
			alert("The old and new values for the Customer Name are the same");
			newnames.value = "";
			newnames.focus();
			return false;
		}
		
		if(newnames.value != ""){				//we wanna edit the customer's name
			var strnewnames = newnames.value;
			var newnamesArray = strnewnames.split(" ");	//explode the string into an array delimited by " " character
			var arrLength = newnamesArray.length;		//how many elements in the array? ... should be 2 and only 2

			if(arrLength < 2 || arrLength > 2){
				alert("The new values for the Customer Name should only contain 2 names");
				newnames.value = "";
				newnames.focus();
				return false;
			}
		}

		if((vid.value == oldvid.value) && (oldnames.value == newnames.value)){
			alert("The old and new values for the Vendor ID and the Customer Names are the same");
			vid.value = "";
			newnames.value = "";
			newnames.focus();
			return false;
		}

		if(vid.value != "" && newnames.value == ""){	//change VID only
			var answer = confirm("You are about to change the Vendor ID from " + oldvid.value + " to " + vid.value + "\nDo you want continue ?");
			if (answer)
				return true;	//		alert("You said: Ok");
			else
				alert("You have cancelled this Vendor ID update action");
				vid.value = "";
				return false;
		} else if(vid.value != "" && newnames.value != ""){	//change both
			var answer = confirm("You are about to change the following: \nThe Vendor ID to " + vid.value + " from " + oldvid.value + "\nThe Customer names from " + oldnames.value + " to " + newnames.value + "\n\nDo you want continue ?");
			if (answer)
				return true;	//		alert("You said: Ok");
			else
				alert("You have cancelled this Vendor ID and Customer Names update action");
				vid.value = "";
				newnames.value = "";
				return false;
		} else if(vid.value == "" && newnames.value != ""){	//change name only
			var answer = confirm("You're about to change Customer names from " + oldnames.value + " to " + newnames.value + "\n\nDo you want continue ?");
			if (answer)
				return true;	//		alert("You said: Ok");
			else
				alert("You have cancelled this Customer Names update action");
				newnames.value = "";
				return false;
		}
	}	//end function


	function cmareset(){
		document.frmcreatemeracc.ipychkbx.disabled = false;
		document.frmcreatemeracc.mertxnemail.disabled = false;
		document.frmcreatemeracc.mertxntel.disabled = false;

		document.frmcreatemeracc.mmc.disabled = false;
		document.frmcreatemeracc.ipwc.disabled = false;
		document.frmcreatemeracc.mbc.disabled = false;
		document.frmcreatemeracc.ksw.disabled = false;
		document.frmcreatemeracc.visa.disabled = false;
		document.frmcreatemeracc.merseckey.disabled = false;
	}	//end function


	function emareset(){
		document.frmeditmeracc.ipychkbx.disabled = false;
		document.frmeditmeracc.mertxnemail.disabled = false;
		document.frmeditmeracc.mertxntel.disabled = false;

		document.frmeditmeracc.mmc.disabled = false;
		document.frmeditmeracc.ipwc.disabled = false;
		document.frmcreatemeracc.mbc.disabled = false;
		document.frmeditmeracc.ksw.disabled = false;
		document.frmeditmeracc.visa.disabled = false;
		document.frmcreatemeracc.merseckey.disabled = false;
	}	//end function

	
	function copyvals(){
		var chkbx = document.frmcreatemeracc.ipychkbx;

		var email1 = document.frmcreatemeracc.email;
		var email2 = document.frmcreatemeracc.mertxnemail;
		var tel1 = document.frmcreatemeracc.mertel;
		var tel2 = document.frmcreatemeracc.mertxntel;

var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if(!email1.value.match(reg)){
			alert("You have entered an invalid email address!");  
			email1.focus();
			chkbx.checked = false;
			return false;
		}

		if(email1.value == ""){
			alert("Please fill in the above email address field first");
			email1.focus();
			chkbx.checked = false;
		}

		if(tel1.value == "254"){
			alert("Please fill in the above telephone number field first");
			tel1.focus();
			chkbx.checked = false;
		}

		if(chkbx.checked == true && email1.value.match(reg)){
			email2.value = email1.value;
			tel2.value = tel1.value;
		}

		if(chkbx.checked == false){
			email2.value = "";
			tel2.value = "";
		}
		
	}	//end function


	function emacopyvals(){
		var chkbx = document.frmeditmeracc.ipychkbx;

		var email1 = document.frmeditmeracc.email;
		var email2 = document.frmeditmeracc.mertxnemail;
		var tel1 = document.frmeditmeracc.mertel;
		var tel2 = document.frmeditmeracc.mertxntel;

var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if(!email1.value.match(reg)){
			alert("You have entered an invalid email address!");  
			email1.focus();
			chkbx.checked = false;
			return false;
		}

		if(email1.value == ""){
			alert("Please fill in the above email address field first");
			email1.focus();
			chkbx.checked = false;
		}

		if(tel1.value == "254"){
			alert("Please fill in the above telephone number field first");
			tel1.focus();
			chkbx.checked = false;
		}

		if(chkbx.checked == true && email1.value.match(reg)){
			email2.value = email1.value;
			tel2.value = tel1.value;
		}

		if(chkbx.checked == false){
			email2.value = "";
			tel2.value = "";
		}
		
	}	//end function

	function posBranchValidate(){

		var vid = document.frmposbranch.vid;
		var poschannel = document.frmposbranch.poschannel;
		var msisdn = document.frmposbranch.msisdn;
		var email = document.frmposbranch.email;

var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if(vid.value == ""){
			alert("Please enter the branch POS ID / sub account");
			vid.focus();
			return false;
		}

		if(poschannel.value == "pso"){
			alert("Please select how notifications are to be received by this branch?");
			poschannel.focus();
			return false;
		}

		if(msisdn.disabled == false && (msisdn.value == "254" || msisdn.value == "")){
			alert("Please fill in the above telephone number field first");
			msisdn.focus();
			return false;
		}

		if(msisdn.disabled == false && (isNaN(msisdn.value))){
			alert("Please fill in the above telephone number field with a valid number starting with 254");
			msisdn.value = "254";
			msisdn.focus();
			return false;
		}

		if(msisdn.disabled == false && msisdn.value.length != 12){
			alert("Please confirm if the telephone number is a valid number of the correct length");
			msisdn.focus();
			return false;
		}

		if(msisdn.disabled == false && msisdn.value.substr(0,3) != "254"){
			alert("Please confirm if the telephone number with a valid number starting with 254");
			msisdn.focus();
			return false;
		}

		if(email.disabled == false && !email.value.match(reg)){
			alert("You have entered an invalid email address");  
			email.focus();
			return false;
		}

		if(email.disabled == false && email.value == ""){
			alert("Please fill in the above email address field first");
			email1.focus();
			return false;
		}
	}	//end function

	function posBranchValidateChg(){

		var poschannel = document.frmposbranch.poschannel;
		var msisdn = document.frmposbranch.msisdn;
		var email = document.frmposbranch.email;
		
		if(poschannel.value == "pos"){
			msisdn.disabled = false;
			email.disabled = false;
		}

		if(poschannel.value == "both"){
			msisdn.disabled = false;
			email.disabled = false;
		}

		if(poschannel.value == "email"){
			msisdn.disabled = true;
			email.disabled = false;
		}

		if(poschannel.value == "sms"){
			msisdn.disabled = false;
			email.disabled = true;
		}

	}	//end function

	function posBranchValidateReset(){

		var msisdn = document.frmposbranch.msisdn;
		var email = document.frmposbranch.email;
		
		msisdn.disabled = false;
		email.disabled = false;

	}	//end function

//-->