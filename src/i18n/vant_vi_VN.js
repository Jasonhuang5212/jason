
export default {
	name: 'Tên',
	tel: 'Điện thoại',
	save: 'tiết kiệm',
	confirm: 'Xác nhận',
	cancel: 'Hủy bỏ',
	delete: 'xóa bỏ',
	complete: 'Hoàn thành',
	loading: 'Đang tải...',
	telEmpty: 'Vui lòng điền vào tel',
	nameEmpty: 'Vui lòng điền tên',
	nameInvalid: 'Tên không đúng',
	confirmDelete: 'Are you sure you want to delete?',
	telInvalid: 'Bạn có chắc chắn muốn xóa?',
	vanCalendar: {
		end: 'Kết thúc',
		start: 'Khởi đầu',
		title: 'Lịch',
		startEnd: 'Bắt đầu / kết thúc',
		weekdays: ['mặt trời', 'Của tôi', 'của bạn', 'Thứ Tư', 'Thu', 'miễn phí', 'Đã ngồi'],
		monthTitle: function monthTitle(year, month) {
			return year + "/" + month;
		},
		rangePrompt: function rangePrompt(maxRange) {
			return "Chọn không quá " + maxRange + " ngày";
		}
	},
	vanContactCard: {
		addText: 'Thêm thông tin liên lạc'
	},
	vanContactList: {
		addText: 'Thêm liên hệ mới'
	},
	vanPagination: {
		prev: 'Trước',
		next: 'Kế tiếp'
	},
	vanPullRefresh: {
		pulling: 'Kéo để làm mới...',
		loosing: 'Lỏng để làm mới...'
	},
	vanSubmitBar: {
		label: 'Toàn bộ：'
	},
	vanCoupon: {
		unlimited: 'Vô hạn',
		discount: function discount(_discount) {
			return _discount * 10 + "% tắt";
		},
		condition: function condition(_condition) {
			return "Ít nhất " + _condition;
		}
	},
	vanCouponCell: {
		title: 'Phiếu mua hàng',
		tips: 'Không có phiếu giảm giá',
		count: function count(_count) {
			return "Bạn có " + _count + " phiếu giảm giá";
		}
	},
	vanCouponList: {
		empty: 'Không có phiếu giảm giá',
		exchange: 'Đổi',
		close: 'Đóng',
		enable: 'Có sẵn',
		disabled: 'Không có sẵn',
		placeholder: 'Mã giảm giá'
	},
	vanAddressEdit: {
		area: 'Khu vực',
		postal: 'Thuộc về bưu điện',
		areaEmpty: 'Vui lòng chọn một khu vực nhận',
		addressEmpty: 'Địa chỉ không thể để trống',
		postalEmpty: 'Mã bưu chính sai',
		defaultAddress: 'Đặt làm địa chỉ mặc định',
		telPlaceholder: 'Điện thoại',
		namePlaceholder: 'Tên',
		areaPlaceholder: 'Khu vực'
	},
	vanAddressEditDetail: {
		label: 'Địa chỉ',
		placeholder: 'Địa chỉ'
	},
	vanAddressList: {
		add: 'thêm địa chỉ mới'
	}
};