const baseUrl = "http://localhost:8002"

export function difference(){
	uni.request({
		url:baseUrl+"/portal/difference",
		method:"POST"
	})
}