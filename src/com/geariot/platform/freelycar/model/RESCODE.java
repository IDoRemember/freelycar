package com.geariot.platform.freelycar.model;

public enum RESCODE {

	SUCCESS(0, "成功"), 
	WRONG_PARAM(1, "参数错误"), 
	NOT_FOUND(2, "无该条记录"),
	UPDATE_ERROR(3, "更新数据错误"), 
	CREATE_ERROR(4, "存储数据错误"), 
	DATE_FORMAT_ERROR(5, "日期格式错误"),
	DELETE_ERROR(6, "删除错误"), 
	DUPLICATED_ERROR(7,"重复数据"),
	FILE_ERROR(8, "上传文件错误"),
	ACCOUNT_ERROR(9, "账号不存在"), 
	PSW_ERROR(10, "密码错误"), 
	ACCOUNT_LOCKED_ERROR(11, "账号已被锁定"), 
	PERMISSION_ERROR(12, "没有此权限"), 
	ALREADY_LOGIN(13, "已经登陆"), 
	ACCOUNT_EXIST(14, "该账号已存在"),
	CANNOT_DELETE_SELF(15, "无法删除当前登陆账户"),
	PHONE_EXIST(16, "手机号码已存在"),
	CAR_LICENSE_EXIST(17, "车牌号码已存在"),
	PART_SUCCESS(18, "批处理部分成功"),
	NAME_EXIST(19, "名称已存在"),
	WORK_NOT_FINISH(20, "当前订单还未完工"),
	NOT_SET_PAY_CARD(21, "未设置项目付款卡"),
	CARD_REMAINING_NOT_ENOUGH(22, "所选会员卡对应项目剩余次数不足"),
	INVENTORY_NOT_ENOUGH(23, "库存不足"),
	DISABLE_CURRENT_USER(24, "无法禁用当前登陆账户"),
	UNABLE_TO_DELETE(25, "所选项目被其他引用，无法删除"),
	NO_INCOME(26, "无对应日期订单记录"),
	UNSUPPORT_TYPE(26, "不支持该操作")
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
