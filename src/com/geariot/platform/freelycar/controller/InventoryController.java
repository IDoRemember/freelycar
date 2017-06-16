package com.geariot.platform.freelycar.controller;

import java.util.Date;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.geariot.platform.freelycar.entities.Inventory;
import com.geariot.platform.freelycar.entities.InventoryBrand;
import com.geariot.platform.freelycar.entities.InventoryType;

@RestController
@RequestMapping(value = "/inventory")
public class InventoryController {

	@RequestMapping(value = "/addtype" , method = RequestMethod.POST)
	public String addType(InventoryType inventoryType){
		return null;
	}
	
	@RequestMapping(value = "/deltype" , method = RequestMethod.POST)
	public String deleteType(int inventoryTypeId){
		return null;
	}
	
	@RequestMapping(value = "/listtype" , method = RequestMethod.GET)
	public String listType(int page , int number){
		return null;
	}
	
	@RequestMapping(value = "/querytype" , method = RequestMethod.GET)
	public String queryType(String name , Date startTime , Date endTime){
		return null;
	}
	
	@RequestMapping(value = "/addbrand" , method = RequestMethod.POST)
	public String addBrand(InventoryBrand inventoryBrand){
		return null;
	}
	
	@RequestMapping(value = "/delbrand" , method = RequestMethod.POST)
	public String deleteBrand(int inventoryBrandId){
		return null;
	}
	
	@RequestMapping(value = "/listbrand" , method = RequestMethod.GET)
	public String listBrand(int page , int number){
		return null;
	}
	
	@RequestMapping(value = "/querybrand" , method = RequestMethod.GET)
	public String queryBrand(String name){
		return null;
	}
	
	@RequestMapping(value = "/add" , method = RequestMethod.POST)
	public String Add(Inventory inventory){
		return null;
	}
	
	@RequestMapping(value = "/delete" , method = RequestMethod.POST)
	public String Delete(int inventoryId){
		return null;
	}
	
	@RequestMapping(value = "/instock" , method = RequestMethod.POST)
	public String inStock(List<Inventory> inventories){
		return null;
	}
	
	@RequestMapping(value = "/outstock" , method = RequestMethod.POST)
	public String outStock(List<Inventory> inventories){
		return null;
	}
	
	@RequestMapping(value = "/list" , method = RequestMethod.GET)
	public String listStock(int page , int number){
		return null;
	}
	
	@RequestMapping(value = "/remain" , method = RequestMethod.GET)
	public String Remain(int inventoryId){
		return null;
	}
	
	@RequestMapping(value = "/listorder" , method = RequestMethod.GET)
	public String listOrder(int page , int number){
		return null;
	}
	
	@RequestMapping(value = "/query" , method = RequestMethod.GET)
	public String Query(int inventoryOrderId , Date createDate , int adminId ){
		return null;
	}
	
	@RequestMapping(value = "/orderdetail" , method = RequestMethod.GET)
	public String orderDetail(int inventoryOrderId){
		return null;
	}
}
