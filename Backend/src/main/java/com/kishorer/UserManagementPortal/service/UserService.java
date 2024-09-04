package com.kishorer.UserManagementPortal.service;

import com.kishorer.UserManagementPortal.Dto.ReqRes;
import com.kishorer.UserManagementPortal.UserInfo;
import com.kishorer.UserManagementPortal.repo.UserRepo;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.lang.reflect.Array;
import java.util.*;

@Component
public class UserService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private AuthenticationManager manager;
    @Autowired
    private JwtUtils jwtUtils;
    private BCryptPasswordEncoder bcrypt=new BCryptPasswordEncoder(12);

    public ReqRes register(ReqRes input){
        ReqRes output = new ReqRes();
        try {

            UserInfo userInfo = new UserInfo();
            userInfo.setEname(input.getEname());
            userInfo.setEmail(input.getEmail());
            userInfo.setCity(input.getCity());
            userInfo.setPass(bcrypt.encode(input.getPass()));
            userInfo.setRole(input.getRole());
            UserInfo ui = userRepo.save(userInfo);
            output.setUserInfo(ui);
            output.setStatusCode(200);
            output.setMessage("Registration Successful");
//            output.setUserInfoList(List.of(userInfo));
        }catch(Exception e){
            output.setStatusCode(500);
            output.setMessage(e.getMessage());
        }
        return output;
    }

    public ReqRes login(ReqRes input){
        ReqRes output=new ReqRes();
        try {
            Authentication auth=manager.authenticate(new UsernamePasswordAuthenticationToken(input.getEmail(),input.getPass()));
//            throw new Exception("Invalid credentials");
            if(auth.isAuthenticated()){
                System.out.println("Authedd");
                output.setToken(jwtUtils.generateKey(input.getEmail()));
                output.setRefreshToken(jwtUtils.refreshGenerateKey(new HashMap<>(),input.getEmail()));
                output.setExpirationTime("1 hr");
                output.setStatusCode(200);
                output.setMessage("Login Successful");
                Optional<UserInfo> role=userRepo.findByEmail(input.getEmail());
                if(role.isPresent()){
                    output.setRole(role.get().getRole());
                }
            }else{
                System.out.println("NOT AUTHED");
                throw new Exception("Invalid credentials");
            }
        }catch (Exception e){
            System.out.println("EXception occured");
            output.setStatusCode(500);
            output.setMessage(e.getMessage());
        }
        return output;
    }

    public ReqRes refreshToken(ReqRes input){
        ReqRes output =new ReqRes();
        try {
            String email = jwtUtils.getUserName(input.getToken());
            UserInfo ui = userRepo.findByEmail(email).orElseThrow();
            output.setToken(jwtUtils.generateKey(email));
            output.setRefreshToken(jwtUtils.refreshGenerateKey(new HashMap<>(), email));
            output.setExpirationTime("1 hr");
            output.setStatusCode(200);
            output.setMessage("Token Generation Successful");
        }catch (Exception e){
            output.setStatusCode(500);
            output.setMessage(e.getMessage());
        }
        return output;
    }


    public ReqRes getById(int id){
        ReqRes output=new ReqRes();
        try {
            Optional<UserInfo> ui=userRepo.findById(id);
            if(ui.isPresent()) {
                output.setUserInfoList(List.of(userRepo.findById(id).orElseThrow()));
                output.setStatusCode(200);
                output.setMessage("Success");
            }
            else{
                output.setStatusCode(404);
                output.setMessage("No User Found");
            }
        }catch(Exception e){
            output.setStatusCode(500);
            output.setMessage(e.getMessage());
        }
        return output;
    }

    public ReqRes getAll(){
        ReqRes output=new ReqRes();
        try {
            Comparator<UserInfo> cp=new Comparator<UserInfo>() {
                @Override
                public int compare(UserInfo o1, UserInfo o2) {
                    if(o1.getEid()>o2.getEid()){
                        return 1;
                    }else{
                        return -1;
                    }
                }
            };
            List<UserInfo> li=userRepo.findAll();
            Collections.sort(li,cp);
            output.setUserInfoList(li);
            output.setStatusCode(200);
            output.setMessage("Success");
        }catch (Exception e){
            output.setStatusCode(500);
            output.setMessage(e.getMessage());
        }
        return output;
    }

    public ReqRes deleteUser(int id){
        ReqRes output=new ReqRes();
        try {
            Optional<UserInfo> ui=userRepo.findById(id);
            if(ui.isPresent()) {
                userRepo.deleteById(id);
                output.setStatusCode(200);
                output.setMessage("Success");
            }
            else{
                output.setStatusCode(404);
                output.setMessage("No User Found");
            }
        }catch (Exception e){
            output.setStatusCode(500);
            output.setMessage(e.getMessage());
        }
        return output;
    }

    public ReqRes updateUser(int id,ReqRes input){
        ReqRes output=new ReqRes();
        try{
            Optional<UserInfo> ui=userRepo.findById(id);

            if(ui.isPresent()){
                UserInfo uii=ui.get();
                uii.setRole(input.getRole());
                uii.setEname(input.getEname());
                uii.setEmail(input.getEmail());
                uii.setCity(input.getCity());
                userRepo.save(uii);
                output.setStatusCode(200);
                output.setMessage("Success");
                output.setUserInfoList(List.of(userRepo.findById(uii.getEid()).orElseThrow()));
            }
            else{
                output.setStatusCode(404);
                output.setMessage("No User Found");
            }
        }catch (Exception e){
            output.setStatusCode(500);
            output.setMessage(e.getMessage());
        }
        return output;
    }

    public ReqRes getMyInfo(String email){
        ReqRes output=new ReqRes();
        try{
            Optional<UserInfo> ui=userRepo.findByEmail(email);
            if(ui.isPresent()){
                output.setUserInfoList(List.of(ui.get()));
                output.setStatusCode(200);
                output.setMessage("Success");
            }
            else{
                output.setStatusCode(404);
                output.setMessage("No User Found");
            }
        }catch (Exception e){
            output.setStatusCode(500);
            output.setMessage(e.getMessage());
        }
        return output;
    }



}
