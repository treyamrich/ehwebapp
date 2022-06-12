//Formats a phone number to be a US phone num without - or ()
export function formatPhoneNum(phoneNum) {
	let newNum = "+1";
	for(var i = 0; i < phoneNum.length; i++) {
		if(phoneNum[i] === "-" || phoneNum[i] === "(" || phoneNum[i] === ")")
			continue;
		newNum += phoneNum[i];
	}
	return newNum;
}