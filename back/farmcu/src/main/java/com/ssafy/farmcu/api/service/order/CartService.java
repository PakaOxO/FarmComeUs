package com.ssafy.farmcu.api.service.order;

<<<<<<< HEAD
import com.ssafy.farmcu.api.dto.member.MemberInfoRes;
import com.ssafy.farmcu.api.dto.order.CartDeleteDto;
import com.ssafy.farmcu.api.dto.order.CartDto;
import com.ssafy.farmcu.api.dto.order.OrderInfoDto;
import com.ssafy.farmcu.api.entity.order.OrderItem;

public interface CartService {

    // 장바구니 생성

    // 장바구니에 상품 담기
    public boolean addCart(CartDto cartDto);

    // 로그인 사용자 장바구니 목록 조회
//    public List<CartInfoDto> findByMemberCart(CartMemberReq cartMemberReq);

    // 장바구니 항목 주문
//    void orderCart(OrderInfoDto orderInfoDto);
//     장바구니 항목 삭제
//    void deleteCart(CartDeleteDto cartDeleteDto);

    //string in, nickname, name
//    void deleteCarts(CartDelete delete, CustomPrincipal principal);



=======
import com.ssafy.farmcu.api.dto.item.ItemDto;
import com.ssafy.farmcu.api.dto.order.CartInfoDto;

public interface CartService {

    //상품 생성
    public boolean addCart(CartInfoDto cartInfoDto);
>>>>>>> 2d99473e31c4dc920fee036e1f2adb0c639f1bf5
}
