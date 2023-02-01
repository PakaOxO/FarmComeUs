package com.ssafy.farmcu.service.member;

import com.ssafy.farmcu.dto.member.MemberJoinReq;
import com.ssafy.farmcu.dto.member.MemberLoginReq;
import com.ssafy.farmcu.dto.member.MemberResponseDto;
import com.ssafy.farmcu.dto.member.MemberUpdateReq;
import com.ssafy.farmcu.entity.member.Member;
import com.ssafy.farmcu.exception.NotFoundUserException;
import com.ssafy.farmcu.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    @Autowired
    private MemberRepository memberRepository;

    private PasswordEncoder pwEncoder;

    @Transactional
    @Override
    public boolean createMember(MemberJoinReq memberJoinInfo) {
        if(memberRepository.findById(memberJoinInfo.getId())!= null){
            return false;
        }
        String pw = pwEncoder.encode(memberJoinInfo.getPassword());
        memberJoinInfo.setPassword(pw);
        Member newMember = memberRepository.save(memberJoinInfo.ToEntity());
        return true;
    }

    @Transactional(readOnly = true)
    public MemberResponseDto getUserInfo(String id){
        return memberRepository.findById(id).map(MemberResponseDto::of).orElseThrow(() -> new NotFoundUserException("아이디를 가진 사람이 없습니다."));
    }

//    @Override
//    public MemberInfoRes getMemberPhoto(String Id) {
//        return null;
//    }f

    @Transactional(readOnly = true)
    public Member findUser(String id){
        return memberRepository.findById(id).get();
    }

    @Override
    public boolean deleteMember(MemberLoginReq memberLoginInfo) {
        Optional<Member> member = memberRepository.findById(memberLoginInfo.getId());
        if(pwEncoder.matches(memberLoginInfo.getPassword(), member.get().getPassword())){
            memberRepository.delete(member.get());
            return true;
        }
        return false;
    }

    @Override
    public boolean updateMember(MemberUpdateReq memberUpdateReq, String id) {
        Member member = memberRepository.findById(id).orElseThrow(() -> new NotFoundUserException("아이디를 가진 사람이 없습니다."));
        if(!pwEncoder.matches(memberUpdateReq.getPassword(), member.getPassword())){ // 비밀번호 검증
            return false;
        }

        member.updateInfo(memberUpdateReq);

        return true;
    }
}

