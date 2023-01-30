package com.ssafy.farmcu.repository;

import com.ssafy.farmcu.entity.store.Category;
import com.ssafy.farmcu.entity.store.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

//    List<Item> findByItemName(String itemName);
//    List<Item> findByCategory(Long categoryCode);
    List<Item> findByItemNameAndCategory(String itemName, Long categoryCode);

}
