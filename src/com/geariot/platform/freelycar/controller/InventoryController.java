package com.geariot.platform.freelycar.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.geariot.platform.freelycar.entities.Inventory;
import com.geariot.platform.freelycar.entities.InventoryBrand;
import com.geariot.platform.freelycar.entities.InventoryOrder;
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
	public String add(@RequestBody Inventory inventory){
		return this.inventoryService.addInventory(inventory);
	}
	
	@RequestMapping(value = "/delete" , method = RequestMethod.POST)
	public String delete(Integer... inventoryIds){
		return this.inventoryService.deleteInventory(inventoryIds);
	}
	
	@RequestMapping(value = "/instock" , method = RequestMethod.POST)
	public String inStock(@RequestBody InventoryOrder inventoryOrder){
		return this.inventoryService.inStock(inventoryOrder);
	}
	
	@RequestMapping(value = "/outstock" , method = RequestMethod.POST)
	public String outStock(@RequestBody InventoryOrder inventoryOrder){
		return this.inventoryService.outStock(inventoryOrder);
	}
	
	@RequestMapping(value = "/list" , method = RequestMethod.GET)
	public String listInventory(int page , int number){
		return this.inventoryService.listInventory(page, number);
	}
	
	@RequestMapping(value = "/remain" , method = RequestMethod.GET)
	public String remain(String inventoryId){
		return this.inventoryService.findInventoryById(inventoryId);
	}
	
	@RequestMapping(value = "/listorder" , method = RequestMethod.GET)
	public String listOrder(int page , int number){
		return this.inventoryService.listOrder(page, number);
	}
	
	@RequestMapping(value = "/query" , method = RequestMethod.GET)
	public String query(String inventoryOrderId , String adminId ){
		return this.inventoryService.queryOrder(inventoryOrderId, adminId);
	}
	
	@RequestMapping(value = "/orderdetail" , method = RequestMethod.GET)
	public String orderDetail(String inventoryOrderId){
		return this.inventoryService.orderDetail(inventoryOrderId);
	}
}
