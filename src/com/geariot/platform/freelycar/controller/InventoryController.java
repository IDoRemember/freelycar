package com.geariot.platform.freelycar.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.geariot.platform.freelycar.entities.Inventory;
import com.geariot.platform.freelycar.entities.InventoryBrand;
import com.geariot.platform.freelycar.entities.InventoryType;
import com.geariot.platform.freelycar.service.InventoryService;

@RestController
@RequestMapping(value = "/inventory")
public class InventoryController {

	@Autowired
	private InventoryService inventoryService;
	
	@RequestMapping(value = "/addtype" , method = RequestMethod.POST)
	public String addType(@RequestBody InventoryType inventoryType){
		return this.inventoryService.addType(inventoryType);
	}
	
	@RequestMapping(value = "/deltype" , method = RequestMethod.POST)
	public String deleteType(Integer... inventoryTypeIds){
		return this.inventoryService.deleteType(inventoryTypeIds);
	}
	
	@RequestMapping(value = "/listtype" , method = RequestMethod.GET)
	public String listType(int page , int number){
		return this.inventoryService.listType(page, number);
	}
	
	@RequestMapping(value = "/querytype" , method = RequestMethod.GET)
	public String queryType(String name , Date startTime , Date endTime){
		return this.inventoryService.queryType(name, startTime, endTime);
	}
	
	@RequestMapping(value = "/addbrand" , method = RequestMethod.POST)
	public String addBrand(@RequestBody InventoryBrand inventoryBrand){
		return this.inventoryService.addBrand(inventoryBrand);
	}
	
	@RequestMapping(value = "/delbrand" , method = RequestMethod.POST)
	public String deleteBrand(Integer... inventoryBrandIds){
		return this.inventoryService.deleteBrand(inventoryBrandIds);
	}
	
	@RequestMapping(value = "/listbrand" , method = RequestMethod.GET)
	public String listBrand(int page , int number){
		return this.inventoryService.listBrand(page, number);
	}
	
	@RequestMapping(value = "/querybrand" , method = RequestMethod.GET)
	public String queryBrand(String name){
		return this.inventoryService.queryBrand(name);
	}
	
	@RequestMapping(value = "/add" , method = RequestMethod.POST)
	public String add(Inventory inventory){
		return null;
	}
	
	@RequestMapping(value = "/delete" , method = RequestMethod.POST)
	public String delete(int inventoryId){
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
	public String remain(int inventoryId){
		return null;
	}
	
	@RequestMapping(value = "/listorder" , method = RequestMethod.GET)
	public String listOrder(int page , int number){
		return null;
	}
	
	@RequestMapping(value = "/query" , method = RequestMethod.GET)
	public String query(int inventoryOrderId , Date createDate , int adminId ){
		return null;
	}
	
	@RequestMapping(value = "/orderdetail" , method = RequestMethod.GET)
	public String orderDetail(int inventoryOrderId){
		return null;
	}
}
