package com.geariot.platform.freelycar.model;

public enum RESCODE {

	SUCCESS(0, "成功"), 
	WRONG_PARAM(1, "参数错误"), 
	NOT_FOUND(2, "无该条记录"),
	PSW_ERROR(3, "invalid username or password"), 
	UPDATE_ERROR(4, "更新数据错误"), 
	CREATE_ERROR(5, "存储数据错误"), 
	DATE_FORMAT_ERROR(6, "日期格式错误"),
	DELETE_ERROR(7, "删除错误"), 
	DUPLICATED_ERROR(8,"重复数据"),
	FILE_ERROR(9, "上传文件错误"),
	
	PERMISSION_ERROR(10, "用户尚未注册MB"),
	VALIDMEMBERCARD_ST(11, "有效会员卡用户"),
	NONMEMBERCARD_ST(12, "非会员卡用户"),
	
	JSON_ERROR(13, "Json解析出错"),
	
	OPENID_ERROR(14, "openid信息丢失错误"),
	
	EXTENSION_TIMES_ERROR(15, "延期次数超过规定次数"),
	FILE_NOT_FOUND(16, "文件不存在"),
	APPOINTMENT_OP_EROOR(17, "open gym或personal training操作请联系门店"),
	LATE_BOOK_ERROR(18, "对不起，预订过晚，该课程已开始"),
	UNKNOW_ERROR(19, "系统发生位置错误"),
	REPEAT_VISIT_ERROR(20,"已订过该课程，请勿重复订购"),
	ORDER_ERROR(21,"微信下单接口失败"),
	CALL_PORT_ERROR(22,"微信下单接口调用失败"),
	
	PHONE_BINDED_BY_OTHER(23, "手机号被其他账号绑定"),
	PHONE_REGISTED(24, "手机号已注册MB，请绑定"),
	
	BINDED_WITH_OTHER_PHONE(25, "账号已绑定其他手机号"),


	CHECKOUT_ERROR(26, "调用chekout支付失败"),
	
	SPLIT_PAY_ERROR(27, "split购买时会员信息出错"),
	EXTENSION_PAY_ERROR(28, "续卡是service信息出错"),

	MB_BOOK_ERROR(29, "MB中预定失败"),

	NO_VALID_CARD(30, "没有有效会员卡"),

	CANCEL_ERROR(31, "取消预约错误"),
	
	SPLIT_NO_PERMISSION(32, "split购买不符合至少两人中一人未购买过的条件"),
	
	MB_REGISTER_FAIL(33, "MB中注册失败"),
	
	MB_MULTI_USER(34, "手机号在MB中有多个用户对应"),
	
	CLASS_FULL(35, "课程已满，请刷新查看是否可以进入waitlist")
	;
	
	// 定义私有变量
	private int nCode;

	private String nMsg;

	// 构造函数，枚举类型只能为私有
	private RESCODE(int _nCode, String _nMsg) {

		this.nCode = _nCode;
		this.nMsg = _nMsg;
	}

	public String getMsg() {

		return nMsg;
	}

	public int getValue() {

		return nCode;
	}
	
	@Override
	public String toString() {

		return String.valueOf(this.nCode);

	}
}
