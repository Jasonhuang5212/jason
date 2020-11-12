import Cookies from 'js-cookie'

const TokenKey = 'User-Token'
const TokenTypeKey = 'User-Token-Type'

const UserInfoKey = 'User-Info'

const DeviceNumberKey = 'Device-Number'
const PlatformKey = 'Platform-Token'
const AppVersionIdKey = 'App-Version-Id'

export function getToken() {
	return Cookies.get(TokenKey)
}

export function setToken(token) {
	Cookies.set(TokenKey, token)
}

export function removeToken() {
	Cookies.remove(TokenKey)
}

export function getTokenType() {
	return Cookies.get(TokenTypeKey)
}

export function setTokenType(type) {
	Cookies.set(TokenTypeKey, type)
}

export function removeTokenType() {
	Cookies.remove(TokenTypeKey)
}


export function getDeviceNumber() {
	return Cookies.get(DeviceNumberKey)
}

export function setDeviceNumber(deviceNumber) {
	Cookies.set(DeviceNumberKey, deviceNumber)
}

export function removeDeviceNumber() {
	Cookies.remove(DeviceNumberKey)
}


export function getPlatform() {
	return Cookies.get(PlatformKey)
}

export function setPlatform(platform) {
	Cookies.set(PlatformKey, platform)
}

export function removePlatform() {
	Cookies.remove(PlatformKey)
}


export function getAppVersionId() {
	return Cookies.get(AppVersionIdKey)
}

export function setAppVersionId(appVersionId) {
	Cookies.set(AppVersionIdKey, appVersionId)
}

export function removeAppVersionId() {
	Cookies.remove(AppVersionIdKey)
}


export function getUserInfo() {
	return JSON.parse(Cookies.get(UserInfoKey) || 'null');
}

export function setUserInfo(info) {
	Cookies.set(UserInfoKey, JSON.stringify(info));
}

export function removeUserInfo () {
	Cookies.remove(UserInfoKey);
}
